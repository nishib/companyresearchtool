import chalk from 'chalk';

export function log(message: string, type: 'info' | 'success' | 'error' | 'warn' = 'info') {
  const prefix = {
    info: chalk.blue('ℹ'),
    success: chalk.green('✓'),
    error: chalk.red('✗'),
    warn: chalk.yellow('⚠'),
  };

  console.log(`${prefix[type]} ${message}`);
}

export function formatDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function buildSearchQuery(companyName: string, ...keywords: string[]): string {
  return `${companyName} ${keywords.join(' ')}`;
}
