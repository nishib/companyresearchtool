// This file MUST be imported first in server.ts and scraper.ts
// It configures the environment to prevent pino-pretty errors in serverless environments

import { createRequire } from 'module';
import { Transform } from 'stream';

// Detect if we're in a serverless/production environment
const isServerless = !!(
  process.env.VERCEL ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.NETLIFY ||
  process.env.NODE_ENV === 'production'
);

if (isServerless) {
  console.log('[Init] Detected serverless environment, disabling pino-pretty');
}

// Configure environment variables to disable pino-pretty before any modules load
process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'info';
delete process.env.PINO_PRETTY; // Remove any pino-pretty config
delete process.env.PINO_TRANSPORT_TARGET; // Disable transports

// Mock pino-pretty module to prevent it from loading
// This is necessary because Stagehand SDK has pino-pretty as a dependency
const require = createRequire(import.meta.url);
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function (id: string) {
  // Intercept pino-pretty and return a no-op function
  if (id === 'pino-pretty') {
    return function pinoPrettyMock() {
      // Return a basic transform stream that does nothing
      return new Transform({
        transform(chunk: any, encoding: string, callback: Function) {
          callback(null, chunk);
        }
      });
    };
  }

  // For all other requires, use the original
  return originalRequire.apply(this, arguments as any);
};

// Set up global error/warning handler to suppress pino-pretty errors
const originalEmit = process.emit;
(process as any).emit = function (event: any, ...args: any[]) {
  // Suppress pino-pretty related warnings and errors
  if (event === 'warning' && args[0]) {
    const warning = args[0];
    const message = warning?.message || String(warning);

    if (message.includes('pino-pretty') || message.includes('pino') && message.includes('transport')) {
      // Silently ignore pino-pretty warnings
      return false;
    }
  }

  if ((event === 'uncaughtException' || event === 'unhandledRejection')) {
    const error = args[0];
    if (error && typeof error === 'object') {
      const message = error.message || String(error);

      // Suppress pino-pretty transport errors
      if (message.includes('unable to determine transport target') ||
          message.includes('pino-pretty') ||
          (message.includes('pino') && message.includes('target'))) {
        console.warn('[Init] Suppressed pino-pretty error (expected in serverless)');
        return true; // Mark as handled
      }
    }
  }

  // For all other events, use original emit
  return originalEmit.apply(this, arguments as any);
};

// Prevent unhandled rejection crashes from pino-pretty
process.on('unhandledRejection', (reason: any) => {
  const message = reason?.message || String(reason);
  if (message.includes('pino-pretty') || message.includes('unable to determine transport target')) {
    // Ignore pino-pretty errors
    return;
  }
  // Re-throw other unhandled rejections
  throw reason;
});

export {};
