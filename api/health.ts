import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const hasApiKey = !!(
    process.env.GOOGLE_API_KEY ||
    process.env.ANTHROPIC_API_KEY ||
    process.env.OPENAI_API_KEY
  );

  res.status(200).json({
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
}
