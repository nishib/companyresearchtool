// MUST be first - configures environment to prevent pino errors
import './init.js';
import 'dotenv/config';
import { Stagehand } from '@browserbasehq/stagehand';
import { z } from 'zod';
import {
  CompanyInfo,
  CompanyInfoSchema,
  News,
  NewsSchema,
  TechStack,
  TechStackSchema,
  Leadership,
  LeadershipSchema,
  CompanyResearchReport,
} from './types.js';
import { log, delay, retryWithBackoff, isRetryableError } from './utils.js';

export class CompanyResearcher {
  private stagehand: Stagehand;
  private verbose: boolean;

  constructor(verbose: boolean = false) {
    this.verbose = verbose;

    // Determine which LLM provider to use based on available API keys
    const modelConfig = this.getModelConfig();

    // Use BROWSERBASE if credentials available, otherwise LOCAL
    const env = process.env.BROWSERBASE_API_KEY && process.env.BROWSERBASE_PROJECT_ID
      ? 'BROWSERBASE' as const
      : 'LOCAL' as const;

    this.stagehand = new Stagehand({
      env,
      verbose: verbose ? 1 : 0,
      apiKey: process.env.BROWSERBASE_API_KEY,
      projectId: process.env.BROWSERBASE_PROJECT_ID,
      disablePino: true,
      disableAPI: true, // Force client-side extraction (API mode is unstable)
      model: modelConfig.modelName ? {
        ...modelConfig.modelClientOptions,
        modelName: modelConfig.modelName,
      } : undefined,
    });

    if (verbose) {
      log(`Environment: ${env}`, 'info');
    }
  }

  private getModelConfig(): { modelName?: string; modelClientOptions?: any } {
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

  private guessCompanyWebsite(companyName: string): string {
    // Common company name to website mappings
    const knownCompanies: Record<string, string> = {
      'stripe': 'https://stripe.com',
      'anthropic': 'https://www.anthropic.com',
      'openai': 'https://openai.com',
      'google': 'https://www.google.com/about',
      'meta': 'https://about.meta.com',
      'facebook': 'https://about.meta.com',
      'amazon': 'https://www.aboutamazon.com',
      'microsoft': 'https://www.microsoft.com/about',
      'apple': 'https://www.apple.com/about',
      'netflix': 'https://about.netflix.com',
      'uber': 'https://www.uber.com/about',
      'airbnb': 'https://www.airbnb.com/about',
      'shopify': 'https://www.shopify.com/about',
      'salesforce': 'https://www.salesforce.com/company',
    };

    const normalized = companyName.toLowerCase().trim();

    if (knownCompanies[normalized]) {
      return knownCompanies[normalized];
    }

    // Guess based on company name
    return `https://www.${normalized}.com`;
  }

  async initialize(): Promise<void> {
    // Initialize Stagehand (required in V3)
    await this.stagehand.init();

    if (this.verbose) {
      log('Stagehand initialized successfully', 'success');

      // Show session URL if using Browserbase
      if (this.stagehand.browserbaseSessionID) {
        log(`Watch live: https://browserbase.com/sessions/${this.stagehand.browserbaseSessionID}`, 'info');
      }
    }
  }

  async close(): Promise<void> {
    await this.stagehand.close();
  }

  /**
   * Get the active page from Stagehand context
   */
  private getPage(): any {
    const pages = this.stagehand.context.pages();
    if (!pages || pages.length === 0) {
      throw new Error('No page available in Stagehand context. Make sure initialize() was called.');
    }
    return pages[0];
  }

  async research(companyName: string): Promise<CompanyResearchReport> {
    try {
      log(`Starting research for: ${companyName}`, 'info');

      // Run research tasks sequentially to avoid navigation conflicts
      const companyInfo = await this.extractCompanyInfo(companyName);
      const news = await this.extractNews(companyName);
      const techStack = await this.extractTechStack(companyName);
      const leadership = await this.extractLeadership(companyName);

      return {
        companyInfo,
        news,
        techStack,
        leadership,
        researchDate: new Date().toISOString(),
      };
    } catch (error) {
      log(`Research failed: ${error}`, 'error');
      throw error;
    }
  }

  private async extractCompanyInfo(companyName: string): Promise<CompanyInfo> {
    log('Extracting company information...', 'info');

    try {
      const page = this.getPage();

      // Navigate directly to the company website
      const companyWebsite = this.guessCompanyWebsite(companyName);
      log(`Navigating to ${companyWebsite}...`, 'info');

      // Use waitUntil to handle page redirects properly
      try {
        await page.goto(companyWebsite, {
          waitUntil: 'networkidle',
          timeoutMs: 30000,
        });
      } catch (navError) {
        // If navigation fails, try with domcontentloaded instead
        log('Network idle failed, trying domcontentloaded...', 'warn');
        await page.goto(companyWebsite, {
          waitUntil: 'domcontentloaded',
          timeoutMs: 30000,
        });
      }

      await delay(5000); // Extra wait for dynamic content

      // Extract company information from the website with retry logic
      let companyInfo;
      try {
        log(`[Extract] Starting extraction for ${companyName} from ${companyWebsite}`, 'info');

        companyInfo = await retryWithBackoff(
          async () => {
            return await this.stagehand.extract(
              'Extract the company name, mission statement, description, founding year, headquarters location, industry, and website URL from this page. Look for About Us, Company, or similar sections.',
              CompanyInfoSchema
            );
          },
          {
            maxRetries: 2,
            initialDelay: 2000,
            shouldRetry: isRetryableError,
          }
        );

        log('Company information extracted', 'success');
        console.log(`[Extract] Successfully extracted data:`, JSON.stringify(companyInfo, null, 2));
        return companyInfo;
      } catch (extractError) {
        const errorMessage = extractError instanceof Error ? extractError.message : String(extractError);
        const errorStack = extractError instanceof Error ? extractError.stack : undefined;
        log(`Failed to extract company info after retries: ${errorMessage}`, 'error');
        console.error(`[Extract] Failed to extract company info:`, {
          error: errorMessage,
          stack: errorStack,
          companyName,
          website: companyWebsite,
          errorType: extractError?.constructor?.name,
          errorDetails: extractError
        });
        throw extractError; // Re-throw to be caught by outer catch
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      log(`Failed to extract company info (outer catch): ${errorMessage}`, 'error');
      console.error(`[Extract] Outer error catch:`, {
        error: errorMessage,
        stack: errorStack,
        errorType: error?.constructor?.name,
      });
      // Return minimal info if extraction fails
      return {
        name: companyName,
        mission: 'Not found',
        description: 'Not found',
      };
    }
  }

  private async extractNews(companyName: string): Promise<News> {
    log('Extracting recent news...', 'info');

    try {
      const page = this.getPage();

      // Navigate to company newsroom or blog
      const companyWebsite = this.guessCompanyWebsite(companyName);
      await page.goto(`${companyWebsite}/newsroom`);
      await delay(2000);

      // Extract news items from search results
      let newsData;
      try {
        log(`[Extract] Starting news extraction for ${companyName}`, 'info');
        newsData = await this.stagehand.extract(
          'Extract the top 5 recent news articles about this company. For each article, get the title, date, source, and a brief summary. Only include news from the last 6 months if possible.',
          NewsSchema
        );
        const news = newsData.articles || [];
        log(`Extracted ${news.length} news items`, 'success');
        console.log(`[Extract] Successfully extracted news:`, JSON.stringify(newsData, null, 2));
        return news.slice(0, 5); // Limit to 5 items
      } catch (extractError) {
        const errorMessage = extractError instanceof Error ? extractError.message : String(extractError);
        const errorStack = extractError instanceof Error ? extractError.stack : undefined;
        log(`Failed to extract news: ${errorMessage}`, 'error');
        console.error(`[Extract] Failed to extract news:`, {
          error: errorMessage,
          stack: errorStack,
          companyName,
          errorType: extractError?.constructor?.name,
          errorDetails: extractError
        });
        throw extractError; // Re-throw to be caught by outer catch
      }
    } catch (error) {
      log(`Failed to extract news: ${error}`, 'warn');
      return [];
    }
  }

  private async extractTechStack(companyName: string): Promise<TechStack> {
    log('Detecting tech stack...', 'info');

    try {
      const page = this.getPage();

      // Navigate to company careers page
      const companyWebsite = this.guessCompanyWebsite(companyName);
      await page.goto(`${companyWebsite}/careers`);
      await delay(3000);

      // Extract tech stack
      let techStack;
      try {
        log(`[Extract] Starting tech stack extraction for ${companyName}`, 'info');
        techStack = await this.stagehand.extract(
          'Extract information about the technologies used by this company. Look for programming languages, frameworks, tools, and infrastructure. If this is a careers page, look at job listings for required skills. If this is a tech blog, look at technologies mentioned.',
          TechStackSchema
        );
        log('Tech stack detected', 'success');
        console.log(`[Extract] Successfully extracted tech stack:`, JSON.stringify(techStack, null, 2));
        return techStack;
      } catch (extractError) {
        const errorMessage = extractError instanceof Error ? extractError.message : String(extractError);
        const errorStack = extractError instanceof Error ? extractError.stack : undefined;
        log(`Failed to extract tech stack: ${errorMessage}`, 'error');
        console.error(`[Extract] Failed to extract tech stack:`, {
          error: errorMessage,
          stack: errorStack,
          companyName,
          errorType: extractError?.constructor?.name,
          errorDetails: extractError
        });
        throw extractError; // Re-throw to be caught by outer catch
      }
    } catch (error) {
      log(`Failed to extract tech stack: ${error}`, 'warn');
      // Return empty tech stack if extraction fails
      return {
        languages: [],
        frameworks: [],
        tools: [],
        infrastructure: [],
      };
    }
  }

  private async extractLeadership(companyName: string): Promise<Leadership> {
    log('Extracting leadership information...', 'info');

    try {
      const page = this.getPage();

      // Navigate to company about/team page
      const companyWebsite = this.guessCompanyWebsite(companyName);
      await page.goto(`${companyWebsite}/about`);
      await delay(3000);

      // Extract leadership
      let leadershipData;
      try {
        log(`[Extract] Starting leadership extraction for ${companyName}`, 'info');
        leadershipData = await this.stagehand.extract(
          'Extract information about the company leadership team. Get the names, titles, and brief bios of key executives (CEO, CTO, CFO, etc.). Include LinkedIn URLs if visible.',
          LeadershipSchema
        );
        const leadership = leadershipData.leaders || [];
        log(`Extracted ${leadership.length} leaders`, 'success');
        console.log(`[Extract] Successfully extracted leadership:`, JSON.stringify(leadershipData, null, 2));
        return leadership.slice(0, 10); // Limit to 10 leaders
      } catch (extractError) {
        const errorMessage = extractError instanceof Error ? extractError.message : String(extractError);
        const errorStack = extractError instanceof Error ? extractError.stack : undefined;
        log(`Failed to extract leadership: ${errorMessage}`, 'error');
        console.error(`[Extract] Failed to extract leadership:`, {
          error: errorMessage,
          stack: errorStack,
          companyName,
          errorType: extractError?.constructor?.name,
          errorDetails: extractError
        });
        throw extractError; // Re-throw to be caught by outer catch
      }
    } catch (error) {
      log(`Failed to extract leadership: ${error}`, 'warn');
      return [];
    }
  }
}
