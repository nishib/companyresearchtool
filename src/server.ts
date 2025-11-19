// MUST be first - configures environment to prevent pino errors
import './init.js';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { CompanyResearcher } from './scraper.js';
import { ReportGenerator } from './report-generator.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Store active research sessions
const sessions = new Map<string, { status: string; progress: string; error?: string }>();

// Health check
app.get('/api/health', (req, res) => {
  const hasApiKey = !!(process.env.GOOGLE_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY);

  res.json({
    status: 'ok',
    hasApiKey,
    provider: process.env.GOOGLE_API_KEY
      ? 'Google Gemini'
      : process.env.ANTHROPIC_API_KEY
      ? 'Anthropic Claude'
      : process.env.OPENAI_API_KEY
      ? 'OpenAI GPT'
      : 'None',
  });
});

// Start research
app.post('/api/research', async (req, res) => {
  const { companyName } = req.body;

  if (!companyName) {
    return res.status(400).json({ error: 'Company name is required' });
  }

  // Check for API keys
  if (!process.env.GOOGLE_API_KEY && !process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: 'No API key configured. Please add GOOGLE_API_KEY, ANTHROPIC_API_KEY, or OPENAI_API_KEY to your .env file.'
    });
  }

  const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  sessions.set(sessionId, { status: 'starting', progress: 'Initializing browser...' });

  // Start research in background
  (async () => {
    let researcher: CompanyResearcher | null = null;

    try {
      researcher = new CompanyResearcher(false);

      sessions.set(sessionId, { status: 'running', progress: 'Initializing browser...' });
      await researcher.initialize();

      sessions.set(sessionId, { status: 'running', progress: `Researching ${companyName}...` });
      const report = await researcher.research(companyName);

      sessions.set(sessionId, { status: 'running', progress: 'Generating report...' });
      const generator = new ReportGenerator();
      const markdown = await generator.generateMarkdown(report);

      sessions.set(sessionId, {
        status: 'completed',
        progress: 'Research complete!',
        //@ts-ignore
        result: {
          markdown,
          report,
        }
      });
    } catch (error) {
      console.error('Research error:', error);
      sessions.set(sessionId, {
        status: 'error',
        progress: 'Research failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      if (researcher) {
        await researcher.close();
      }
    }
  })();

  res.json({ sessionId });
});

// Get research status
app.get('/api/research/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const session = sessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  res.json(session);
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Only start server if not in Vercel (Vercel handles this automatically)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Company Research Web App`);
    console.log(`📡 Server running at http://localhost:${PORT}`);
    console.log(`\nOpen your browser and visit: http://localhost:${PORT}\n`);
  });
}

// Export for Vercel serverless
export default app;
