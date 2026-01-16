import Exa from 'exa-js';
import { Recruiters, Recruiter } from './types';
import { log } from './utils';

/**
 * Fast recruiter finder using Exa AI Search API
 * Finds actual recruiters currently employed at a company
 */
export class ExaRecruiterFinder {
  private exa: Exa;

  constructor() {
    const apiKey = process.env.EXA_API_KEY;
    if (!apiKey) {
      throw new Error('EXA_API_KEY is required for fast recruiter search');
    }
    this.exa = new Exa(apiKey);
  }

  /**
   * Find recruiters currently working at a company using Exa
   * Returns only verified LinkedIn profiles of actual employees
   */
  async findRecruiters(companyName: string): Promise<Recruiters> {
    log(`[Exa] Finding recruiters at: ${companyName}`, 'info');
    const startTime = Date.now();

    const recruiters: Recruiter[] = [];
    const seenNames = new Set<string>();

    // Focus on LinkedIn profiles - the most reliable source for current employees
    const linkedinResults = await this.searchLinkedInProfiles(companyName);

    // Add unique recruiters
    for (const recruiter of linkedinResults) {
      const nameKey = recruiter.name.toLowerCase();
      if (!seenNames.has(nameKey) && this.isValidRecruiter(recruiter)) {
        seenNames.add(nameKey);
        recruiters.push(recruiter);
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    log(`[Exa] Found ${recruiters.length} verified recruiters in ${duration}s`, 'success');

    return recruiters.slice(0, 10);
  }

  /**
   * Search for LinkedIn profiles of recruiters at the company
   */
  private async searchLinkedInProfiles(companyName: string): Promise<Recruiter[]> {
    log('[Exa] Searching LinkedIn profiles...', 'info');

    const recruiters: Recruiter[] = [];

    try {
      // Search specifically for LinkedIn profile pages with recruiting titles
      const queries = [
        `site:linkedin.com/in recruiter "${companyName}"`,
        `site:linkedin.com/in "talent acquisition" "${companyName}"`,
        `site:linkedin.com/in "technical recruiter" "${companyName}"`,
      ];

      for (const query of queries) {
        try {
          const result = await this.exa.searchAndContents(query, {
            type: 'auto',
            numResults: 10,
            text: { maxCharacters: 800 },
            livecrawl: 'preferred',
          });

          for (const item of result.results) {
            const recruiter = this.parseLinkedInProfile(item, companyName);
            if (recruiter) {
              recruiters.push(recruiter);
            }
          }
        } catch (err) {
          log(`[Exa] Query failed: ${query}`, 'warn');
        }
      }

      log(`[Exa] Found ${recruiters.length} recruiters on LinkedIn`, 'success');
      return recruiters;
    } catch (error) {
      log(`[Exa] LinkedIn search failed: ${error}`, 'warn');
      return [];
    }
  }

  /**
   * Parse a LinkedIn profile result into a Recruiter object
   */
  private parseLinkedInProfile(
    item: { url: string; title?: string | null; text?: string | null },
    companyName: string
  ): Recruiter | null {
    // Must be a LinkedIn profile URL (linkedin.com/in/)
    if (!item.url || !item.url.includes('linkedin.com/in/')) {
      return null;
    }

    const title = item.title ?? '';
    const text = (item.text ?? '').toLowerCase();
    const companyLower = companyName.toLowerCase();

    // Verify this person works at the target company
    const worksAtCompany =
      text.includes(companyLower) ||
      title.toLowerCase().includes(companyLower);

    if (!worksAtCompany) {
      return null;
    }

    // Parse name from LinkedIn title format: "FirstName LastName - Title - Company | LinkedIn"
    // or "FirstName LastName | LinkedIn"
    const namePart = title.split(/\s*[-–|]\s*/)[0]?.trim() || '';

    // Validate it looks like a real name (First Last format)
    if (!this.isValidPersonName(namePart)) {
      return null;
    }

    // Extract job title from the profile
    const jobTitle = this.extractJobTitle(title, text);

    // Must have a recruiting-related title
    if (!this.isRecruiterTitle(jobTitle) && !this.hasRecruiterKeywords(text)) {
      return null;
    }

    return {
      name: namePart,
      title: jobTitle || 'Recruiter',
      linkedInUrl: item.url,
      department: this.extractDepartment(text),
    };
  }

  /**
   * Check if a string looks like a valid person name
   */
  private isValidPersonName(name: string): boolean {
    if (!name || name.length < 3 || name.length > 50) {
      return false;
    }

    // Must have at least two words (first and last name)
    const parts = name.split(/\s+/);
    if (parts.length < 2) {
      return false;
    }

    // Each part should start with a capital letter and be mostly letters
    for (const part of parts) {
      if (!/^[A-Z][a-zA-Z'-]+$/.test(part)) {
        return false;
      }
    }

    // Filter out common non-name patterns
    const invalidPatterns = [
      /^(the|a|an)\s/i,
      /recruiter/i,
      /hiring/i,
      /jobs?$/i,
      /career/i,
      /guide/i,
      /team/i,
      /company/i,
      /salary/i,
      /contract/i,
      /listing/i,
    ];

    for (const pattern of invalidPatterns) {
      if (pattern.test(name)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Extract job title from LinkedIn profile
   */
  private extractJobTitle(title: string, text: string): string {
    // Try to extract from title (format: "Name - Title - Company")
    const parts = title.split(/\s*[-–|]\s*/);
    if (parts.length >= 2) {
      const potentialTitle = parts[1]?.trim();
      if (potentialTitle && potentialTitle.length > 2 && potentialTitle.length < 60) {
        return potentialTitle;
      }
    }

    // Try to find title in text
    const titlePatterns = [
      /(technical recruiter|senior recruiter|lead recruiter|staff recruiter)/i,
      /(talent acquisition (?:manager|lead|specialist|partner))/i,
      /(recruiting (?:manager|lead|coordinator))/i,
      /(head of (?:talent|recruiting|people))/i,
      /(hr (?:manager|director|business partner))/i,
      /(university recruiter|campus recruiter)/i,
    ];

    for (const pattern of titlePatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1].split(' ').map(w =>
          w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        ).join(' ');
      }
    }

    return 'Recruiter';
  }

  /**
   * Check if a title indicates a recruiting role
   */
  private isRecruiterTitle(title: string): boolean {
    const titleLower = title.toLowerCase();
    const recruiterKeywords = [
      'recruiter',
      'recruiting',
      'talent acquisition',
      'talent partner',
      'sourcer',
      'head of talent',
      'head of people',
      'hr manager',
      'hr director',
      'people operations',
    ];

    return recruiterKeywords.some(keyword => titleLower.includes(keyword));
  }

  /**
   * Check if profile text contains recruiter-related keywords
   */
  private hasRecruiterKeywords(text: string): boolean {
    const keywords = [
      'recruiting',
      'talent acquisition',
      'sourcing candidates',
      'hiring manager',
      'full-cycle recruiting',
      'technical recruiting',
      'campus recruiting',
    ];

    return keywords.some(keyword => text.includes(keyword));
  }

  /**
   * Validate a recruiter object
   */
  private isValidRecruiter(recruiter: Recruiter): boolean {
    return (
      this.isValidPersonName(recruiter.name) &&
      recruiter.linkedInUrl?.includes('linkedin.com/in/') === true
    );
  }

  /**
   * Extract department from profile text
   */
  private extractDepartment(text: string): string | undefined {
    const deptKeywords = [
      { keyword: 'engineering', dept: 'Engineering' },
      { keyword: 'technical', dept: 'Engineering' },
      { keyword: 'software', dept: 'Engineering' },
      { keyword: 'product', dept: 'Product' },
      { keyword: 'design', dept: 'Design' },
      { keyword: 'sales', dept: 'Sales' },
      { keyword: 'marketing', dept: 'Marketing' },
      { keyword: 'university', dept: 'University' },
      { keyword: 'campus', dept: 'University' },
      { keyword: 'executive', dept: 'Executive' },
      { keyword: 'leadership', dept: 'Executive' },
    ];

    for (const { keyword, dept } of deptKeywords) {
      if (text.includes(keyword)) {
        return dept;
      }
    }

    return undefined;
  }
}

export function isExaAvailable(): boolean {
  return !!process.env.EXA_API_KEY;
}
