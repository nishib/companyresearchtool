import { NextRequest, NextResponse } from 'next/server';
import { ExaResearcher, isExaAvailable } from '../../../src/exa-researcher';
import { CompanyResearcher } from '../../../src/scraper';
import { ReportGenerator } from '../../../src/report-generator';

export const maxDuration = 300; // 5 minutes timeout

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json() as { companyName?: string; useExa?: boolean };
    const { companyName, useExa = true } = body;

    if (!companyName) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    console.log(`[Research API] Starting research for: ${companyName}`);

    let report;
    let method: string = 'none';

    // Try Exa first (fast) if available and requested
    if (useExa && isExaAvailable()) {
      console.log('[Research API] Using Exa (fast mode)');
      method = 'exa';

      try {
        const exaResearcher = new ExaResearcher();
        report = await exaResearcher.research(companyName);
      } catch (exaError) {
        console.warn('[Research API] Exa failed, falling back to Stagehand:', exaError);
        // Fall through to Stagehand
        method = 'stagehand-fallback';
      }
    }

    // Fallback to Stagehand (slower but more thorough)
    if (!report) {
      if (!process.env.GOOGLE_API_KEY && !process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) {
        return NextResponse.json(
          { error: 'No API key configured. Please add EXA_API_KEY or GOOGLE_API_KEY.' },
          { status: 500 }
        );
      }

      console.log('[Research API] Using Stagehand (browser mode)');
      method = method || 'stagehand';

      const researcher = new CompanyResearcher(false);
      try {
        await researcher.initialize();
        report = await researcher.research(companyName);
        await researcher.close();
      } catch (stagehandError) {
        try {
          await researcher.close();
        } catch {}
        throw stagehandError;
      }
    }

    const reportGenerator = new ReportGenerator();
    const markdown = await reportGenerator.generateMarkdown(report);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`[Research API] Completed in ${duration}s using ${method}`);

    return NextResponse.json({
      markdown,
      report,
      meta: {
        method,
        durationSeconds: parseFloat(duration),
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[Research API] Error:', errorMessage);

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
