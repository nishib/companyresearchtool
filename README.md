# Company Research CLI

An AI-powered tool that automates company research for job seekers. Built with [Stagehand SDK](https://github.com/browserbase/stagehand) for intelligent browser automation.

## 🎭 Powered by Stagehand

This project showcases **[Stagehand](https://github.com/browserbase/stagehand)** - an AI-native browser automation framework that combines:

- 🤖 **AI Intelligence** - Uses LLMs (Gemini/Claude/GPT) to understand web pages
- 🎯 **Structured Extraction** - Type-safe data extraction with Zod schemas
- 🚀 **Playwright Reliability** - Built on proven browser automation
- 🔄 **Adaptive Automation** - Works across different website layouts

**[📖 Read the Stagehand Deep Dive](./STAGEHAND_DEEP_DIVE.md)** for technical implementation details.

## Features

- 🔍 **Automated Research** - Input a company name, get comprehensive insights
- 📋 **Company Overview** - Mission, description, and key facts
- 📰 **Recent News** - Latest news articles and press releases
- 💻 **Tech Stack** - Programming languages, frameworks, and infrastructure
- 🏢 **Competitors** - Main competitors in the industry
- 📄 **Markdown Reports** - Structured, shareable reports
- 🌐 **Web Interface** - Beautiful UI for browser-based research

## Installation

### Prerequisites

- Node.js 18+
- An API key for one of:
  - [Google Gemini](https://ai.google.dev/) (recommended - cost-effective)
  - [Anthropic Claude](https://console.anthropic.com/)
  - [OpenAI](https://platform.openai.com/)

### Setup

1. **Clone or download this repository**

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```env
# Choose one (priority: Google > Anthropic > OpenAI)
GOOGLE_API_KEY=your_key_here
# OR
ANTHROPIC_API_KEY=your_key_here
# OR
OPENAI_API_KEY=your_key_here
```

4. **Build the project**

```bash
npm run build
```

## How It Works

This tool uses **Stagehand SDK** to automate browser interactions and extract structured data using AI:

```typescript
// 1. Initialize Stagehand with your preferred LLM
const stagehand = new Stagehand({
  env: 'LOCAL',
  modelName: 'google/gemini-2.0-flash-exp',
});

// 2. Navigate to company website
await page.goto('https://stripe.com');

// 3. AI-powered data extraction with type safety
const companyInfo = await page.extract({
  instruction: 'Extract company name, mission, and description',
  schema: CompanyInfoSchema, // Zod schema
});

// Result: Type-safe, validated company data
```

### Key Technologies

| Technology | Purpose |
|------------|---------|
| **Stagehand SDK** | AI-native browser automation |
| **Playwright** | Headless browser control |
| **Zod** | Schema validation & type safety |
| **Google Gemini** | LLM for content understanding |
| **Express** | Web server for UI |
| **TypeScript** | Type safety throughout |

### Research Pipeline

```
User Input
    ↓
┌─────────────────────────────────┐
│  Stagehand Browser Automation   │
│  ┌───────────────────────────┐  │
│  │ 1. Navigate to website    │  │
│  │ 2. Extract with AI        │  │
│  │ 3. Validate with Zod      │  │
│  │ 4. Return typed data      │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
    ↓
Parallel Extraction
├── Company Info (About page)
├── Competitors (Industry analysis)
├── Recent News (Newsroom)
└── Tech Stack (Careers page)
    ↓
Markdown Report Generator
    ↓
Downloadable Report

```

**Want to understand the implementation in depth?**
**[📖 Read the complete Stagehand Deep Dive](./STAGEHAND_DEEP_DIVE.md)** for full technical documentation.

---

## 🔧 Key Stagehand Implementation

### 1. Initialization with Auto-Detection

```typescript
// src/scraper.ts
export class CompanyResearcher {
  private stagehand: Stagehand;

  constructor(verbose: boolean = false) {
    // Auto-detect: Browserbase (cloud) or local Chrome
    const env = process.env.BROWSERBASE_API_KEY && process.env.BROWSERBASE_PROJECT_ID
      ? 'BROWSERBASE'
      : 'LOCAL';

    this.stagehand = new Stagehand({
      env,
      verbose: verbose ? 1 : 0,
      apiKey: process.env.BROWSERBASE_API_KEY,
      projectId: process.env.BROWSERBASE_PROJECT_ID,
      disablePino: true,      // Suppress logging in serverless
      disableAPI: true,       // Client-side extraction (more reliable)
      model: {
        modelName: 'gemini-2.0-flash',
        apiKey: process.env.GOOGLE_API_KEY,
      },
    });
  }
}
```

### 2. AI-Powered Extraction with Zod Schemas

```typescript
// Define schema for type-safe extraction
const CompanyInfoSchema = z.object({
  name: z.string(),
  mission: z.string().nullish(),
  description: z.string().nullish(),
  headquarters: z.string().nullish(),
  industry: z.string().nullish(),
  website: z.string().nullish(),
});

// Extract with AI understanding + LLM knowledge
const companyInfo = await stagehand.extract(
  `You are researching ${companyName}. Extract ALL available information ` +
  `using the page content as primary source, but MUST supplement with your ` +
  `general knowledge for any missing details.\n\n` +
  'REQUIRED FIELDS:\n' +
  `- name: "${companyName}" or official name from page\n` +
  `- description: Write 4-6 sentences describing what ${companyName} does...\n` +
  `- mission: Write 4-6 sentences about ${companyName}'s mission...\n` +
  `- headquarters: City and country/state\n` +
  `- industry: Specific sector\n` +
  `- website: Official URL`,
  CompanyInfoSchema
);

// Result is type-safe and validated ✅
```

### 3. Fallback Validation Pattern

```typescript
// If extraction misses a field, make targeted follow-up
if (!companyInfo.headquarters) {
  const result = await stagehand.extract(
    `Where is ${companyName}'s headquarters located? ` +
    `Respond with city and state/country. Use your knowledge of ${companyName}.`,
    z.object({ headquarters: z.string() })
  );
  companyInfo.headquarters = result.headquarters || "Location not specified";
}
```

### 4. Competitors Extraction

```typescript
const CompetitorsSchema = z.object({
  competitors: z.array(z.object({
    name: z.string(),
    description: z.string().nullish(),
    website: z.string().nullish(),
  })),
});

const competitorsData = await stagehand.extract(
  `Based on the visible content and your knowledge of ${companyName}, ` +
  `identify 5-7 main competitors. For each:\n` +
  '- Company name (exact official name)\n' +
  '- Brief description (2-3 lines)\n' +
  '- Website URL (if known)\n' +
  'Use both page content and your general knowledge.',
  CompetitorsSchema
);
```

### 5. Retry Logic with Exponential Backoff

```typescript
// Handle rate limits and transient errors
const companyInfo = await retryWithBackoff(
  async () => stagehand.extract(instruction, CompanyInfoSchema),
  {
    maxRetries: 2,
    initialDelay: 2000,
    shouldRetry: (error) => {
      // Retry on rate limits, timeouts, parse errors
      return error.message.includes('429') ||
             error.message.includes('rate limit') ||
             error.message.includes('timeout');
    },
  }
);
```

### Why These Patterns?

| Pattern | Benefit |
|---------|---------|
| **Auto-Detection** | Seamlessly uses Browserbase in production, local Chrome in dev |
| **LLM Knowledge Fallback** | Fills missing data using AI's knowledge when page lacks info |
| **Field-by-Field Validation** | Ensures critical fields are always populated |
| **Client-Side Extraction** | More reliable than API mode for complex extractions |
| **Retry with Backoff** | Handles LLM rate limits gracefully |

---

## Usage

### Basic Usage

Research a company and save the report:

```bash
npm run research "Anthropic"
```

This will generate a markdown report like `anthropic-research-2025-11-18.md`.

### Advanced Options

**Specify output path:**

```bash
npm run research "OpenAI" --output reports/openai.md
```

**Display in terminal instead of saving:**

```bash
npm run research "Google" --display
```

**Enable verbose logging:**

```bash
npm run research "Meta" --verbose
```

### Using the Built Binary

After building, you can also use:

```bash
npm start "Company Name"
```

Or install globally and use anywhere:

```bash
npm link
company-research "Company Name"
```

## Example Output

```markdown
# Anthropic - Company Research Report

**Research Date:** 2025-11-18

---

## 📋 Company Overview

**Mission:** Building safe, beneficial AI systems

Anthropic is an AI safety company that builds reliable, interpretable,
and steerable AI systems...

### Key Facts

- **Headquarters:** San Francisco, CA
- **Industry:** Artificial Intelligence
- **Website:** https://anthropic.com

---

## 📰 Recent News

### 1. Anthropic Releases Claude 3.5 Sonnet

**Date:** November 2025 | **Source:** TechCrunch

Anthropic unveiled its latest AI model with improved reasoning...

---

## 💻 Technology Stack

### Programming Languages

- Python
- TypeScript
- Rust

### Frameworks & Libraries

- PyTorch
- React
- FastAPI

...
```

## Development

### Project Structure

```
src/
├── index.ts           # CLI entry point
├── scraper.ts         # Stagehand-based research logic
├── report-generator.ts # Markdown report generation
├── types.ts           # TypeScript types and Zod schemas
└── utils.ts           # Utility functions
```

### Development Mode

Run without building:

```bash
npm run dev "Company Name"
```

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Run in development mode
- `npm run research` - Run the CLI tool
- `npm start` - Run the built version

## Configuration

### Environment Auto-Detection

The tool automatically detects the best environment:

- **LOCAL** (default): Uses local Chrome when no Browserbase credentials present
- **BROWSERBASE** (production): Automatically uses cloud browsers when credentials are configured

To enable Browserbase (optional):

```env
BROWSERBASE_API_KEY=your_browserbase_key
BROWSERBASE_PROJECT_ID=your_project_id
```

No code changes needed - auto-detection handles the switch! ✨

## Troubleshooting

### "Missing API key" error

Make sure you've created a `.env` file with either `ANTHROPIC_API_KEY` or `OPENAI_API_KEY`.

### Browser not launching

Stagehand requires Chromium. It should install automatically, but if issues occur:

```bash
npx playwright install chromium
```

### Extraction fails

Some websites have complex layouts or anti-bot measures. The tool includes fallbacks and will mark data as "Not found" rather than crashing.

## Limitations

- **Rate Limits** - Respects search engine rate limits (built-in delays)
- **Data Accuracy** - AI extraction is best-effort; verify critical information
- **Website Changes** - Site redesigns may affect extraction quality
- **Public Data Only** - Only extracts publicly available information

## Contributing

Feel free to submit issues or pull requests to improve the tool!

## License

MIT

## Acknowledgments

Built with:
- [Stagehand SDK](https://github.com/browserbase/stagehand) - Browser automation
- [Commander.js](https://github.com/tj/commander.js) - CLI framework
- [Zod](https://github.com/colinhacks/zod) - Schema validation
- [Chalk](https://github.com/chalk/chalk) & [Ora](https://github.com/sindresorhus/ora) - Terminal UI
