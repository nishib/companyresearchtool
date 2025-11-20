# Stagehand Implementation Guide

This document explains how Stagehand is implemented in this company research tool.

## What is Stagehand?

Stagehand is an AI-powered browser automation framework built on Playwright that uses LLMs to extract structured data from web pages. Instead of brittle CSS selectors, it uses AI to understand page content semantically.

---

## Project Architecture

### File Structure

```
src/
├── scraper.ts          # Main Stagehand integration
├── types.ts            # Zod schemas for extraction
├── report-generator.ts # Markdown report generation
├── server.ts           # Express API wrapper
└── index.ts            # CLI interface

api/
└── research.ts         # Vercel serverless function
```

---

## How This Project Uses Stagehand

### 1. Initialization (`src/scraper.ts`)

```typescript
export class CompanyResearcher {
  private stagehand: Stagehand;

  constructor(verbose: boolean = false) {
    // Auto-detect environment: Browserbase (cloud) or local
    const env = process.env.BROWSERBASE_API_KEY && process.env.BROWSERBASE_PROJECT_ID
      ? 'BROWSERBASE'
      : 'LOCAL';

    const modelConfig = this.getModelConfig();

    this.stagehand = new Stagehand({
      env,
      verbose: verbose ? 1 : 0,
      apiKey: process.env.BROWSERBASE_API_KEY,
      projectId: process.env.BROWSERBASE_PROJECT_ID,
      disablePino: true,
      disableAPI: true, // Force client-side extraction
      model: modelConfig.modelName ? {
        ...modelConfig.modelClientOptions,
        modelName: modelConfig.modelName,
      } : undefined,
    });
  }
}
```

**Key Settings:**
- `env`: Automatically uses Browserbase if credentials exist, otherwise local Chrome
- `disableAPI: true`: Forces client-side extraction (more reliable than API mode)
- `disablePino: true`: Suppresses logging library errors in serverless

### 2. LLM Configuration

```typescript
private getModelConfig() {
  // Priority: Google Gemini > Anthropic Claude > OpenAI GPT
  if (process.env.GOOGLE_API_KEY) {
    return {
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
```

### 3. Data Schemas (`src/types.ts`)

Zod schemas define the structure of extracted data:

```typescript
export const CompanyInfoSchema = z.object({
  name: z.string().describe('Official company name'),
  mission: z.string().nullish().describe('Company mission statement'),
  description: z.string().nullish().describe('Brief company description'),
  headquarters: z.string().nullish().describe('Headquarters location'),
  industry: z.string().nullish().describe('Industry or sector'),
  website: z.string().nullish().describe('Official website URL'),
});

export const CompetitorSchema = z.object({
  name: z.string().describe('Competitor company name'),
  description: z.string().nullish().describe('Brief description'),
  website: z.string().nullish().describe('Competitor website URL'),
});

export const CompetitorsSchema = z.object({
  competitors: z.array(CompetitorSchema).describe('Main competitors'),
});
```

### 4. Extraction Process

#### Company Info Extraction

```typescript
const companyInfo = await this.stagehand.extract(
  `You are researching ${companyName}. Extract ALL available information using ` +
  `the page content as primary source, but MUST supplement with your general ` +
  `knowledge for any missing details.\n\n` +
  'REQUIRED FIELDS (do NOT return null - use your knowledge if not on page):\n' +
  `- name: "${companyName}" or official name from page\n` +
  `- description: Write 4-6 sentences describing what ${companyName} does...\n` +
  `- mission: Write 4-6 sentences about ${companyName}'s mission...\n` +
  `- headquarters: City and country/state\n` +
  `- industry: Specific sector\n` +
  `- website: Official URL\n`,
  CompanyInfoSchema
);
```

**Important:** The prompt instructs the LLM to use both page content AND its knowledge to fill in missing fields.

#### Fallback Validation

If fields are missing after extraction, individual fallback calls are made:

```typescript
if (!companyInfo.headquarters) {
  const result = await this.stagehand.extract(
    `Where is ${companyName}'s headquarters located? Respond with city and ` +
    `state/country. Use your knowledge of ${companyName}.`,
    z.object({ headquarters: z.string() })
  );
  companyInfo.headquarters = result.headquarters || "Location not specified";
}
```

#### Competitors Extraction

```typescript
const competitorsData = await this.stagehand.extract(
  `Based on the visible content and your knowledge of ${companyName}, ` +
  `identify 5-7 main competitors in the same industry. For each competitor:\n` +
  '- Company name (exact official name)\n' +
  '- Brief description of what they do (2-3 lines)\n' +
  '- Website URL (if known)\n' +
  'Use both the page content and your general knowledge.',
  CompetitorsSchema
);
```

### 5. Navigation Pattern

```typescript
// Navigate to company website
const companyWebsite = this.guessCompanyWebsite(companyName);
await page.goto(companyWebsite, {
  waitUntil: 'networkidle',
  timeoutMs: 30000,
});

// Wait for dynamic content
await delay(5000);

// Extract data
const companyInfo = await this.stagehand.extract(...);
```

**Website Guessing Logic:**

```typescript
private guessCompanyWebsite(companyName: string): string {
  const knownCompanies: Record<string, string> = {
    'stripe': 'https://stripe.com',
    'anthropic': 'https://www.anthropic.com',
    'openai': 'https://openai.com',
    // ... more mappings
  };

  const normalized = companyName.toLowerCase().trim();
  return knownCompanies[normalized] || `https://www.${normalized}.com`;
}
```

### 6. Retry Logic with Exponential Backoff

```typescript
companyInfo = await retryWithBackoff(
  async () => {
    return await this.stagehand.extract(instruction, CompanyInfoSchema);
  },
  {
    maxRetries: 2,
    initialDelay: 2000,
    shouldRetry: isRetryableError, // Retries on rate limits, timeouts, parse errors
  }
);
```

### 7. Report Generation (`src/report-generator.ts`)

After extraction, data is formatted into markdown:

```typescript
async generateMarkdown(report: CompanyResearchReport): Promise<string> {
  const { companyInfo, news, techStack, leadership, competitors, researchDate } = report;

  let markdown = '';
  markdown += `# ${companyInfo.name} - Company Research Report\n\n`;
  markdown += `**Research Date:** ${formatDate()}\n\n`;

  // Company Overview
  markdown += `## 📋 Company Overview\n\n`;
  markdown += `**Mission:** ${companyInfo.mission}\n\n`;
  markdown += `${companyInfo.description}\n\n`;

  // Key Facts
  if (companyInfo.headquarters || companyInfo.industry || companyInfo.website) {
    markdown += `### Key Facts\n\n`;
    if (companyInfo.headquarters) markdown += `- **Headquarters:** ${companyInfo.headquarters}\n`;
    if (companyInfo.industry) markdown += `- **Industry:** ${companyInfo.industry}\n`;
    if (companyInfo.website) markdown += `- **Website:** ${companyInfo.website}\n`;
  }

  // Competitors
  markdown += `## 🏢 Competitors\n\n`;
  if (competitors.length > 0) {
    competitors.forEach(competitor => {
      markdown += `### ${competitor.name}\n\n`;
      if (competitor.description) markdown += `${competitor.description}\n\n`;
      if (competitor.website) markdown += `- **Website:** ${competitor.website}\n\n`;
    });
  }

  return markdown;
}
```

---

## API Implementation (`api/research.ts`)

The Vercel serverless function follows the same pattern:

```typescript
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { companyName } = req.body;

  const stagehand = new Stagehand({
    env: process.env.BROWSERBASE_API_KEY ? 'BROWSERBASE' : 'LOCAL',
    verbose: 0,
    apiKey: process.env.BROWSERBASE_API_KEY,
    projectId: process.env.BROWSERBASE_PROJECT_ID,
    disablePino: true,
    disableAPI: true,
    model: modelConfig.modelName ? {
      ...modelConfig.modelClientOptions,
      modelName: modelConfig.modelName,
    } : undefined,
  });

  await stagehand.init();

  // Get page and navigate
  const pages = stagehand.context.pages();
  const page = pages[0];
  await page.goto(website, { waitUntil: 'networkidle' });

  // Extract data
  const companyInfo = await stagehand.extract(instruction, CompanyInfoSchema);
  const competitors = await stagehand.extract(instruction, CompetitorsSchema);

  // Generate markdown
  const markdown = `# ${companyInfo.name}...`;

  await stagehand.close();

  res.status(200).json({ markdown, report: { companyInfo, competitors } });
}
```

---

## Error Handling

### Rate Limit Detection

```typescript
function extractRateLimitDelay(error: any): number {
  const errorMessage = error instanceof Error ? error.message : String(error);

  // Extract wait time from error message (e.g., "try again in 39 seconds")
  const waitMatch = errorMessage.match(/try again in (\d+) seconds?/i);
  if (waitMatch) {
    const seconds = parseInt(waitMatch[1], 10);
    return (seconds + 5) * 1000; // Add 5s buffer
  }

  return 60000; // Default 60s
}
```

### Retryable Errors

```typescript
function isRetryableError(error: any): boolean {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorName = error instanceof Error ? error.name : error?.constructor?.name || '';

  const isRateLimit = errorMessage.includes('429') ||
                     errorMessage.includes('rate limit') ||
                     errorMessage.includes('burst rate limit');

  return (
    isRateLimit ||
    errorName.includes('ParseError') ||
    errorName.includes('TimeoutError') ||
    errorMessage.includes('timeout') ||
    errorMessage.includes('network')
  );
}
```

---

## Environment Variables

Required environment variables:

```bash
# LLM API Key (choose one)
GOOGLE_API_KEY=your_google_api_key
# OR
ANTHROPIC_API_KEY=your_anthropic_api_key
# OR
OPENAI_API_KEY=your_openai_api_key

# Optional: Browserbase (cloud browser)
BROWSERBASE_API_KEY=your_browserbase_api_key
BROWSERBASE_PROJECT_ID=your_browserbase_project_id
```

---

## Usage Examples

### CLI Usage

```bash
# Local research
npm run research -- "Stripe"

# With verbose logging
npm run research -- "Anthropic" --verbose
```

### Programmatic Usage

```typescript
import { CompanyResearcher } from './src/scraper';

const researcher = new CompanyResearcher(true); // verbose=true
await researcher.initialize();

const report = await researcher.research('Stripe');
console.log(report.companyInfo);
console.log(report.competitors);

await researcher.close();
```

### API Usage

```bash
curl -X POST http://localhost:3000/api/research \
  -H "Content-Type: application/json" \
  -d '{"companyName": "Stripe"}'
```

---

## Key Implementation Decisions

1. **Client-Side Extraction (`disableAPI: true`)**: API mode was unstable, client-side is more reliable
2. **Browserbase Auto-Detection**: Automatically uses cloud browsers when credentials are present
3. **LLM Knowledge Fallback**: Instructs LLM to use its knowledge when page content is missing
4. **Field-by-Field Validation**: Individual extraction calls for missing critical fields
5. **Retry with Backoff**: Handles rate limits and transient errors gracefully
6. **Pino Suppression**: Prevents logging library errors in serverless environments

---

## Performance Considerations

- **Extraction Time**: 30-60 seconds per company (depends on LLM speed)
- **Rate Limits**: Gemini has burst rate limits, retry logic handles them
- **Timeout Settings**: 30s navigation, 60s total extraction timeout
- **Cost**: ~$0.01-0.05 per research (depending on LLM provider)

---

## Troubleshooting

### Common Issues

**"No page available in Stagehand context"**
- Cause: `stagehand.init()` not called
- Fix: Always call `await stagehand.init()` before `context.pages()`

**Rate limit errors (429)**
- Cause: LLM API rate limit exceeded
- Fix: Retry logic automatically handles this with exponential backoff

**Extraction returns null fields**
- Cause: LLM couldn't find data on page
- Fix: Field-by-field fallback extraction uses LLM knowledge

**Browserbase session fails**
- Cause: Invalid API key or project ID
- Fix: Verify credentials in `.env` file

---

## Output Format

Final markdown report structure:

```markdown
# Company Name - Company Research Report

**Research Date:** 2025-11-20

---

## 📋 Company Overview

**Mission:** Mission statement here

Company description (4-6 sentences)

### Key Facts

- **Headquarters:** Location
- **Industry:** Industry name
- **Website:** https://example.com

---

## 🏢 Competitors

### Competitor 1
Description of competitor
- **Website:** https://competitor1.com

### Competitor 2
Description of competitor
- **Website:** https://competitor2.com

---

*Report generated on 2025-11-20 using automated research tools*
```
