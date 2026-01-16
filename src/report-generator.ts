import { writeFile } from 'fs/promises';
import { CompanyResearchReport } from './types';
import { log, sanitizeFilename, formatDate } from './utils';

export class ReportGenerator {
  async generateMarkdown(report: CompanyResearchReport): Promise<string> {
    const { companyInfo, news, techStack, competitors, researchDate } = report;

    const cleanText = (value?: string | null, fallback: string = 'Not Available') => {
      if (!value) return fallback;
      const cleaned = value
        .replace(/^\s*#+\s*/g, '')
        .replace(/\s*\n+\s*/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();
      return cleaned || fallback;
    };

    const sanitizeNarrative = (value: string, companyName: string): string => {
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
    };

    const formatKeyFactValue = (value?: string | null): string => {
      if (!value) return 'Not Specified';
      const trimmed = value.trim();
      if (!trimmed) return 'Not Specified';
      const normalized = trimmed.toLowerCase();
      const replacements: Record<string, string> = {
        'ai': 'AI',
        'usa': 'USA',
        'u.s.a.': 'USA',
        'us': 'US',
        'u.s.': 'US',
        'uk': 'UK',
        'u.k.': 'UK',
        'eu': 'EU',
        'saas': 'SaaS',
      };
      if (replacements[normalized]) return replacements[normalized];
      if (trimmed.includes('http://') || trimmed.includes('https://')) return trimmed;
      return trimmed
        .split(' ')
        .map((word) => {
          const lower = word.toLowerCase();
          if (replacements[lower]) return replacements[lower];
          if (!word) return word;
          return word[0].toUpperCase() + word.slice(1);
        })
        .join(' ');
    };

    const formatStackItem = (value: string): string => {
      const trimmed = value.trim();
      if (!trimmed) return trimmed;
      const normalized = trimmed.toLowerCase();
      const map: Record<string, string> = {
        'javascript': 'JavaScript',
        'typescript': 'TypeScript',
        'node.js': 'Node.js',
        'next.js': 'Next.js',
        'react': 'React',
        'vue': 'Vue',
        'angular': 'Angular',
        'go': 'Go',
        'rust': 'Rust',
        'scala': 'Scala',
        'kubernetes': 'Kubernetes',
        'git': 'Git',
        'terraform': 'Terraform',
        'vercel': 'Vercel',
        'aws': 'AWS',
        'gcp': 'GCP',
        'sql': 'SQL',
        'nosql': 'NoSQL',
        'api': 'API',
        'sdk': 'SDK',
        'ci': 'CI',
        'cd': 'CD',
        'cdn': 'CDN',
        'graphql': 'GraphQL',
        'grpc': 'gRPC',
        'http': 'HTTP',
        'https': 'HTTPS',
      };
      if (map[normalized]) return map[normalized];
      if (/[A-Z]/.test(trimmed)) return trimmed;
      return trimmed
        .split(' ')
        .map((word) => {
          if (!word) return word;
          if (map[word.toLowerCase()]) return map[word.toLowerCase()];
          return word[0].toUpperCase() + word.slice(1);
        })
        .join(' ');
    };

    let markdown = '';

    // Header
    markdown += `Company Research Report\n\n`;
    markdown += `Company: ${companyInfo.name}\n`;
    markdown += `Research Date: ${formatDate()}\n\n`;

    // Company Information
    const overview = sanitizeNarrative(cleanText(companyInfo.description, 'Not Available'), companyInfo.name);
    const mission = sanitizeNarrative(cleanText(companyInfo.mission), companyInfo.name);
    markdown += `Company Overview\n`;
    markdown += `Mission: ${mission}\n\n`;
    markdown += `${overview === 'Not Available' ? 'No Description Available' : overview}\n\n`;

    if (companyInfo.headquarters || companyInfo.industry || companyInfo.website) {
      markdown += `Key Facts\n`;
      if (companyInfo.headquarters) markdown += `Headquarters: ${formatKeyFactValue(companyInfo.headquarters)}\n`;
      if (companyInfo.industry) markdown += `Industry: ${formatKeyFactValue(companyInfo.industry)}\n`;
      if (companyInfo.website) markdown += `Website: ${companyInfo.website}\n`;
      markdown += `\n`;
    }

    // Recent News
    markdown += `Recent News\n\n`;
    if (news.length > 0) {
      news.forEach((item, index) => {
        markdown += `${index + 1}. ${item.title}\n`;
        markdown += `Date: ${item.date} | Source: ${item.source}\n`;
        markdown += `${item.summary}\n`;
        if (item.url) {
          markdown += `Read More: ${item.url}\n`;
        }
        markdown += `\n`;
      });
    } else {
      markdown += `No Recent News Found\n\n`;
    }

    // Tech Stack
    markdown += `Technology Stack\n\n`;

    if (techStack.languages.length > 0) {
      const languages = techStack.languages.map(formatStackItem).join(', ');
      markdown += `Programming Languages: ${languages}\n\n`;
    }

    if (techStack.frameworks.length > 0) {
      const frameworks = techStack.frameworks.map(formatStackItem).join(', ');
      markdown += `Frameworks and Libraries: ${frameworks}\n\n`;
    }

    if (techStack.tools.length > 0) {
      const tools = techStack.tools.map(formatStackItem).join(', ');
      markdown += `Tools and Platforms: ${tools}\n\n`;
    }

    if (techStack.infrastructure.length > 0) {
      const infrastructure = techStack.infrastructure.map(formatStackItem).join(', ');
      markdown += `Infrastructure: ${infrastructure}\n\n`;
    }

    if (
      techStack.languages.length === 0 &&
      techStack.frameworks.length === 0 &&
      techStack.tools.length === 0 &&
      techStack.infrastructure.length === 0
    ) {
      markdown += `Tech Stack Information Not Found\n\n`;
    }

    // Competitors
    markdown += `Competitors\n\n`;
    if (competitors.length > 0) {
      competitors.forEach(competitor => {
        const description = sanitizeNarrative(cleanText(competitor.description, 'Not Available'), competitor.name);
        markdown += `Name: ${competitor.name}\n`;
        markdown += `Description: ${description === 'Not Available' ? 'No Description Available' : description}\n`;
        if (competitor.website) {
          markdown += `Website: ${competitor.website}\n`;
        }
        markdown += `\n`;
      });
    } else {
      markdown += `No Competitor Information Found\n\n`;
    }

    // Footer
    markdown += `Report Generated On ${researchDate} Using Automated Research Tools\n`;

    return markdown;
  }

  async saveReport(report: CompanyResearchReport, outputPath?: string): Promise<string> {
    const markdown = await this.generateMarkdown(report);
    const filename = outputPath || `${sanitizeFilename(report.companyInfo.name)}-research-${formatDate()}.md`;

    await writeFile(filename, markdown, 'utf-8');
    log(`Report saved to: ${filename}`, 'success');

    return filename;
  }

  async displayReport(report: CompanyResearchReport): Promise<void> {
    const markdown = await this.generateMarkdown(report);
    console.log('\n' + markdown);
  }
}
