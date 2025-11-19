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
      modelName: 'google/gemini-2.0-flash-exp',
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
    ? 'BROWSERBASE'
    : 'LOCAL';

  console.log(`[Stagehand] Initializing with env: ${env}, model: ${modelConfig.modelName || 'default'}`);
  console.log(`[Stagehand] Browserbase configured: ${!!process.env.BROWSERBASE_API_KEY && !!process.env.BROWSERBASE_PROJECT_ID}`);
  console.log(`[Stagehand] LLM API key configured: ${!!process.env.GOOGLE_API_KEY || !!process.env.ANTHROPIC_API_KEY || !!process.env.OPENAI_API_KEY}`);

  const stagehand = new Stagehand({
    env,
    verbose: 0,
    apiKey: process.env.BROWSERBASE_API_KEY,
    projectId: process.env.BROWSERBASE_PROJECT_ID,
    disablePino: true,
    ...modelConfig,
  });

  try {
    console.log(`[Stagehand] Calling stagehand.init()...`);
    await stagehand.init();
    console.log(`[Stagehand] Initialization successful`);
    const page = stagehand.page;
    const website = guessCompanyWebsite(companyName);
    console.log(`[Stagehand] Navigating to ${website}...`);

    // Extract company info
    try {
      console.log(`[Stagehand] Navigating to ${website}...`);
      await page.goto(website, {
        timeout: 60000, // 60 second timeout for navigation
        waitUntil: 'domcontentloaded' // Don't wait for all resources to load
      });
      console.log(`[Stagehand] Navigation to ${website} completed`);
      
      // Wait for page to settle (JavaScript execution, dynamic content)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
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
      
      // Add timeout wrapper for extraction
      const extractionPromise = page.extract({
        instruction: 'Extract the company name, mission statement, description, founding year, headquarters location, industry, and website URL.',
        schema: CompanyInfoSchema,
        domSettleTimeoutMs: 5000, // Wait up to 5s for DOM to settle
      });
      
      // Add overall timeout of 60 seconds for extraction
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Extraction timeout after 60 seconds')), 60000);
      });
      
      companyInfo = await Promise.race([extractionPromise, timeoutPromise]);
      console.log(`[Extract] Successfully extracted data:`, JSON.stringify(companyInfo, null, 2));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      const errorName = error instanceof Error ? error.name : error?.constructor?.name || 'UnknownError';
      
      // Enhanced error logging
      console.error(`[Extract] Failed to extract company info:`, {
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
