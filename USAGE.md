# Quick Start Guide

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env

# 3. Edit .env and add your API key
# Add either ANTHROPIC_API_KEY or OPENAI_API_KEY

# 4. Build the project
npm run build
```

## Running Your First Research

```bash
npm run research "Anthropic"
```

This will:
1. Launch a headless browser
2. Research Anthropic across multiple sources
3. Extract structured data using AI
4. Generate a markdown report: `anthropic-research-2025-11-18.md`

## CLI Options

```
Usage: company-research [options] <company-name>

Arguments:
  company-name              Name of the company to research

Options:
  -V, --version             Output the version number
  -o, --output <path>       Output path for the markdown report
  -v, --verbose             Enable verbose logging
  -d, --display             Display report in terminal instead of saving
  -h, --help                Display help for command
```

## Examples

### Research and save to custom location

```bash
npm run research "OpenAI" --output reports/openai.md
```

### View results in terminal without saving

```bash
npm run research "Google" --display
```

### Debug mode with verbose logging

```bash
npm run research "Meta" --verbose
```

## What Gets Researched

The tool automatically gathers:

1. **Company Information**
   - Official name
   - Mission statement
   - Company description
   - Headquarters location
   - Industry/sector

2. **Recent News**
   - Latest 5 news articles
   - Publication dates
   - News sources
   - Article summaries

3. **Technology Stack**
   - Programming languages
   - Frameworks and libraries
   - Development tools
   - Infrastructure technologies

4. **Leadership Team**
   - Names and titles
   - Brief biographies
   - LinkedIn profiles (when available)

## Tips for Best Results

1. **Use Official Company Names** - "Meta" works better than "Facebook"
2. **Check API Rate Limits** - The tool includes delays to respect rate limits
3. **Verify Critical Info** - AI extraction is best-effort; double-check important details
4. **Run During Off-Peak Hours** - Better success rates outside peak times

## Troubleshooting

### Issue: "Missing API key"

**Solution:** Create a `.env` file with your API key:

```env
ANTHROPIC_API_KEY=sk-ant-...
```

### Issue: Browser not launching

**Solution:** Install Playwright's Chromium:

```bash
npx playwright install chromium
```

### Issue: "Not found" in results

**Cause:** The AI couldn't extract that specific information

**Solution:** This is normal for some companies with limited public info. The tool provides best-effort results.

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Explore the source code in `src/` to customize extraction logic
- Configure Browserbase for production use (see README)
