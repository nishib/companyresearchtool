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
import { log, delay } from './utils.js';

export class CompanyResearcher {
  private stagehand: Stagehand;
  private verbose: boolean;

  constructor(verbose: boolean = false) {
    this.verbose = verbose;

    // Determine which LLM provider to use based on available API keys
    const modelConfig = this.getModelConfig();

    // Use BROWSERBASE if credentials available, otherwise LOCAL
    const env = process.env.BROWSERBASE_API_KEY && process.env.BROWSERBASE_PROJECT_ID
      ? 'BROWSERBASE'
      : 'LOCAL';

    this.stagehand = new Stagehand({
      env,
      verbose: verbose ? 1 : 0,
      apiKey: process.env.BROWSERBASE_API_KEY,
      projectId: process.env.BROWSERBASE_PROJECT_ID,
      ...modelConfig,
    });

    if (verbose) {
      log(`Environment: ${env}`, 'info');
    }
  }

  private getModelConfig(): { modelName?: string; modelClientOptions?: any } {
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
    const initResult = await this.stagehand.init();

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

  async research(companyName: string): Promise<CompanyResearchReport> {
    try {
      log(`Starting research for: ${companyName}`, 'info');

      // Run all research tasks
      const [companyInfo, news, techStack, leadership] = await Promise.all([
        this.extractCompanyInfo(companyName),
        this.extractNews(companyName),
        this.extractTechStack(companyName),
        this.extractLeadership(companyName),
      ]);

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
      const page = this.stagehand.page;

      // Navigate directly to the company website
      const companyWebsite = this.guessCompanyWebsite(companyName);
      log(`Navigating to ${companyWebsite}...`, 'info');
      await page.goto(companyWebsite);
      await delay(3000);

      // Extract company information from the website
      const companyInfo = await page.extract({
        instruction: 'Extract the company name, mission statement, description, founding year, headquarters location, industry, and website URL from this page. Look for About Us, Company, or similar sections.',
        schema: CompanyInfoSchema,
      });

      log('Company information extracted', 'success');
      return companyInfo;
    } catch (error) {
      log(`Failed to extract company info: ${error}`, 'warn');
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
      const page = this.stagehand.page;

      // Navigate to company newsroom or blog
      const companyWebsite = this.guessCompanyWebsite(companyName);
      await page.goto(`${companyWebsite}/newsroom`);
      await delay(2000);

      // Extract news items from search results
      const newsData = await page.extract({
        instruction: 'Extract the top 5 recent news articles about this company. For each article, get the title, date, source, and a brief summary. Only include news from the last 6 months if possible.',
        schema: NewsSchema,
      });

      const news = newsData.articles || [];
      log(`Extracted ${news.length} news items`, 'success');
      return news.slice(0, 5); // Limit to 5 items
    } catch (error) {
      log(`Failed to extract news: ${error}`, 'warn');
      return [];
    }
  }

  private async extractTechStack(companyName: string): Promise<TechStack> {
    log('Detecting tech stack...', 'info');

    try {
      const page = this.stagehand.page;

      // Navigate to company careers page
      const companyWebsite = this.guessCompanyWebsite(companyName);
      await page.goto(`${companyWebsite}/careers`);
      await delay(3000);

      // Extract tech stack
      const techStack = await page.extract({
        instruction: 'Extract information about the technologies used by this company. Look for programming languages, frameworks, tools, and infrastructure. If this is a careers page, look at job listings for required skills. If this is a tech blog, look at technologies mentioned.',
        schema: TechStackSchema,
      });

      log('Tech stack detected', 'success');
      return techStack;
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
      const page = this.stagehand.page;

      // Navigate to company about/team page
      const companyWebsite = this.guessCompanyWebsite(companyName);
      await page.goto(`${companyWebsite}/about`);
      await delay(3000);

      // Extract leadership
      const leadershipData = await page.extract({
        instruction: 'Extract information about the company leadership team. Get the names, titles, and brief bios of key executives (CEO, CTO, CFO, etc.). Include LinkedIn URLs if visible.',
        schema: LeadershipSchema,
      });

      const leadership = leadershipData.leaders || [];
      log(`Extracted ${leadership.length} leaders`, 'success');
      return leadership.slice(0, 10); // Limit to 10 leaders
    } catch (error) {
      log(`Failed to extract leadership: ${error}`, 'warn');
      return [];
    }
  }
}
