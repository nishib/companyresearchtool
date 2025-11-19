#!/usr/bin/env node

// MUST be first - configures environment to prevent pino errors
import './init.js';
import 'dotenv/config';
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { CompanyResearcher } from './scraper.js';
import { ReportGenerator } from './report-generator.js';
import { log } from './utils.js';

const program = new Command();

program
  .name('company-research')
  .description('AI-powered CLI tool for automated company research')
  .version('1.0.0');

program
  .argument('[company-name]', 'Name of the company to research (optional - will use default if not provided)')
  .option('-o, --output <path>', 'Output path for the markdown report')
  .option('-v, --verbose', 'Enable verbose logging', false)
  .option('-d, --display', 'Display report in terminal instead of saving to file', false)
  .action(async (companyName: string | undefined, options) => {
    // Use default company if not provided
    if (!companyName) {
      companyName = 'Stripe';
      console.log(chalk.yellow(`\nℹ No company specified, using default: ${companyName}\n`));
    }
    console.log(chalk.bold.cyan('\n🔍 Company Research CLI\n'));
    console.log(chalk.gray('Powered by Stagehand SDK\n'));

    // Check for API keys
    if (!process.env.GOOGLE_API_KEY && !process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) {
      log(
        'Missing API key! Please set GOOGLE_API_KEY, ANTHROPIC_API_KEY, or OPENAI_API_KEY in your environment.',
        'error'
      );
      log('Copy .env.example to .env and add your API key.', 'info');
      process.exit(1);
    }

    // Show which LLM provider is being used
    const llmProvider = process.env.GOOGLE_API_KEY
      ? 'Google Gemini'
      : process.env.ANTHROPIC_API_KEY
      ? 'Anthropic Claude'
      : 'OpenAI GPT';

    if (options.verbose) {
      log(`Using LLM: ${llmProvider}`, 'info');
    }

    const spinner = ora({
      text: 'Initializing browser automation...',
      color: 'cyan',
    }).start();

    let researcher: CompanyResearcher | null = null;

    try {
      // Initialize researcher
      researcher = new CompanyResearcher(options.verbose);
      await researcher.initialize();
      spinner.succeed('Browser initialized');

      // Conduct research
      spinner.start(`Researching ${chalk.bold(companyName)}...`);
      const report = await researcher.research(companyName);
      spinner.succeed(`Research completed for ${chalk.bold(companyName)}`);

      // Generate and save/display report
      const generator = new ReportGenerator();

      if (options.display) {
        await generator.displayReport(report);
      } else {
        spinner.start('Generating markdown report...');
        const filename = await generator.saveReport(report, options.output);
        spinner.succeed(`Report generated: ${chalk.green(filename)}`);

        console.log(chalk.gray('\nReport includes:'));
        console.log(chalk.gray(`  ✓ Company overview and mission`));
        console.log(chalk.gray(`  ✓ ${report.news.length} recent news items`));
        console.log(
          chalk.gray(
            `  ✓ Tech stack (${report.techStack.languages.length + report.techStack.frameworks.length} technologies)`
          )
        );
        console.log(chalk.gray(`  ✓ ${report.leadership.length} leadership profiles\n`));
      }

      console.log(chalk.green('✨ Research complete!\n'));
    } catch (error) {
      spinner.fail('Research failed');
      if (error instanceof Error) {
        log(error.message, 'error');
        if (options.verbose && error.stack) {
          console.error(chalk.gray(error.stack));
        }
      }
      process.exit(1);
    } finally {
      if (researcher) {
        await researcher.close();
      }
    }
  });

program.parse();
