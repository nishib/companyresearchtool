# How This Project Uses Stagehand & Playwright

## The Relationship

```
┌─────────────────────────────────────────┐
│         Your Project Code               │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │        Stagehand SDK              │ │
│  │  (AI-Powered Automation Layer)    │ │
│  │                                   │ │
│  │  ┌─────────────────────────────┐ │ │
│  │  │      Playwright             │ │ │
│  │  │  (Browser Control Engine)   │ │ │
│  │  │                             │ │ │
│  │  │  ┌───────────────────────┐  │ │ │
│  │  │  │  Chromium Browser     │  │ │ │
│  │  │  └───────────────────────┘  │ │ │
│  │  └─────────────────────────────┘ │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Playwright** = Low-level browser automation (clicks, navigation, DOM access)
**Stagehand** = AI layer on top of Playwright (understands content, extracts data)

---

## Step-by-Step: How It Works

### 1. Initialization

```typescript
// src/scraper.ts:34-45
this.stagehand = new Stagehand({
  env: 'LOCAL',                    // or 'BROWSERBASE' (cloud)
  verbose: 1,                      // Logging level
  apiKey: process.env.BROWSERBASE_API_KEY,
  projectId: process.env.BROWSERBASE_PROJECT_ID,
  disablePino: true,               // Suppress logging errors
  disableAPI: true,                // Use client-side extraction
  model: {
    modelName: 'gemini-2.0-flash', // LLM for understanding
    apiKey: process.env.GOOGLE_API_KEY,
  },
});
```

**What happens:**
1. Stagehand initializes Playwright under the hood
2. Playwright launches a headless Chromium browser
3. Stagehand connects the browser to the chosen LLM (Gemini/Claude/GPT)

### 2. Browser Initialization

```typescript
// src/scraper.ts:110-112
await this.stagehand.init();
```

**What happens:**
1. Stagehand calls Playwright's `chromium.launch()`
2. Creates a browser context (like an incognito window)
3. Opens a new page/tab
4. Stores everything in `this.stagehand.context`

**Behind the scenes:**
```typescript
// What Stagehand does internally (simplified):
this.browser = await playwright.chromium.launch({ headless: true });
this.context = await this.browser.newContext();
this.page = await this.context.newPage();
```

### 3. Accessing the Playwright Page

```typescript
// src/scraper.ts:131-136
private getPage(): any {
  const pages = this.stagehand.context.pages();  // Playwright BrowserContext API
  if (!pages || pages.length === 0) {
    throw new Error('No page available');
  }
  return pages[0];  // Returns Playwright Page object
}
```

**Key Point:** `this.stagehand.context` is a **Playwright BrowserContext**
- You can access all Playwright APIs through it
- `pages()` returns array of Playwright Page objects

### 4. Navigation (Pure Playwright)

```typescript
// src/scraper.ts:174-177
const page = this.getPage();  // Get Playwright Page

await page.goto('https://stripe.com', {
  waitUntil: 'networkidle',  // Playwright option
  timeoutMs: 30000,          // Playwright option
});
```

**This is 100% Playwright:**
- `page.goto()` is Playwright's navigation method
- `waitUntil: 'networkidle'` waits for network requests to finish
- No AI involved yet - just browser automation

### 5. AI-Powered Extraction (Stagehand Magic)

```typescript
// src/scraper.ts:196-207
const companyInfo = await this.stagehand.extract(
  `You are researching ${companyName}. Extract ALL available information...`,  // AI Instruction
  CompanyInfoSchema  // Zod schema for validation
);
```

**What Stagehand does internally:**

```
Step 1: Take Screenshot
├─ Uses Playwright: page.screenshot()
└─ Captures current page state

Step 2: Get DOM Content
├─ Uses Playwright: page.content()
└─ Gets full HTML

Step 3: Send to LLM
├─ Sends: Screenshot + DOM + Your instruction
├─ LLM Model: Gemini 2.0 Flash (or Claude/GPT)
└─ Prompt: "Extract data matching this schema: {...}"

Step 4: Parse Response
├─ LLM returns JSON
├─ Validates against Zod schema
└─ Returns type-safe object
```

**Example internal process:**

```typescript
// What Stagehand does (simplified):
async extract(instruction, schema) {
  // 1. Get page content via Playwright
  const html = await page.content();
  const screenshot = await page.screenshot();

  // 2. Convert schema to JSON Schema
  const jsonSchema = zodToJsonSchema(schema);

  // 3. Call LLM
  const response = await llm.chat([
    { role: "system", content: "Extract data from this page" },
    { role: "user", content: instruction },
    { type: "image", data: screenshot },
    { type: "text", data: html },
    { type: "schema", data: jsonSchema }
  ]);

  // 4. Validate and return
  const data = JSON.parse(response);
  return schema.parse(data);  // Zod validation
}
```

### 6. Multiple Extractions, Same Page

```typescript
// src/scraper.ts:139-148
async research(companyName: string) {
  const companyInfo = await this.extractCompanyInfo(companyName);    // Navigate + Extract
  const competitors = await this.extractCompetitors(companyName);    // Navigate + Extract
  const news = await this.extractNews(companyName);                  // Navigate + Extract
  const techStack = await this.extractTechStack(companyName);        // Navigate + Extract

  return { companyInfo, news, techStack, competitors };
}
```

Each extraction:
1. Uses Playwright `page.goto()` to navigate
2. Waits for page load (Playwright)
3. Calls `stagehand.extract()` with AI
4. Returns structured data

### 7. Cleanup

```typescript
// src/scraper.ts:124-126
async close() {
  await this.stagehand.close();
}
```

**What happens:**
```typescript
// Internally Stagehand calls:
await this.page.close();      // Close Playwright page
await this.context.close();   // Close Playwright context
await this.browser.close();   // Close Chromium browser
```

---

## Key Concepts

### Playwright Context

Stagehand exposes Playwright's BrowserContext:

```typescript
this.stagehand.context  // Playwright BrowserContext

// You can use ALL Playwright APIs:
this.stagehand.context.pages()          // Get all pages
this.stagehand.context.newPage()        // Open new tab
this.stagehand.context.cookies()        // Get cookies
this.stagehand.context.setExtraHTTPHeaders()  // Set headers
```

### Playwright Page

The page object is pure Playwright:

```typescript
const page = this.stagehand.context.pages()[0];

// All Playwright Page methods work:
await page.goto(url)                    // Navigate
await page.click(selector)              // Click element
await page.fill(selector, text)         // Fill input
await page.screenshot()                 // Take screenshot
await page.evaluate(() => {...})        // Run JS in browser
await page.waitForSelector(selector)    // Wait for element
```

### When Stagehand Adds AI

Stagehand only adds AI for these methods:

```typescript
// AI-Powered Methods:
await stagehand.extract(instruction, schema)   // Extract structured data
await stagehand.act(instruction)               // Perform action ("click login")
await stagehand.observe(instruction)           // Get information ("what's on page?")
```

Everything else is pure Playwright!

---

## Comparison: Traditional vs This Project

### Traditional Playwright

```typescript
// Brittle - breaks if HTML changes
const companyName = await page.locator('.company-title').textContent();
const mission = await page.locator('#mission-statement').textContent();
const headquarters = await page.locator('div[data-testid="hq"]').textContent();

// Problem: What if selectors change? What if structure is different?
```

### This Project (Stagehand + Playwright)

```typescript
// Resilient - AI understands content semantically
const companyInfo = await stagehand.extract(
  "Extract the company name, mission statement, and headquarters location",
  CompanyInfoSchema
);

// Works on ANY website layout!
```

---

## Real Example: Company Info Extraction

```typescript
// 1. Initialize (Playwright launches browser)
await this.stagehand.init();

// 2. Get Playwright page
const page = this.stagehand.context.pages()[0];

// 3. Navigate (Pure Playwright)
await page.goto('https://anthropic.com', {
  waitUntil: 'networkidle'
});

// 4. Wait for dynamic content (Playwright)
await page.waitForTimeout(5000);

// 5. Extract with AI (Stagehand)
const companyInfo = await this.stagehand.extract(
  `Extract company name, mission, description, headquarters, industry`,
  CompanyInfoSchema
);

// Result:
{
  name: "Anthropic",
  mission: "Building safe, beneficial AI systems",
  description: "Anthropic is an AI safety company...",
  headquarters: "San Francisco, California",
  industry: "Artificial Intelligence",
  website: "https://www.anthropic.com"
}
```

**What happened:**
1. Playwright navigated to the page
2. Playwright waited for content to load
3. Stagehand took screenshot + got HTML
4. Gemini LLM analyzed the page
5. AI extracted data matching the schema
6. Zod validated the structure
7. Type-safe data returned

---

## Environment Modes

### LOCAL Mode

```typescript
env: 'LOCAL'
```

**What happens:**
- Playwright launches local Chrome on your machine
- Browser runs on your CPU/RAM
- Free, but requires Chrome installed
- Can see browser window if `headless: false`

### BROWSERBASE Mode

```typescript
env: 'BROWSERBASE'
apiKey: 'bb_live_...'
projectId: '...'
```

**What happens:**
- Playwright connects to remote Chrome in Browserbase cloud
- Browser runs on Browserbase servers
- Paid service, but more reliable for production
- Can watch live at `browserbase.com/sessions/{sessionId}`

---

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│  Your Code: CompanyResearcher                                │
└──────────────┬───────────────────────────────────────────────┘
               │
               │ new Stagehand()
               ▼
┌──────────────────────────────────────────────────────────────┐
│  Stagehand SDK                                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Browser Manager (uses Playwright)                     │  │
│  │  - Launches browser                                    │  │
│  │  - Creates context                                     │  │
│  │  - Manages pages                                       │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  AI Extraction Engine                                  │  │
│  │  - Takes screenshots (via Playwright)                 │  │
│  │  - Gets DOM (via Playwright)                          │  │
│  │  - Sends to LLM                                       │  │
│  │  - Validates with Zod                                 │  │
│  └────────────────────────────────────────────────────────┘  │
└────────────────┬──────────────────────────────────┬──────────┘
                 │                                   │
                 │ playwright.chromium.launch()      │ API call
                 ▼                                   ▼
┌─────────────────────────────┐    ┌──────────────────────────┐
│  Playwright                 │    │  LLM (Gemini/Claude/GPT) │
│  - Browser automation       │    │  - Content understanding │
│  - Page navigation         │    │  - Data extraction       │
│  - DOM access              │    │  - Schema validation     │
└──────────────┬──────────────┘    └──────────────────────────┘
               │
               │ launches
               ▼
┌─────────────────────────────┐
│  Chromium Browser           │
│  - Renders web pages        │
│  - Executes JavaScript      │
│  - Loads dynamic content    │
└─────────────────────────────┘
```

---

## Summary

**Playwright provides:**
- Browser control (launch, navigate, click, type)
- Page access (DOM, content, screenshots)
- Network handling (wait for load, intercept requests)

**Stagehand adds:**
- AI understanding of page content
- Structured data extraction with schemas
- Automatic retry logic
- LLM integration (Gemini/Claude/GPT)

**Your code:**
- Uses Playwright for navigation
- Uses Stagehand for extraction
- Gets type-safe, validated data
- No brittle CSS selectors needed!

**The Magic:** Playwright handles "how to control the browser", Stagehand handles "what the page means" using AI. Together, they create resilient automation that works across any website layout! 🎭🤖
