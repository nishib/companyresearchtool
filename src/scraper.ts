// MUST be first - configures environment to prevent pino errors
import './init.js';
import { Stagehand } from '@browserbasehq/stagehand';
import { z } from 'zod';
import {
  CompanyInfo,
  CompanyInfoSchema,
  News,
  NewsSchema,
  TechStack,
  TechStackSchema,
  Competitors,
  CompetitorsSchema,
  Recruiters,
  RecruitersSchema,
  CompanyResearchReport,
} from './types';
import { log, delay, retryWithBackoff, isRetryableError } from './utils';

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

  private normalizeWebsite(url?: string | null): string | null {
    if (!url) return null;
    try {
      const parsed = new URL(url);
      return `${parsed.protocol}//${parsed.hostname}`;
    } catch {
      return null;
    }
  }

  private sanitizeCompetitors(raw: Competitors): Competitors {
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
      .map((competitor) => ({
        name: competitor?.name?.trim() ?? '',
        description: competitor?.description?.trim() ?? null,
        website: this.normalizeWebsite(competitor?.website ?? null),
      }))
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
      const competitors = await this.extractCompetitors(companyName);
      const news = await this.extractNews(companyName);
      const techStack = await this.extractTechStack(companyName);

      return {
        companyInfo,
        news,
        techStack,
        competitors,
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

      const companyWebsite = this.guessCompanyWebsite(companyName);
      const candidatePaths = [
        '',
        'about',
        'about-us',
        'company',
        'company/about',
        'mission',
        'values',
        'leadership',
        'press',
        'newsroom',
      ];

      let combined: CompanyInfo = {
        name: companyName,
        mission: null,
        description: null,
        headquarters: null,
        industry: null,
        website: null,
      };

      for (const pathSegment of candidatePaths) {
        const url = pathSegment
          ? `${companyWebsite}/${pathSegment}`.replace(/\/{2,}/g, '/').replace(':/', '://')
          : companyWebsite;

        try {
          log(`Navigating to ${url}...`, 'info');
          try {
            await page.goto(url, {
              waitUntil: 'networkidle',
              timeoutMs: 30000,
            });
          } catch (navError) {
            log('Network idle failed, trying domcontentloaded...', 'warn');
            await page.goto(url, {
              waitUntil: 'domcontentloaded',
              timeoutMs: 30000,
            });
          }

          await delay(4000);

          const pageInfo = await retryWithBackoff(
            async () => {
              return await this.stagehand.extract(
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
            },
            {
              maxRetries: 1,
              initialDelay: 1500,
              shouldRetry: isRetryableError,
            }
          );

          combined = {
            name: pageInfo.name || combined.name,
            mission: combined.mission || pageInfo.mission || null,
            description: combined.description || pageInfo.description || null,
            headquarters: combined.headquarters || pageInfo.headquarters || null,
            industry: combined.industry || pageInfo.industry || null,
            website: combined.website || pageInfo.website || null,
          };

          const hasAllCoreFields =
            Boolean(combined.description) &&
            Boolean(combined.mission) &&
            Boolean(combined.headquarters) &&
            Boolean(combined.industry);

          if (hasAllCoreFields) {
            break;
          }
        } catch (extractError) {
          const errorMessage = extractError instanceof Error ? extractError.message : String(extractError);
          log(`Company info source failed (${pathSegment || 'root'}): ${errorMessage}`, 'warn');
        }
      }

      log('Company fields extracted from page content', 'success');
      console.log(`[Extract] Combined company info:`, JSON.stringify(combined, null, 2));
      return combined;
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

  private async extractCompetitors(companyName: string): Promise<Competitors> {
    log('Extracting competitors...', 'info');

    try {
      const page = this.getPage();

      // Use current page context (already on company website)
      await delay(2000);

      // Extract competitors using page context only
      let competitorsData;
      try {
        log(`[Extract] Starting competitors extraction for ${companyName}`, 'info');
        competitorsData = await this.stagehand.extract(
          `From the visible content only, list up to 5 direct competitors that are actual companies (not articles, lists, communities, or forums). Use exact wording from the page; do not paraphrase.\n` +
          'If a competitor is not explicitly referenced on the page, omit it.\n' +
          'For each competitor, provide:\n' +
          '- Company name (official name)\n' +
          '- Short description based on the page (1-2 sentences)\n' +
          '- Website URL if explicitly shown\n',
          CompetitorsSchema
        );
        const competitors = this.sanitizeCompetitors(competitorsData.competitors || []);
        log(`Extracted ${competitors.length} competitors`, 'success');
        console.log(`[Extract] Successfully extracted competitors:`, JSON.stringify(competitorsData, null, 2));
        return competitors.slice(0, 7); // Limit to 7 competitors
      } catch (extractError) {
        const errorMessage = extractError instanceof Error ? extractError.message : String(extractError);
        const errorStack = extractError instanceof Error ? extractError.stack : undefined;
        log(`Failed to extract competitors: ${errorMessage}`, 'error');
        console.error(`[Extract] Failed to extract competitors:`, {
          error: errorMessage,
          stack: errorStack,
          companyName,
          errorType: extractError?.constructor?.name,
          errorDetails: extractError
        });
        throw extractError;
      }
    } catch (error) {
      log(`Failed to extract competitors: ${error}`, 'warn');
      return [];
    }
  }

  private async extractNews(companyName: string): Promise<News> {
    log('Extracting recent news...', 'info');

    try {
      const page = this.getPage();

      const companyWebsite = this.guessCompanyWebsite(companyName);
      const newsPaths = [
        'newsroom',
        'news',
        'blog',
        'press',
        'updates',
        'company/news',
      ];

      for (const pathSegment of newsPaths) {
        const url = `${companyWebsite}/${pathSegment}`.replace(/\/{2,}/g, '/').replace(':/', '://');
        try {
          log(`[Extract] Checking news source: ${url}`, 'info');
          await page.goto(url, { waitUntil: 'domcontentloaded', timeoutMs: 30000 });
          await delay(2000);

          const newsData = await this.stagehand.extract(
            'Extract the top 5 recent news articles about this company. For each article, get the title, date, source, and a brief summary. Only include news from the last 6 months if possible. Use only the visible content.',
            NewsSchema
          );
          const news = newsData.articles || [];
          if (news.length > 0) {
            log(`Extracted ${news.length} news items from ${pathSegment}`, 'success');
            console.log(`[Extract] Successfully extracted news:`, JSON.stringify(newsData, null, 2));
            return news.slice(0, 5);
          }
        } catch (extractError) {
          const errorMessage = extractError instanceof Error ? extractError.message : String(extractError);
          log(`News source failed (${pathSegment}): ${errorMessage}`, 'warn');
        }
      }

      log('No news items found from known news paths', 'warn');
      return [];
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

  /**
   * Extract recruiters from LinkedIn and company website
   * Searches for recruiters, talent acquisition, and HR professionals
   */
  async extractRecruiters(companyName: string): Promise<Recruiters> {
    log('Extracting recruiters...', 'info');

    const recruiters: Recruiters = [];

    try {
      const page = this.getPage();

      // Step 1: Try LinkedIn search for recruiters
      log('Searching LinkedIn for recruiters...', 'info');
      try {
        // Search LinkedIn for company recruiters
        const linkedInSearchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(companyName + ' recruiter')}&origin=GLOBAL_SEARCH_HEADER`;
        await page.goto(linkedInSearchUrl, {
          waitUntil: 'domcontentloaded',
          timeoutMs: 30000,
        });
        await delay(3000); // Wait for content to load

        // Extract recruiter profiles from LinkedIn search results
        const linkedInRecruiters = await retryWithBackoff(
          async () => {
            return await this.stagehand.extract(
              `Extract recruiter profiles from LinkedIn search results. Look for people with titles containing "Recruiter", "Talent Acquisition", "HR", "People Operations", or similar recruiting roles at ${companyName}.\n\n` +
              'For each person found, extract:\n' +
              '- Full name\n' +
              '- Job title (exact title from their profile)\n' +
              '- LinkedIn profile URL\n' +
              '- Department they recruit for (if mentioned)\n\n' +
              `Only include people who work at or recruit for ${companyName}. Limit to 10 recruiters.`,
              RecruitersSchema
            );
          },
          {
            maxRetries: 2,
            initialDelay: 2000,
            shouldRetry: isRetryableError,
          }
        );

        if (linkedInRecruiters?.recruiters?.length > 0) {
          recruiters.push(...linkedInRecruiters.recruiters);
          log(`Found ${linkedInRecruiters.recruiters.length} recruiters on LinkedIn`, 'success');
        }
      } catch (linkedInError) {
        log(`LinkedIn search failed: ${linkedInError instanceof Error ? linkedInError.message : linkedInError}`, 'warn');
      }

      // Step 2: Check company careers/team page
      log('Checking company careers/team page...', 'info');
      try {
        const companyWebsite = this.guessCompanyWebsite(companyName);

        // Try careers page first
        await page.goto(`${companyWebsite}/careers`, {
          waitUntil: 'domcontentloaded',
          timeoutMs: 20000,
        });
        await delay(2000);

        const careersRecruiters = await this.stagehand.extract(
          `Look for recruiting team members, HR contacts, or talent acquisition professionals on this page.\n\n` +
          'Extract:\n' +
          '- Full name\n' +
          '- Job title\n' +
          '- Email (if publicly listed)\n' +
          '- Department they recruit for\n\n' +
          'Also check for "Contact Recruiting", "Meet Our Team", or similar sections.',
          RecruitersSchema
        );

        if (careersRecruiters?.recruiters?.length > 0) {
          // Avoid duplicates by checking names
          const existingNames = new Set(recruiters.map(r => r.name.toLowerCase()));
          const newRecruiters = careersRecruiters.recruiters.filter(
            r => !existingNames.has(r.name.toLowerCase())
          );
          recruiters.push(...newRecruiters);
          log(`Found ${newRecruiters.length} additional recruiters on careers page`, 'success');
        }
      } catch (careersError) {
        log(`Careers page search failed: ${careersError instanceof Error ? careersError.message : careersError}`, 'warn');
      }

      // Step 3: Try team/about page
      try {
        const companyWebsite = this.guessCompanyWebsite(companyName);
        await page.goto(`${companyWebsite}/about`, {
          waitUntil: 'domcontentloaded',
          timeoutMs: 20000,
        });
        await delay(2000);

        const teamRecruiters = await this.stagehand.extract(
          `Look for HR, People Operations, or Recruiting team members on this about/team page.\n\n` +
          'Extract:\n' +
          '- Full name\n' +
          '- Job title (look for titles with HR, Recruiting, Talent, People in them)\n' +
          '- LinkedIn URL (if available)\n' +
          '- Department\n',
          RecruitersSchema
        );

        if (teamRecruiters?.recruiters?.length > 0) {
          const existingNames = new Set(recruiters.map(r => r.name.toLowerCase()));
          const newRecruiters = teamRecruiters.recruiters.filter(
            r => !existingNames.has(r.name.toLowerCase())
          );
          recruiters.push(...newRecruiters);
          log(`Found ${newRecruiters.length} additional recruiters on about page`, 'success');
        }
      } catch (aboutError) {
        log(`About page search failed: ${aboutError instanceof Error ? aboutError.message : aboutError}`, 'warn');
      }

      // Step 4: Use LLM knowledge as fallback for well-known companies
      if (recruiters.length === 0) {
        log('No recruiters found, using LLM knowledge...', 'info');
        try {
          const knowledgeRecruiters = await this.stagehand.extract(
            `Based on your knowledge, who are some known recruiters or talent acquisition professionals at ${companyName}?\n\n` +
            'For well-known companies, you may have information about:\n' +
            '- Head of Recruiting / Talent Acquisition\n' +
            '- Technical Recruiters\n' +
            '- University Recruiters\n' +
            '- HR Leadership\n\n' +
            'Provide names and titles if known. Include LinkedIn URLs if you know them.',
            RecruitersSchema
          );

          if (knowledgeRecruiters?.recruiters?.length > 0) {
            recruiters.push(...knowledgeRecruiters.recruiters);
            log(`Added ${knowledgeRecruiters.recruiters.length} recruiters from LLM knowledge`, 'success');
          }
        } catch (knowledgeError) {
          log(`LLM knowledge extraction failed: ${knowledgeError instanceof Error ? knowledgeError.message : knowledgeError}`, 'warn');
        }
      }

      log(`Total recruiters found: ${recruiters.length}`, 'success');
      return recruiters.slice(0, 10); // Limit to 10 recruiters

    } catch (error) {
      log(`Failed to extract recruiters: ${error}`, 'error');
      return [];
    }
  }

}
