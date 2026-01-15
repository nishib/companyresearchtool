import { z } from 'zod';

// Zod schemas for structured data extraction
export const CompanyInfoSchema = z.object({
  name: z.string().describe('Official company name'),
  mission: z.string().nullish().describe('Company mission statement or tagline'),
  description: z.string().nullish().describe('Brief company description or about section'),
  headquarters: z.string().nullish().describe('Headquarters location'),
  industry: z.string().nullish().describe('Industry or sector'),
  website: z.string().nullish().describe('Official website URL'),
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

export const CompetitorSchema = z.object({
  name: z.string().describe('Competitor company name'),
  description: z.string().nullish().describe('Brief description of what they do'),
  website: z.string().nullish().describe('Competitor website URL'),
});

export const CompetitorsSchema = z.object({
  competitors: z.array(CompetitorSchema).describe('Main competitors of the company'),
});

// Recruiter schemas for finding HR contacts
export const RecruiterSchema = z.object({
  name: z.string().describe('Full name of the recruiter'),
  title: z.string().describe('Job title (e.g., Technical Recruiter, Talent Acquisition Manager)'),
  linkedInUrl: z.string().optional().describe('LinkedIn profile URL'),
  email: z.string().optional().describe('Email address if publicly available'),
  department: z.string().optional().describe('Department or team they recruit for'),
});

export const RecruitersSchema = z.object({
  recruiters: z.array(RecruiterSchema).describe('Recruiters and HR contacts at the company'),
});

// TypeScript types
export type CompanyInfo = z.infer<typeof CompanyInfoSchema>;
export type NewsItem = z.infer<typeof NewsItemSchema>;
export type TechStack = z.infer<typeof TechStackSchema>;
export type Competitor = z.infer<typeof CompetitorSchema>;
export type Recruiter = z.infer<typeof RecruiterSchema>;

// News, Competitors, and Recruiters are arrays of items
export type News = NewsItem[];
export type Competitors = Competitor[];
export type Recruiters = Recruiter[];

export interface CompanyResearchReport {
  companyInfo: CompanyInfo;
  news: News;
  techStack: TechStack;
  competitors: Competitors;
  researchDate: string;
}

export interface ResearchOptions {
  companyName: string;
  outputPath?: string;
  verbose?: boolean;
}
