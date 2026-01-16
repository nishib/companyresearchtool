import { NextRequest, NextResponse } from 'next/server';
import { ExaRecruiterFinder, isExaAvailable } from '../../../src/exa-recruiters';
import { CompanyResearcher } from '../../../src/scraper';

export const maxDuration = 300; // 5 minutes timeout

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json() as { companyName?: string; useExa?: boolean };
    const { companyName, useExa = true } = body;
    const normalizedCompany = companyName?.trim();

    if (!normalizedCompany) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    console.log(`[Recruiters API] Starting recruiter search for: ${normalizedCompany}`);

    let recruiters;
    let method: string = 'none';

    // Try Exa first (fast) if available
    if (useExa && isExaAvailable()) {
      console.log('[Recruiters API] Using Exa (fast mode)');
      method = 'exa';

      try {
        const exaFinder = new ExaRecruiterFinder();
        recruiters = await exaFinder.findRecruiters(normalizedCompany);
      } catch (exaError) {
        console.warn('[Recruiters API] Exa failed, falling back to Stagehand:', exaError);
        method = 'stagehand-fallback';
      }
    }

    // Fallback to Stagehand (browser-based)
    if (!recruiters || recruiters.length === 0) {
      const hasBrowserbase = Boolean(process.env.BROWSERBASE_API_KEY && process.env.BROWSERBASE_PROJECT_ID);
      if (process.env.VERCEL && !hasBrowserbase) {
        return NextResponse.json(
          { error: 'Browserbase credentials are required on Vercel for Stagehand fallback. Set BROWSERBASE_API_KEY and BROWSERBASE_PROJECT_ID, or provide EXA_API_KEY.' },
          { status: 500 }
        );
      }

      if (!process.env.GOOGLE_API_KEY && !process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) {
        // If Exa found nothing and no LLM key, return empty
        if (recruiters) {
          const duration = ((Date.now() - startTime) / 1000).toFixed(2);
          return NextResponse.json({
            recruiters: [],
            companyName: normalizedCompany,
            searchDate: new Date().toISOString(),
            meta: { method: method!, durationSeconds: parseFloat(duration) },
          });
        }
        return NextResponse.json(
          { error: 'No API key configured. Please add EXA_API_KEY or GOOGLE_API_KEY.' },
          { status: 500 }
        );
      }

      console.log('[Recruiters API] Using Stagehand (browser mode)');
      method = method || 'stagehand';

      const researcher = new CompanyResearcher(false);
      try {
        await researcher.initialize();
        recruiters = await researcher.extractRecruiters(normalizedCompany);
        await researcher.close();
      } catch (stagehandError) {
        try {
          await researcher.close();
        } catch {}
        throw stagehandError;
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    const filteredRecruiters = (recruiters || []).filter(isLikelyRecruiterProfile);
    console.log(`[Recruiters API] Found ${filteredRecruiters.length} recruiters in ${duration}s using ${method}`);

    return NextResponse.json({
      recruiters: filteredRecruiters,
      companyName: normalizedCompany,
      searchDate: new Date().toISOString(),
      meta: {
        method,
        durationSeconds: parseFloat(duration),
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[Recruiters API] Error:', errorMessage);

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

const recruiterTitleKeywords = [
  'recruiter',
  'recruiting',
  'talent acquisition',
  'talent partner',
  'people operations',
  'people ops',
  'sourcer',
  'head of talent',
  'hr',
];

function isLikelyRecruiterProfile(recruiter: { name?: string; title?: string; linkedInUrl?: string; email?: string }) {
  if (!recruiter?.name || !recruiter?.title) {
    return false;
  }

  const name = recruiter.name.trim();
  if (!looksLikePersonName(name)) {
    return false;
  }

  const titleLower = recruiter.title.toLowerCase();
  if (!recruiterTitleKeywords.some(keyword => titleLower.includes(keyword))) {
    return false;
  }

  const hasLinkedInProfile = recruiter.linkedInUrl?.includes('linkedin.com/in/') === true;
  const hasWorkEmail = Boolean(recruiter.email);

  return hasLinkedInProfile || hasWorkEmail;
}

function looksLikePersonName(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length < 2 || parts.length > 4) {
    return false;
  }

  const invalidPatterns = [
    /recruit/i,
    /guide/i,
    /jobs?/i,
    /careers?/i,
    /team/i,
    /company/i,
    /hiring/i,
    /page/i,
  ];

  if (invalidPatterns.some(pattern => pattern.test(name))) {
    return false;
  }

  return parts.every(part => /^[A-Z][a-zA-Z'-]+$/.test(part));
}
