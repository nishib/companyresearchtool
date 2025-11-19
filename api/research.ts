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
      await page.goto(website);
      console.log(`[Stagehand] Navigation to ${website} completed`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (navError) {
      console.error(`[Stagehand] Navigation failed:`, {
        error: navError instanceof Error ? navError.message : String(navError),
        stack: navError instanceof Error ? navError.stack : undefined,
        website
      });
      throw navError;
    }

    let companyInfo;
    try {
      console.log(`[Extract] Starting extraction for ${companyName} from ${website}`);
      companyInfo = await page.extract({
        instruction: 'Extract the company name, mission statement, description, founding year, headquarters location, industry, and website URL.',
        schema: CompanyInfoSchema,
      });
      console.log(`[Extract] Successfully extracted data:`, JSON.stringify(companyInfo, null, 2));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      console.error(`[Extract] Failed to extract company info:`, {
        error: errorMessage,
        stack: errorStack,
        companyName,
        website,
        errorType: error?.constructor?.name,
        errorDetails: error
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
    
    console.error('[Research] Full error details:', {
      name: errorName,
      message: errorMessage,
      stack: errorStack,
      errorType: error?.constructor?.name,
      error: error,
      companyName,
      env,
      hasBrowserbase: !!(process.env.BROWSERBASE_API_KEY && process.env.BROWSERBASE_PROJECT_ID),
      hasLLMKey: !!(process.env.GOOGLE_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY)
    });
    
    await stagehand.close().catch((closeError) => {
      console.error('[Research] Error closing stagehand:', closeError);
    });
    
    res.status(500).json({
      error: errorMessage,
      errorType: errorName,
      details: process.env.NODE_ENV === 'development' ? {
        stack: errorStack,
        fullError: String(error)
      } : undefined
    });
  }
}
