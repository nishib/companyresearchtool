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

export interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  shouldRetry?: (error: any) => boolean;
}

/**
 * Retry a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffMultiplier = 2,
    shouldRetry = () => true,
  } = options;

  let lastError: any;
  let currentDelay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if we should retry this error
      if (!shouldRetry(error)) {
        throw error;
      }

      // If this was the last attempt, throw the error
      if (attempt === maxRetries) {
        throw error;
      }

      // Log retry attempt
      const errorMessage = error instanceof Error ? error.message : String(error);
      log(
        `Attempt ${attempt + 1}/${maxRetries + 1} failed: ${errorMessage}. Retrying in ${currentDelay}ms...`,
        'warn'
      );

      // Wait before retrying
      await delay(currentDelay);

      // Increase delay for next attempt (exponential backoff)
      currentDelay = Math.min(currentDelay * backoffMultiplier, maxDelay);
    }
  }

  throw lastError;
}

/**
 * Check if an error is retryable (network errors, timeouts, parse errors)
 */
export function isRetryableError(error: any): boolean {
  if (!error) return false;

  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorName = error instanceof Error ? error.name : error?.constructor?.name || '';

  // Retry on parse errors, timeouts, and network errors
  return (
    errorName.includes('ParseError') ||
    errorName.includes('TimeoutError') ||
    errorName.includes('NetworkError') ||
    errorMessage.includes('parse') ||
    errorMessage.includes('timeout') ||
    errorMessage.includes('Timeout') ||
    errorMessage.includes('network') ||
    errorMessage.includes('ECONNREFUSED') ||
    errorMessage.includes('ETIMEDOUT') ||
    errorMessage.includes('Failed to parse')
  );
}
