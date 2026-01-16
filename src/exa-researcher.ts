import Exa from 'exa-js';
import {
  CompanyInfo,
  News,
  NewsItem,
  TechStack,
  Competitors,
  Competitor,
  CompanyResearchReport
} from './types';
import { log } from './utils';

/**
 * Fast company researcher using Exa AI Search API
 * Much faster than browser automation (~500ms vs 30-60s)
 */
export class ExaResearcher {
  private exa: Exa;

  constructor() {
    const apiKey = process.env.EXA_API_KEY;
    if (!apiKey) {
      throw new Error('EXA_API_KEY is required for fast search');
    }
    this.exa = new Exa(apiKey);
  }

  /**
   * Fast company research using Exa API
   * Returns results in seconds instead of minutes
   */
  async research(companyName: string): Promise<CompanyResearchReport> {
    log(`[Exa] Starting fast research for: ${companyName}`, 'info');
    const startTime = Date.now();

    // Run all searches in parallel for maximum speed
    const [companyInfo, news, competitors, techStack] = await Promise.all([
      this.extractCompanyInfo(companyName),
      this.extractNews(companyName),
      this.extractCompetitors(companyName),
      this.extractTechStack(companyName),
    ]);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    log(`[Exa] Research completed in ${duration}s`, 'success');

    return {
      companyInfo,
      news,
      techStack,
      competitors,
      researchDate: new Date().toISOString(),
    };
  }

  async getCompanyFacts(companyName: string): Promise<CompanyInfo> {
    return this.extractCompanyInfo(companyName);
  }

  async getNews(companyName: string): Promise<News> {
    return this.extractNews(companyName);
  }

  private async extractCompanyInfo(companyName: string): Promise<CompanyInfo> {
    log('[Exa] Extracting company info...', 'info');

    try {
      const results = await this.exa.searchAndContents(
        `${companyName} official site about mission headquarters`,
        {
          type: 'auto',
          numResults: 5,
          category: 'company',
          text: { maxCharacters: 2000 },
          livecrawl: 'preferred',
        }
      );

      const texts = results.results
        .map((item) => item.text || '')
        .filter(Boolean);

      const joinedText = texts.join('\n');

      const extractMission = () => {
        const missionMatch = joinedText.match(/([^.\n]*\bmission\b[^.\n]*\.)/i);
        return missionMatch?.[1]?.trim() || null;
      };

      const extractHeadquarters = () => {
        const hqPatterns = [
          /headquartered in ([^,.]+)/i,
          /headquarters in ([^,.]+)/i,
          /based in ([^,.]+)/i,
          /located in ([^,.]+)/i,
        ];
        for (const pattern of hqPatterns) {
          const match = joinedText.match(pattern);
          if (match) {
            return match[1].trim();
          }
        }
        return null;
      };

      const extractIndustry = () => {
        const industryMatch = joinedText.match(/industry\s*[:\-]\s*([^\n.]+)/i);
        if (industryMatch) {
          return industryMatch[1].trim();
        }
        const sectorMatch = joinedText.match(/sector\s*[:\-]\s*([^\n.]+)/i);
        if (sectorMatch) {
          return sectorMatch[1].trim();
        }
        return null;
      };

      const extractDescription = () => {
        const firstParagraph = texts
          .map((text) => text.split('\n').find((line) => line.trim().length > 80))
          .find(Boolean);
        return firstParagraph?.trim() || null;
      };

      const companyInfo: CompanyInfo = {
        name: companyName,
        description: extractDescription(),
        mission: extractMission(),
        headquarters: extractHeadquarters(),
        industry: extractIndustry(),
        website: results.results.find((item) => item.url)?.url || null,
      };

      log('[Exa] Company info extracted', 'success');
      return companyInfo;
    } catch (error) {
      log(`[Exa] Failed to extract company info: ${error}`, 'warn');
      return {
        name: companyName,
        description: null,
        mission: null,
        headquarters: null,
        industry: null,
        website: null,
      };
    }
  }

  private async extractNews(companyName: string): Promise<News> {
    log('[Exa] Extracting news...', 'info');

    try {
      const result = await this.exa.searchAndContents(
        `${companyName} company news announcement`,
        {
          type: 'auto',
          numResults: 5,
          category: 'news',
          text: { maxCharacters: 500 },
          summary: true,
          livecrawl: 'preferred',
        }
      );

      const news: NewsItem[] = result.results.map((item) => ({
        title: item.title || 'Untitled',
        date: item.publishedDate || new Date().toISOString().split('T')[0],
        source: new URL(item.url).hostname.replace('www.', ''),
        summary: item.summary || item.text?.slice(0, 200) || 'No summary available',
        url: item.url,
      }));

      log(`[Exa] Found ${news.length} news items`, 'success');
      return news;
    } catch (error) {
      log(`[Exa] Failed to extract news: ${error}`, 'warn');
      return [];
    }
  }

  private async extractCompetitors(companyName: string): Promise<Competitors> {
    log('[Exa] Extracting competitors...', 'info');

    try {
      const result = await this.exa.searchAndContents(
        `${companyName} competitors alternatives similar companies`,
        {
          type: 'auto',
          numResults: 7,
          category: 'company',
          text: { maxCharacters: 500 },
          summary: true,
        }
      );

      // Also do a direct search for competitor analysis
      const analysisResult = await this.exa.searchAndContents(
        `"${companyName}" competitor analysis market`,
        {
          type: 'auto',
          numResults: 3,
          text: { maxCharacters: 1000 },
          summary: true,
        }
      );

      // Extract competitor names from results
      const competitors: Competitor[] = [];
      const seenNames = new Set([companyName.toLowerCase()]);

      // Try to parse competitors from analysis text
      const analysisText = analysisResult.results[0]?.text || analysisResult.results[0]?.summary || '';

      // Common competitor patterns
      const competitorPatterns = [
        /competitors?\s+(?:include|are|such as)\s+([^.]+)/gi,
        /competes?\s+with\s+([^.]+)/gi,
        /alternatives?\s+(?:to|include)\s+([^.]+)/gi,
      ];

      for (const pattern of competitorPatterns) {
        const matches = analysisText.matchAll(pattern);
        for (const match of matches) {
          const names = match[1].split(/,|and/).map(n => n.trim()).filter(n => n.length > 2 && n.length < 50);
          for (const name of names) {
            if (!seenNames.has(name.toLowerCase())) {
              seenNames.add(name.toLowerCase());
              competitors.push({
                name,
                description: `Competitor in the same market as ${companyName}`,
                website: null,
              });
            }
          }
        }
      }

      // Add results from company search
      for (const item of result.results) {
        const name = item.title?.split(/[-–|]/)[0]?.trim() || '';
        if (name && !seenNames.has(name.toLowerCase()) && name.toLowerCase() !== companyName.toLowerCase()) {
          seenNames.add(name.toLowerCase());
          competitors.push({
            name,
            description: item.summary || item.text?.slice(0, 200) || 'No description available',
            website: item.url,
          });
        }
      }

      log(`[Exa] Found ${competitors.length} competitors`, 'success');
      return competitors.slice(0, 7);
    } catch (error) {
      log(`[Exa] Failed to extract competitors: ${error}`, 'warn');
      return [];
    }
  }

  private async extractTechStack(companyName: string): Promise<TechStack> {
    log('[Exa] Extracting tech stack...', 'info');

    try {
      const result = await this.exa.searchAndContents(
        `${companyName} engineering tech stack technologies programming languages`,
        {
          type: 'auto',
          numResults: 5,
          text: { maxCharacters: 1500 },
          summary: true,
        }
      );

      // Also search for job postings
      const jobsResult = await this.exa.searchAndContents(
        `${companyName} careers jobs software engineer requirements`,
        {
          type: 'auto',
          numResults: 3,
          text: { maxCharacters: 1000 },
        }
      );

      // Combine all text for analysis
      const allText = [
        ...result.results.map(r => r.text || r.summary || ''),
        ...jobsResult.results.map(r => r.text || ''),
      ].join(' ').toLowerCase();

      // Define tech categories
      const languageKeywords = ['python', 'javascript', 'typescript', 'java', 'go', 'golang', 'rust', 'c++', 'ruby', 'scala', 'kotlin', 'swift', 'php'];
      const frameworkKeywords = ['react', 'next.js', 'vue', 'angular', 'django', 'flask', 'express', 'fastapi', 'spring', 'rails', 'node.js', 'tensorflow', 'pytorch'];
      const toolKeywords = ['docker', 'kubernetes', 'git', 'jenkins', 'terraform', 'ansible', 'grafana', 'prometheus', 'elasticsearch', 'redis', 'kafka', 'rabbitmq'];
      const infraKeywords = ['aws', 'gcp', 'azure', 'cloudflare', 'vercel', 'heroku', 'digitalocean', 'mongodb', 'postgresql', 'mysql', 'dynamodb', 's3'];

      const techStack: TechStack = {
        languages: languageKeywords.filter(k => allText.includes(k)),
        frameworks: frameworkKeywords.filter(k => allText.includes(k.toLowerCase())),
        tools: toolKeywords.filter(k => allText.includes(k)),
        infrastructure: infraKeywords.filter(k => allText.includes(k)),
      };

      log('[Exa] Tech stack extracted', 'success');
      return techStack;
    } catch (error) {
      log(`[Exa] Failed to extract tech stack: ${error}`, 'warn');
      return {
        languages: [],
        frameworks: [],
        tools: [],
        infrastructure: [],
      };
    }
  }
}

/**
 * Check if Exa is available (API key configured)
 */
export function isExaAvailable(): boolean {
  return !!process.env.EXA_API_KEY;
}
