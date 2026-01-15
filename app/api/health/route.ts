import { NextResponse } from 'next/server';

export async function GET() {
  const hasLLMKey = !!(
    process.env.GOOGLE_API_KEY ||
    process.env.ANTHROPIC_API_KEY ||
    process.env.OPENAI_API_KEY
  );

  const hasExaKey = !!process.env.EXA_API_KEY;
  const hasBrowserbase = !!(process.env.BROWSERBASE_API_KEY && process.env.BROWSERBASE_PROJECT_ID);

  // Determine primary provider
  let provider = 'None';
  let mode = 'unavailable';

  if (hasExaKey) {
    provider = 'Exa (Fast Search)';
    mode = 'fast';
  } else if (hasLLMKey) {
    provider = process.env.GOOGLE_API_KEY
      ? 'Google Gemini'
      : process.env.ANTHROPIC_API_KEY
      ? 'Anthropic Claude'
      : 'OpenAI GPT';
    mode = hasBrowserbase ? 'browser-cloud' : 'browser-local';
  }

  return NextResponse.json({
    status: 'ok',
    hasApiKey: hasExaKey || hasLLMKey,
    provider,
    mode,
    capabilities: {
      exa: hasExaKey,
      llm: hasLLMKey,
      browserbase: hasBrowserbase,
    },
  });
}
