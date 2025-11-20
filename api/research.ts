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
  mission: z.string().optional(),
  description: z.string().optional(),
  founded: z.string().optional(),
  headquarters: z.string().optional(),
  industry: z.string().optional(),
  website: z.string().optional(),
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

const LeaderSchema = z.object({
  name: z.string(),
  title: z.string(),
  bio: z.string().optional(),
  linkedin: z.string().optional(),
});

const LeadershipSchema = z.object({
  leaders: z.array(LeaderSchema),
});

function getModelConfig() {
  // Priority: Google Gemini > Anthropic Claude > OpenAI GPT
  if (process.env.GOOGLE_API_KEY) {
    return {
      // Using gemini-1.5-flash (from supported models list)
      modelName: 'gemini-1.5-flash',
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
    maxDelay = 10000,
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
      console.log(
        `[Retry] Attempt ${attempt + 1}/${maxRetries + 1} failed: ${errorMessage}. Retrying in ${currentDelay}ms...`
      );

      await delay(currentDelay);
      currentDelay = Math.min(currentDelay * backoffMultiplier, maxDelay);
    }
  }

  throw lastError;
}

function isRetryableError(error: any): boolean {
  if (!error) return false;

  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorName = error instanceof Error ? error.name : error?.constructor?.name || '';

  return (
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
            'Extract the company name, mission statement, description, founding year, headquarters location, industry, and website URL.',
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
        mission: 'Not found',
        description: 'Not found',
        founded: undefined,
        headquarters: undefined,
        industry: undefined,
        website: undefined
      };
    }

    // Generate simple markdown report
    const markdown = `# ${companyInfo.name || companyName}

## Overview
${companyInfo.description || 'No description available'}

## Mission
${companyInfo.mission || 'Not available'}

## Details
- **Founded:** ${companyInfo.founded || 'Unknown'}
- **Headquarters:** ${companyInfo.headquarters || 'Unknown'}
- **Industry:** ${companyInfo.industry || 'Unknown'}
- **Website:** ${companyInfo.website || website}

---
*Research generated on ${new Date().toISOString().split('T')[0]}*
`;

    await stagehand.close();

    res.status(200).json({
      markdown,
      report: {
        companyInfo,
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
