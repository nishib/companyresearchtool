// Configure environment before anything else to avoid pino-pretty issues
import '../src/init.js';

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Stagehand } from '@browserbasehq/stagehand';
import { z } from 'zod';

// Suppress pino-pretty errors for serverless
if (typeof process !== 'undefined') {
  const originalEmit = process.emit;
  (process as any).emit = function (event: any, ...args: any[]) {
    if ((event === 'warning' || event === 'uncaughtException' || event === 'unhandledRejection') && args[0]) {
      const message = String(args[0]?.message || args[0] || '');
      if (message.includes('pino-pretty') || message.includes('unable to determine transport target')) {
        return false;
      }
    }
    return originalEmit.apply(this, arguments as any);
  };
}

// Schemas
const CompanyInfoSchema = z.object({
  name: z.string(),
  mission: z.string().nullish(),
  description: z.string().nullish(),
  headquarters: z.string().nullish(),
  industry: z.string().nullish(),
  website: z.string().nullish(),
});

const NewsArticleSchema = z.object({
  title: z.string(),
  date: z.string().optional(),
  source: z.string().optional(),
  summary: z.string().optional(),
});

const NewsSchema = z.object({
  articles: z.array(NewsArticleSchema),
});

const TechStackSchema = z.object({
  languages: z.array(z.string()).optional(),
  frameworks: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
  infrastructure: z.array(z.string()).optional(),
});

const CompetitorSchema = z.object({
  name: z.string(),
  description: z.string().nullish(),
  website: z.string().nullish(),
});

const CompetitorsSchema = z.object({
  competitors: z.array(CompetitorSchema),
});

function getModelConfig() {
  // Priority: Google Gemini > Anthropic Claude > OpenAI GPT
  if (process.env.GOOGLE_API_KEY) {
    return {
      // Using gemini-2.0-flash (latest stable Gemini model supported by Stagehand)
      modelName: 'gemini-2.0-flash',
      modelClientOptions: {
        apiKey: process.env.GOOGLE_API_KEY,
      },
    };
  } else if (process.env.ANTHROPIC_API_KEY) {
    return {
      modelName: 'claude-3-5-sonnet-20241022',
      modelClientOptions: {
        apiKey: process.env.ANTHROPIC_API_KEY,
      },
    };
  } else if (process.env.OPENAI_API_KEY) {
    return {
      modelName: 'gpt-4o',
      modelClientOptions: {
        apiKey: process.env.OPENAI_API_KEY,
      },
    };
  }
  return {};
}

function guessCompanyWebsite(companyName: string): string {
  const knownCompanies: Record<string, string> = {
    'stripe': 'https://stripe.com',
    'anthropic': 'https://www.anthropic.com',
    'openai': 'https://openai.com',
  };
  const normalized = companyName.toLowerCase().trim();
  return knownCompanies[normalized] || `https://www.${normalized}.com`;
}

function cleanText(value?: string | null): string {
  if (!value) return 'Not Available';
  const cleaned = value
    .replace(/^\s*#+\s*/g, '')
    .replace(/\s*\n+\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return cleaned || 'Not Available';
}

function sanitizeNarrative(value: string, companyName: string): string {
  if (!value || value === 'Not Available') return 'Not Available';
  const blockedPhrases = [
    /one little project/i,
    /annual revenue/i,
    /total funding/i,
    /\bemploys\b/i,
    /\byoy\b/i,
  ];
  const withoutHeader = value.replace(new RegExp(`^${companyName}\\s*\\([^)]*\\)\\s*`, 'i'), '').trim();
  const sentences = withoutHeader.split(/(?<=[.!?])\s+/);
  const kept = sentences.filter((sentence) => {
    const trimmed = sentence.trim();
    if (!trimmed) return false;
    if (blockedPhrases.some((pattern) => pattern.test(trimmed))) return false;
    const mentionsCompany = trimmed.toLowerCase().includes(companyName.toLowerCase());
    const allowedStart = /^(it|the company|this company|they|its|we|our)\b/i.test(trimmed);
    const containsGenericCompanyClaim = /\bis a company that\b/i.test(trimmed);
    if (containsGenericCompanyClaim && !mentionsCompany) return false;
    return mentionsCompany || allowedStart;
  });
  const unique = Array.from(new Set(kept.map((sentence) => sentence.trim()))).filter(Boolean);
  const cleaned = unique.join(' ').trim();
  if (!cleaned) return 'Not Available';
  return /[.!?]$/.test(cleaned) ? cleaned : `${cleaned}.`;
}

function normalizeWebsite(url?: string | null): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.hostname}`;
  } catch {
    return null;
  }
}

function sanitizeCompetitors(raw: Array<z.infer<typeof CompetitorSchema>>): Array<z.infer<typeof CompetitorSchema>> {
  const blockedNamePatterns = [
    /top\s+\d+/i,
    /alternatives?/i,
    /community/i,
    /reddit/i,
    /dev\s*community/i,
    /news/i,
    /blog/i,
    /forum/i,
    /list/i,
  ];
  const blockedDomains = new Set([
    'reddit.com',
    'dev.to',
    'medium.com',
    'news.ycombinator.com',
    'linkedin.com',
    'github.com',
    'substack.com',
  ]);
  const seen = new Set<string>();

  return raw
    .map((competitor) => {
      const name = competitor?.name?.trim() ?? '';
      return {
        name,
        description: competitor?.description?.trim() ?? null,
        website: normalizeWebsite(competitor?.website ?? null),
      };
    })
    .filter((competitor) => competitor.name.length > 1)
    .filter((competitor) => !blockedNamePatterns.some((pattern) => pattern.test(competitor.name)))
    .filter((competitor) => {
      if (!competitor.website) return true;
      try {
        const hostname = new URL(competitor.website).hostname.replace(/^www\./, '');
        return !blockedDomains.has(hostname);
      } catch {
        return false;
      }
    })
    .filter((competitor) => {
      const key = competitor.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 7);
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  shouldRetry?: (error: any) => boolean;
}

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 60000, // Increased to 60 seconds for rate limits
    backoffMultiplier = 2,
    shouldRetry = () => true,
  } = options;

  let lastError: any;
  let currentDelay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (!shouldRetry(error)) {
        throw error;
      }

      if (attempt === maxRetries) {
        throw error;
      }

      const errorMessage = error instanceof Error ? error.message : String(error);
      const isRateLimit = errorMessage.includes('429') || 
                         errorMessage.includes('rate limit') || 
                         errorMessage.includes('burst rate limit');
      
      // Use longer delay for rate limits
      if (isRateLimit) {
        currentDelay = extractRateLimitDelay(error);
        console.log(
          `[Retry] Rate limit hit (attempt ${attempt + 1}/${maxRetries + 1}). Waiting ${currentDelay / 1000}s before retry...`
        );
      } else {
        console.log(
          `[Retry] Attempt ${attempt + 1}/${maxRetries + 1} failed: ${errorMessage}. Retrying in ${currentDelay}ms...`
        );
        currentDelay = Math.min(currentDelay * backoffMultiplier, maxDelay);
      }

      await delay(currentDelay);
    }
  }

  throw lastError;
}

function isRetryableError(error: any): boolean {
  if (!error) return false;

  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorName = error instanceof Error ? error.name : error?.constructor?.name || '';

  // Check for rate limit errors (429)
  const isRateLimit = errorMessage.includes('429') || 
                     errorMessage.includes('rate limit') || 
                     errorMessage.includes('burst rate limit') ||
                     errorMessage.includes('quota') ||
                     errorName.includes('RateLimitError');

  return (
    isRateLimit ||
    errorName.includes('ParseError') ||
    errorName.includes('TimeoutError') ||
    errorName.includes('NetworkError') ||
    errorMessage.includes('parse') ||
    errorMessage.includes('timeout') ||
    errorMessage.includes('Timeout') ||
    errorMessage.includes('network') ||
    errorMessage.includes('ECONNREFUSED') ||
    errorMessage.includes('ETIMEDOUT') ||
    errorMessage.includes('Failed to parse')
  );
}

function extractRateLimitDelay(error: any): number {
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  // Try to extract wait time from error message (e.g., "try again in 39 seconds")
  const waitMatch = errorMessage.match(/try again in (\d+) seconds?/i);
  if (waitMatch) {
    const seconds = parseInt(waitMatch[1], 10);
    // Add 5 seconds buffer
    return (seconds + 5) * 1000;
  }
  
  // Default exponential backoff for rate limits
  return 60000; // 60 seconds default
}

// Set up unhandled rejection handler for better error tracking
if (typeof process !== 'undefined') {
  const originalUnhandledRejection = process.listeners('unhandledRejection');
  process.removeAllListeners('unhandledRejection');
  
  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    const message = reason?.message || String(reason);
    const name = reason?.name || reason?.constructor?.name || 'UnknownError';
    
    // Log Stagehand-related unhandled rejections
    if (message.includes('Stagehand') || message.includes('parsing event') || name === 'StagehandServerError') {
      console.error('[UnhandledRejection] Stagehand-related error:', {
        reason: message,
        name,
        stack: reason?.stack,
        promise: String(promise)
      });
    }
    
    // Re-emit to original handlers if any
    originalUnhandledRejection.forEach(handler => handler(reason, promise));
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { companyName } = req.body;

  if (!companyName) {
    return res.status(400).json({ error: 'Company name is required' });
  }

  if (!process.env.GOOGLE_API_KEY && !process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: 'No API key configured. Please add GOOGLE_API_KEY, ANTHROPIC_API_KEY, or OPENAI_API_KEY.'
    });
  }

  const modelConfig = getModelConfig();
  const env = process.env.BROWSERBASE_API_KEY && process.env.BROWSERBASE_PROJECT_ID
    ? 'BROWSERBASE' as const
    : 'LOCAL' as const;

  console.log(`[Stagehand] Initializing with env: ${env}, model: ${modelConfig.modelName || 'default'}`);
  console.log(`[Stagehand] Browserbase configured: ${!!process.env.BROWSERBASE_API_KEY && !!process.env.BROWSERBASE_PROJECT_ID}`);
  console.log(`[Stagehand] LLM API key configured: ${!!process.env.GOOGLE_API_KEY || !!process.env.ANTHROPIC_API_KEY || !!process.env.OPENAI_API_KEY}`);

  const stagehand = new Stagehand({
    env,
    verbose: 0,
    apiKey: process.env.BROWSERBASE_API_KEY,
    projectId: process.env.BROWSERBASE_PROJECT_ID,
    disablePino: true,
    disableAPI: true, // Force client-side extraction (API mode is unstable)
    model: modelConfig.modelName ? {
      ...modelConfig.modelClientOptions,
      modelName: modelConfig.modelName,
    } : undefined,
  });

  try {
    // Initialize Stagehand (required in V3)
    console.log(`[Stagehand] Calling stagehand.init()...`);
    await stagehand.init();
    console.log(`[Stagehand] Initialization successful`);

    // Get the first page from context (available after init)
    const pages = stagehand.context.pages();
    if (!pages || pages.length === 0) {
      throw new Error('No page available in Stagehand context after init()');
    }
    const page = pages[0];
    console.log(`[Stagehand] Page obtained successfully`);
    const website = guessCompanyWebsite(companyName);
    console.log(`[Stagehand] Navigating to ${website}...`);

    // Extract company info
    try {
      console.log(`[Stagehand] Navigating to ${website}...`);

      // Use networkidle to handle page redirects properly
      try {
        await page.goto(website, {
          waitUntil: 'networkidle',
          timeoutMs: 60000,
        });
      } catch (navError) {
        // If navigation fails, try with domcontentloaded instead
        console.log('[Stagehand] Network idle failed, trying domcontentloaded...');
        await page.goto(website, {
          waitUntil: 'domcontentloaded',
          timeoutMs: 60000,
        });
      }
      console.log(`[Stagehand] Navigation to ${website} completed`);
      
      // Wait for page to settle (JavaScript execution, dynamic content)
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Verify page loaded successfully
      const pageTitle = await page.title().catch(() => 'Unknown');
      console.log(`[Stagehand] Page title: ${pageTitle}`);
    } catch (navError) {
      const navErrorMessage = navError instanceof Error ? navError.message : String(navError);
      const navErrorStack = navError instanceof Error ? navError.stack : undefined;
      
      console.error(`[Stagehand] Navigation failed:`, {
        error: navErrorMessage,
        stack: navErrorStack,
        website,
        errorType: navError?.constructor?.name,
        isTimeout: navErrorMessage.includes('timeout') || navErrorMessage.includes('Timeout'),
        isNetworkError: navErrorMessage.includes('net::') || navErrorMessage.includes('ECONNREFUSED')
      });
      throw navError;
    }

    let companyInfo;
    try {
      console.log(`[Extract] Starting extraction for ${companyName} from ${website}`);

      // Use retry logic with exponential backoff
      companyInfo = await retryWithBackoff(
        async () => {
          // Add timeout wrapper for extraction
          const extractionPromise = stagehand.extract(
            `You are researching ${companyName}. Use ONLY the visible page content as your source. Do not infer or use general knowledge. Do not paraphrase; use exact wording from the page. If a field is not explicitly stated on the page, return null for that field.\n\n` +
            'FIELDS:\n' +
            `- name: "${companyName}" or official name from page\n` +
            `- description: 2-4 sentences summarizing what ${companyName} does, based only on page content\n` +
            `- mission: 1-3 exact sentences that describe ${companyName}'s mission or purpose as stated on the page (must include the word "mission" or be part of a mission statement). Do not include a company name header or repeat the company name unless it appears in the sentence.\n` +
            `- headquarters: City and country/state as stated on the page\n` +
            `- industry: Specific sector as stated on the page\n` +
            `- website: Official URL stated on the page`,
            CompanyInfoSchema
          );

          // Add overall timeout of 60 seconds for extraction
          const timeoutPromise = new Promise<z.infer<typeof CompanyInfoSchema>>((_, reject) => {
            setTimeout(() => reject(new Error('Extraction timeout after 60 seconds')), 60000);
          });

          return await Promise.race([extractionPromise, timeoutPromise]);
        },
        {
          maxRetries: 2,
          initialDelay: 2000,
          shouldRetry: isRetryableError,
        }
      );

      console.log(`[Extract] Successfully extracted data:`, JSON.stringify(companyInfo, null, 2));

      console.log(`[Extract] Final extracted data:`, JSON.stringify({
        headquarters: companyInfo.headquarters,
        industry: companyInfo.industry,
        hasDescription: !!companyInfo.description,
        website: companyInfo.website
      }, null, 2));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      const errorName = error instanceof Error ? error.name : error?.constructor?.name || 'UnknownError';

      // Enhanced error logging
      console.error(`[Extract] Failed to extract company info after retries:`, {
        error: errorMessage,
        name: errorName,
        stack: errorStack,
        companyName,
        website,
        errorType: error?.constructor?.name,
        errorDetails: error,
        // Check if it's a StagehandServerError
        isStagehandError: errorName === 'StagehandServerError' || errorMessage.includes('StagehandServerError'),
        // Check for common error patterns
        isTimeout: errorMessage.includes('timeout') || errorMessage.includes('Timeout'),
        isNetworkError: errorMessage.includes('network') || errorMessage.includes('ECONNREFUSED'),
        isParseError: errorMessage.includes('parse') || errorMessage.includes('parsing'),
        wasRetried: isRetryableError(error),
      });
      
      // Return fallback data
      companyInfo = {
        name: companyName,
        mission: 'Not Available',
        description: 'Not Available',
        headquarters: undefined,
        industry: undefined,
        website: undefined
      };
    }

    // Extract competitors using page context only
    let competitors: any[] = [];
    try {
      console.log(`[Extract] Starting competitors extraction for ${companyName}`);
      const competitorsData = await stagehand.extract(
        `From the visible content only, list up to 5 direct competitors that are actual companies (not articles, lists, communities, or forums). Use exact wording from the page; do not paraphrase.\n` +
        'If a competitor is not explicitly referenced on the page, omit it.\n' +
        'For each competitor, provide:\n' +
        '- Company name (official name)\n' +
        '- Short description based on the page (1-2 sentences)\n' +
        '- Website URL if explicitly shown\n',
        CompetitorsSchema
      );
      competitors = sanitizeCompetitors(competitorsData.competitors || []);
      console.log(`[Extract] Successfully extracted ${competitors.length} competitors`);
    } catch (error) {
      console.error(`[Extract] Failed to extract competitors:`, error);
      competitors = [];
    }

    // Generate simple markdown report
    const competitorsSection = competitors.length > 0
      ? `\nCompetitors\n${competitors.map((c: any) => {
          const description = sanitizeNarrative(cleanText(c.description), c.name);
          const lines = [
            `Name: ${c.name}`,
            `Description: ${description === 'Not Available' ? 'No Description Available' : description}`,
          ];
          if (c.website) {
            lines.push(`Website: ${c.website}`);
          }
          return `\n${lines.join('\n')}`;
        }).join('\n')}`
      : '\nCompetitors\nNo Competitor Information Found';

    const websiteOutput = normalizeWebsite(companyInfo.website) ?? 'Not Available';

    const overview = sanitizeNarrative(cleanText(companyInfo.description), companyInfo.name ?? companyName);
    const mission = sanitizeNarrative(cleanText(companyInfo.mission), companyInfo.name ?? companyName);

    const markdown = `Company Research Report

Company: ${companyInfo.name ?? companyName}

Overview
${overview}

Mission
${mission}

Details
Headquarters: ${companyInfo.headquarters ?? 'Not Available'}
Industry: ${companyInfo.industry ?? 'Not Available'}
Website: ${websiteOutput}
${competitorsSection}

Report Date: ${new Date().toISOString().split('T')[0]}
`;

    await stagehand.close();

    res.status(200).json({
      markdown,
      report: {
        companyInfo,
        competitors,
        researchDate: new Date().toISOString(),
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    const errorName = error instanceof Error ? error.name : error?.constructor?.name || 'UnknownError';
    
    // Check for specific Stagehand event parsing errors
    const isEventParseError = errorMessage.includes('Error parsing event data') || 
                             errorMessage.includes('StagehandServerError') ||
                             errorName === 'StagehandServerError';
    
    console.error('[Research] Full error details:', {
      name: errorName,
      message: errorMessage,
      stack: errorStack,
      errorType: error?.constructor?.name,
      error: error,
      companyName,
      env,
      hasBrowserbase: !!(process.env.BROWSERBASE_API_KEY && process.env.BROWSERBASE_PROJECT_ID),
      hasLLMKey: !!(process.env.GOOGLE_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY),
      isEventParseError,
      // Additional context for event parsing errors
      ...(isEventParseError && {
        suggestion: 'This may indicate a timeout, LLM API issue, or Browserbase event stream problem. Check API keys and network connectivity.',
        possibleCauses: [
          'LLM API rate limit or quota exceeded',
          'Browserbase event stream interruption',
          'Network timeout during extraction',
          'Invalid response from LLM API'
        ]
      })
    });
    
    // Try to close stagehand gracefully
    try {
      await stagehand.close();
    } catch (closeError) {
      console.error('[Research] Error closing stagehand:', {
        error: closeError instanceof Error ? closeError.message : String(closeError),
        stack: closeError instanceof Error ? closeError.stack : undefined
      });
    }
    
    // Return user-friendly error message
    let userMessage = errorMessage;
    if (isEventParseError) {
      userMessage = 'An error occurred during data extraction. This may be due to a timeout or API issue. Please try again.';
    }
    
    res.status(500).json({
      error: userMessage,
      errorType: errorName,
      details: process.env.NODE_ENV === 'development' ? {
        stack: errorStack,
        fullError: String(error),
        isEventParseError
      } : undefined
    });
  }
}
