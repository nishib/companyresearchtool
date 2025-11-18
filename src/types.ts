import { z } from 'zod';

// Zod schemas for structured data extraction
export const CompanyInfoSchema = z.object({
  name: z.string().describe('Official company name'),
  mission: z.string().describe('Company mission statement or tagline'),
  description: z.string().describe('Brief company description or about section'),
  founded: z.string().optional().describe('Year founded'),
  headquarters: z.string().optional().describe('Headquarters location'),
  industry: z.string().optional().describe('Industry or sector'),
  website: z.string().optional().describe('Official website URL'),
});

export const NewsItemSchema = z.object({
  title: z.string().describe('News headline or title'),
  date: z.string().describe('Publication date'),
  source: z.string().describe('News source or publication'),
  summary: z.string().describe('Brief summary of the news'),
  url: z.string().optional().describe('Link to full article'),
});

export const NewsSchema = z.object({
  articles: z.array(NewsItemSchema).describe('Recent company news items'),
});

export const TechStackSchema = z.object({
  languages: z.array(z.string()).describe('Programming languages used'),
  frameworks: z.array(z.string()).describe('Frameworks and libraries'),
  tools: z.array(z.string()).describe('Development tools and platforms'),
  infrastructure: z.array(z.string()).describe('Cloud and infrastructure technologies'),
});

export const LeaderSchema = z.object({
  name: z.string().describe('Full name'),
  title: z.string().describe('Job title or position'),
  bio: z.string().optional().describe('Brief biography or background'),
  linkedin: z.string().optional().describe('LinkedIn profile URL'),
});

export const LeadershipSchema = z.object({
  leaders: z.array(LeaderSchema).describe('Company leadership team'),
});

// TypeScript types
export type CompanyInfo = z.infer<typeof CompanyInfoSchema>;
export type NewsItem = z.infer<typeof NewsItemSchema>;
export type TechStack = z.infer<typeof TechStackSchema>;
export type Leader = z.infer<typeof LeaderSchema>;

// News and Leadership are arrays of items
export type News = NewsItem[];
export type Leadership = Leader[];

export interface CompanyResearchReport {
  companyInfo: CompanyInfo;
  news: News;
  techStack: TechStack;
  leadership: Leadership;
  researchDate: string;
}

export interface ResearchOptions {
  companyName: string;
  outputPath?: string;
  verbose?: boolean;
}
