# Quick Start Guide

## ✅ Your Setup is Ready!

Your Gemini API key is configured and the project is built. Here are all the ways you can use it:

## 🚀 Running the Tools

### Option 1: Company Research CLI (Default Mode)

Run without arguments (uses "Stripe" as default):
```bash
tsx src/index.ts
# or
npm run research
```

Run with a specific company:
```bash
tsx src/index.ts "Anthropic"
# or
npm run research "OpenAI"
```

With options:
```bash
# Verbose mode to see Gemini in action
tsx src/index.ts "Google" --verbose

# Display in terminal instead of saving
tsx src/index.ts "Meta" --display

# Custom output path
tsx src/index.ts "Stripe" --output reports/stripe.md

# All options combined
tsx src/index.ts "Anthropic" --verbose --display
```

### Option 2: Stagehand Example (Web Scraping Demo)

Run the example that demonstrates Stagehand's capabilities:
```bash
npm run example
```

This will:
- Navigate to stagehand.dev
- Extract the value proposition
- Click buttons using AI
- Observe page elements
- Use an AI agent for autonomous browsing

## 🔧 Environment Modes

The tool automatically detects which mode to use:

### LOCAL Mode (Default)
- Uses your local Chrome browser
- No additional setup needed
- Your current configuration ✓

### BROWSERBASE Mode (Optional)
To use cloud browsers, add to your `.env`:
```env
BROWSERBASE_API_KEY=your_key
BROWSERBASE_PROJECT_ID=your_project_id
```

The tool will automatically switch to BROWSERBASE mode and show you a live session URL!

## 📊 What You'll Get

When researching a company, you'll get a markdown report with:

- 📋 **Company Overview** - Mission, description, key facts
- 📰 **Recent News** - Top 5 latest articles
- 💻 **Tech Stack** - Languages, frameworks, tools, infrastructure
- 🏢 **Competitors** - Main competitors in the industry

## 🎯 Examples

### Research with default company (Stripe):
```bash
tsx src/index.ts
```

### Research Anthropic in verbose mode:
```bash
tsx src/index.ts "Anthropic" --verbose
```

### See the report in terminal:
```bash
tsx src/index.ts "OpenAI" --display
```

### Run the web scraping example:
```bash
npm run example
```

## 🔐 Your API Key is Secure

✓ Stored in `.env` (gitignored)
✓ Never exposed in output
✓ Only loaded at runtime

## 💡 Tips

1. **First Run**: Start with the example to see Stagehand in action
   ```bash
   npm run example
   ```

2. **Test Company Research**: Try with verbose mode to see what's happening
   ```bash
   tsx src/index.ts --verbose
   ```

3. **Compare Results**: Try different companies
   ```bash
   tsx src/index.ts "Stripe" --display
   tsx src/index.ts "Anthropic" --display
   ```

## 🐛 Troubleshooting

### Error: "Missing API key"
Make sure `.env` file exists with your Gemini key.

### Browser doesn't launch
Install Playwright's browser:
```bash
npx playwright install chromium
```

### Want to see live browsing?
Use `--verbose` flag to see what Stagehand is doing.

## 📚 Next Steps

- Check out `src/example.ts` to see how Stagehand works
- Customize `src/scraper.ts` to research different data
- Read the full [README.md](./README.md) for more details

Enjoy your AI-powered research tool! 🎉
