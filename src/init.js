// This file MUST be imported first in server.ts and scraper.ts
// It configures the environment to prevent pino-pretty errors in serverless environments

import { createRequire } from 'module';
import { Transform } from 'stream';

// Detect if we're in a serverless/production environment
const isServerless = Boolean(
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
delete process.env.PINO_PRETTY;
delete process.env.PINO_TRANSPORT_TARGET;

// Mock pino-pretty module to prevent it from loading
const require = createRequire(import.meta.url);
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function (id) {
  if (id === 'pino-pretty') {
    return function pinoPrettyMock() {
      return new Transform({
        transform(chunk, encoding, callback) {
          callback(null, chunk);
        }
      });
    };
  }

  return originalRequire.apply(this, arguments);
};

// Set up global error/warning handler to suppress pino-pretty errors
const originalEmit = process.emit;
process.emit = function (event, ...args) {
  if (event === 'warning' && args[0]) {
    const warning = args[0];
    const message = warning?.message || String(warning);

    if (message.includes('pino-pretty') || (message.includes('pino') && message.includes('transport'))) {
      return false;
    }
  }

  if (event === 'uncaughtException' || event === 'unhandledRejection') {
    const error = args[0];
    if (error && typeof error === 'object') {
      const message = error.message || String(error);

      if (
        message.includes('unable to determine transport target') ||
        message.includes('pino-pretty') ||
        (message.includes('pino') && message.includes('target'))
      ) {
        console.warn('[Init] Suppressed pino-pretty error (expected in serverless)');
        return true;
      }
    }
  }

  return originalEmit.apply(this, arguments);
};

// Prevent unhandled rejection crashes from pino-pretty
process.on('unhandledRejection', (reason) => {
  const message = reason?.message || String(reason);
  if (message.includes('pino-pretty') || message.includes('unable to determine transport target')) {
    return;
  }
  throw reason;
});

export {};
