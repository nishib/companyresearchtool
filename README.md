# One-Stop Recruiting Guide

An AI-powered recruiting companion with two features: company research reports and a recruiter finder for any company. Built with [Stagehand SDK](https://github.com/browserbase/stagehand).

Whether you're actively job hunting or exploring opportunities, this tool helps you prepare holistically: research companies before interviews to ask informed questions and stand out, and find recruiters to reach out to directly. Be prepared, be proactive.

## Features

- Company research reports (key facts, news, tech stack, competitors)
- Recruiter finder with real-person filtering
- Web UI (Next.js) + CLI
- Markdown output

## Quick start

```bash
npm install
cp .env.example .env
```

Set one LLM key in `.env`:

```env
GOOGLE_API_KEY=your_key_here
# or
ANTHROPIC_API_KEY=your_key_here
# or
OPENAI_API_KEY=your_key_here
```

Optional:

```env
EXA_API_KEY=your_exa_key
BROWSERBASE_API_KEY=your_browserbase_key
BROWSERBASE_PROJECT_ID=your_project_id
```

## Run

- Web UI: `npm run dev` → `http://localhost:3000`
- CLI: `npm run cli "Company Name"`
- Legacy Express server (serves `public/`): `npm run server`

## Scripts

- `npm run dev` - Start the Next.js dev server
- `npm run build` - Build the Next.js app
- `npm start` - Start the Next.js production server
- `npm run cli` - Run the CLI tool
- `npm run research` - CLI alias
- `npm run example` - Stagehand demo
- `npm run server` - Start the Express server
- `npm run web` - Alias for `npm run server`

## Tech stack

Runtime:
- Next.js, React
- Stagehand SDK, Playwright, Zod
- Exa (optional, recruiter search)
- Express, cors (legacy server)
- @vercel/node (serverless handlers)
- Commander.js, Chalk, Ora (CLI)
- dotenv

Dev:
- TypeScript, tsx

## Project structure

- `app/` Next.js UI + API routes
- `src/` CLI + research logic
- `public/` legacy static UI
- `api/` Vercel serverless handlers

## Notes

- Requires an LLM API key to run research.
- Extraction is best-effort; verify critical info.

**Deep dive:** [STAGEHAND_DEEP_DIVE.md](./STAGEHAND_DEEP_DIVE.md)
