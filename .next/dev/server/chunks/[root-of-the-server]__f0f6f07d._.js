module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/punycode [external] (punycode, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("punycode", () => require("punycode"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/node:process [external] (node:process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:process", () => require("node:process"));

module.exports = mod;
}),
"[externals]/node:os [external] (node:os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:os", () => require("node:os"));

module.exports = mod;
}),
"[externals]/node:tty [external] (node:tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:tty", () => require("node:tty"));

module.exports = mod;
}),
"[project]/src/utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildSearchQuery",
    ()=>buildSearchQuery,
    "delay",
    ()=>delay,
    "formatDate",
    ()=>formatDate,
    "isRetryableError",
    ()=>isRetryableError,
    "log",
    ()=>log,
    "retryWithBackoff",
    ()=>retryWithBackoff,
    "sanitizeFilename",
    ()=>sanitizeFilename
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chalk$2f$source$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/chalk/source/index.js [app-route] (ecmascript) <locals>");
;
function log(message, type = 'info') {
    const prefix = {
        info: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chalk$2f$source$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].blue('ℹ'),
        success: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chalk$2f$source$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].green('✓'),
        error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chalk$2f$source$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].red('✗'),
        warn: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chalk$2f$source$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].yellow('⚠')
    };
    console.log(`${prefix[type]} ${message}`);
}
function formatDate() {
    return new Date().toISOString().split('T')[0];
}
function sanitizeFilename(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}
async function delay(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
function buildSearchQuery(companyName, ...keywords) {
    return `${companyName} ${keywords.join(' ')}`;
}
async function retryWithBackoff(fn, options = {}) {
    const { maxRetries = 3, initialDelay = 1000, maxDelay = 10000, backoffMultiplier = 2, shouldRetry = ()=>true } = options;
    let lastError;
    let currentDelay = initialDelay;
    for(let attempt = 0; attempt <= maxRetries; attempt++){
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
            log(`Attempt ${attempt + 1}/${maxRetries + 1} failed: ${errorMessage}. Retrying in ${currentDelay}ms...`, 'warn');
            // Wait before retrying
            await delay(currentDelay);
            // Increase delay for next attempt (exponential backoff)
            currentDelay = Math.min(currentDelay * backoffMultiplier, maxDelay);
        }
    }
    throw lastError;
}
function isRetryableError(error) {
    if (!error) return false;
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorName = error instanceof Error ? error.name : error?.constructor?.name || '';
    // Retry on parse errors, timeouts, and network errors
    return errorName.includes('ParseError') || errorName.includes('TimeoutError') || errorName.includes('NetworkError') || errorMessage.includes('parse') || errorMessage.includes('timeout') || errorMessage.includes('Timeout') || errorMessage.includes('network') || errorMessage.includes('ECONNREFUSED') || errorMessage.includes('ETIMEDOUT') || errorMessage.includes('Failed to parse');
}
}),
"[project]/src/exa-recruiters.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExaRecruiterFinder",
    ()=>ExaRecruiterFinder,
    "isExaAvailable",
    ()=>isExaAvailable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$exa$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/exa-js/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-route] (ecmascript)");
;
;
class ExaRecruiterFinder {
    exa;
    constructor(){
        const apiKey = process.env.EXA_API_KEY;
        if (!apiKey) {
            throw new Error('EXA_API_KEY is required for fast recruiter search');
        }
        this.exa = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$exa$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](apiKey);
    }
    /**
   * Find recruiters currently working at a company using Exa
   * Returns only verified LinkedIn profiles of actual employees
   */ async findRecruiters(companyName) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Exa] Finding recruiters at: ${companyName}`, 'info');
        const startTime = Date.now();
        const recruiters = [];
        const seenNames = new Set();
        // Focus on LinkedIn profiles - the most reliable source for current employees
        const linkedinResults = await this.searchLinkedInProfiles(companyName);
        // Add unique recruiters
        for (const recruiter of linkedinResults){
            const nameKey = recruiter.name.toLowerCase();
            if (!seenNames.has(nameKey) && this.isValidRecruiter(recruiter)) {
                seenNames.add(nameKey);
                recruiters.push(recruiter);
            }
        }
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Exa] Found ${recruiters.length} verified recruiters in ${duration}s`, 'success');
        return recruiters.slice(0, 10);
    }
    /**
   * Search for LinkedIn profiles of recruiters at the company
   */ async searchLinkedInProfiles(companyName) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('[Exa] Searching LinkedIn profiles...', 'info');
        const recruiters = [];
        try {
            // Search specifically for LinkedIn profile pages with recruiting titles
            const queries = [
                `site:linkedin.com/in recruiter "${companyName}"`,
                `site:linkedin.com/in "talent acquisition" "${companyName}"`,
                `site:linkedin.com/in "technical recruiter" "${companyName}"`
            ];
            for (const query of queries){
                try {
                    const result = await this.exa.searchAndContents(query, {
                        type: 'auto',
                        numResults: 10,
                        text: {
                            maxCharacters: 800
                        },
                        livecrawl: 'preferred'
                    });
                    for (const item of result.results){
                        const recruiter = this.parseLinkedInProfile(item, companyName);
                        if (recruiter) {
                            recruiters.push(recruiter);
                        }
                    }
                } catch (err) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Exa] Query failed: ${query}`, 'warn');
                }
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Exa] Found ${recruiters.length} recruiters on LinkedIn`, 'success');
            return recruiters;
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Exa] LinkedIn search failed: ${error}`, 'warn');
            return [];
        }
    }
    /**
   * Parse a LinkedIn profile result into a Recruiter object
   */ parseLinkedInProfile(item, companyName) {
        // Must be a LinkedIn profile URL (linkedin.com/in/)
        if (!item.url || !item.url.includes('linkedin.com/in/')) {
            return null;
        }
        const title = item.title || '';
        const text = (item.text || '').toLowerCase();
        const companyLower = companyName.toLowerCase();
        // Verify this person works at the target company
        const worksAtCompany = text.includes(companyLower) || title.toLowerCase().includes(companyLower);
        if (!worksAtCompany) {
            return null;
        }
        // Parse name from LinkedIn title format: "FirstName LastName - Title - Company | LinkedIn"
        // or "FirstName LastName | LinkedIn"
        const namePart = title.split(/\s*[-–|]\s*/)[0]?.trim() || '';
        // Validate it looks like a real name (First Last format)
        if (!this.isValidPersonName(namePart)) {
            return null;
        }
        // Extract job title from the profile
        const jobTitle = this.extractJobTitle(title, text);
        // Must have a recruiting-related title
        if (!this.isRecruiterTitle(jobTitle) && !this.hasRecruiterKeywords(text)) {
            return null;
        }
        return {
            name: namePart,
            title: jobTitle || 'Recruiter',
            linkedInUrl: item.url,
            department: this.extractDepartment(text)
        };
    }
    /**
   * Check if a string looks like a valid person name
   */ isValidPersonName(name) {
        if (!name || name.length < 3 || name.length > 50) {
            return false;
        }
        // Must have at least two words (first and last name)
        const parts = name.split(/\s+/);
        if (parts.length < 2) {
            return false;
        }
        // Each part should start with a capital letter and be mostly letters
        for (const part of parts){
            if (!/^[A-Z][a-zA-Z'-]+$/.test(part)) {
                return false;
            }
        }
        // Filter out common non-name patterns
        const invalidPatterns = [
            /^(the|a|an)\s/i,
            /recruiter/i,
            /hiring/i,
            /jobs?$/i,
            /career/i,
            /guide/i,
            /team/i,
            /company/i,
            /salary/i,
            /contract/i,
            /listing/i
        ];
        for (const pattern of invalidPatterns){
            if (pattern.test(name)) {
                return false;
            }
        }
        return true;
    }
    /**
   * Extract job title from LinkedIn profile
   */ extractJobTitle(title, text) {
        // Try to extract from title (format: "Name - Title - Company")
        const parts = title.split(/\s*[-–|]\s*/);
        if (parts.length >= 2) {
            const potentialTitle = parts[1]?.trim();
            if (potentialTitle && potentialTitle.length > 2 && potentialTitle.length < 60) {
                return potentialTitle;
            }
        }
        // Try to find title in text
        const titlePatterns = [
            /(technical recruiter|senior recruiter|lead recruiter|staff recruiter)/i,
            /(talent acquisition (?:manager|lead|specialist|partner))/i,
            /(recruiting (?:manager|lead|coordinator))/i,
            /(head of (?:talent|recruiting|people))/i,
            /(hr (?:manager|director|business partner))/i,
            /(university recruiter|campus recruiter)/i
        ];
        for (const pattern of titlePatterns){
            const match = text.match(pattern);
            if (match) {
                return match[1].split(' ').map((w)=>w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
            }
        }
        return 'Recruiter';
    }
    /**
   * Check if a title indicates a recruiting role
   */ isRecruiterTitle(title) {
        const titleLower = title.toLowerCase();
        const recruiterKeywords = [
            'recruiter',
            'recruiting',
            'talent acquisition',
            'talent partner',
            'sourcer',
            'head of talent',
            'head of people',
            'hr manager',
            'hr director',
            'people operations'
        ];
        return recruiterKeywords.some((keyword)=>titleLower.includes(keyword));
    }
    /**
   * Check if profile text contains recruiter-related keywords
   */ hasRecruiterKeywords(text) {
        const keywords = [
            'recruiting',
            'talent acquisition',
            'sourcing candidates',
            'hiring manager',
            'full-cycle recruiting',
            'technical recruiting',
            'campus recruiting'
        ];
        return keywords.some((keyword)=>text.includes(keyword));
    }
    /**
   * Validate a recruiter object
   */ isValidRecruiter(recruiter) {
        return this.isValidPersonName(recruiter.name) && recruiter.linkedInUrl?.includes('linkedin.com/in/') === true;
    }
    /**
   * Extract department from profile text
   */ extractDepartment(text) {
        const deptKeywords = [
            {
                keyword: 'engineering',
                dept: 'Engineering'
            },
            {
                keyword: 'technical',
                dept: 'Engineering'
            },
            {
                keyword: 'software',
                dept: 'Engineering'
            },
            {
                keyword: 'product',
                dept: 'Product'
            },
            {
                keyword: 'design',
                dept: 'Design'
            },
            {
                keyword: 'sales',
                dept: 'Sales'
            },
            {
                keyword: 'marketing',
                dept: 'Marketing'
            },
            {
                keyword: 'university',
                dept: 'University'
            },
            {
                keyword: 'campus',
                dept: 'University'
            },
            {
                keyword: 'executive',
                dept: 'Executive'
            },
            {
                keyword: 'leadership',
                dept: 'Executive'
            }
        ];
        for (const { keyword, dept } of deptKeywords){
            if (text.includes(keyword)) {
                return dept;
            }
        }
        return undefined;
    }
}
function isExaAvailable() {
    return !!process.env.EXA_API_KEY;
}
}),
"[externals]/module [external] (module, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("module", () => require("module"));

module.exports = mod;
}),
"[project]/src/init.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
// This file MUST be imported first in server.ts and scraper.ts
// It configures the environment to prevent pino-pretty errors in serverless environments
var __TURBOPACK__imported__module__$5b$externals$5d2f$module__$5b$external$5d$__$28$module$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/module [external] (module, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/stream [external] (stream, cjs)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("src/init.ts")}`;
    }
};
;
;
// Detect if we're in a serverless/production environment
const isServerless = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY || ("TURBOPACK compile-time value", "development") === 'production');
if (isServerless) {
    console.log('[Init] Detected serverless environment, disabling pino-pretty');
}
// Configure environment variables to disable pino-pretty before any modules load
process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'info';
delete process.env.PINO_PRETTY; // Remove any pino-pretty config
delete process.env.PINO_TRANSPORT_TARGET; // Disable transports
// Mock pino-pretty module to prevent it from loading
// This is necessary because Stagehand SDK has pino-pretty as a dependency
const require = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$module__$5b$external$5d$__$28$module$2c$__cjs$29$__["createRequire"])(__TURBOPACK__import$2e$meta__.url);
const Module = __turbopack_context__.r("[externals]/module [external] (module, cjs)");
const originalRequire = Module.prototype.require;
Module.prototype.require = function(id) {
    // Intercept pino-pretty and return a no-op function
    if (id === 'pino-pretty') {
        return function pinoPrettyMock() {
            // Return a basic transform stream that does nothing
            return new __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["Transform"]({
                transform (chunk, encoding, callback) {
                    callback(null, chunk);
                }
            });
        };
    }
    // For all other requires, use the original
    return originalRequire.apply(this, arguments);
};
// Set up global error/warning handler to suppress pino-pretty errors
const originalEmit = process.emit;
process.emit = function(event, ...args) {
    // Suppress pino-pretty related warnings and errors
    if (event === 'warning' && args[0]) {
        const warning = args[0];
        const message = warning?.message || String(warning);
        if (message.includes('pino-pretty') || message.includes('pino') && message.includes('transport')) {
            // Silently ignore pino-pretty warnings
            return false;
        }
    }
    if (event === 'uncaughtException' || event === 'unhandledRejection') {
        const error = args[0];
        if (error && typeof error === 'object') {
            const message = error.message || String(error);
            // Suppress pino-pretty transport errors
            if (message.includes('unable to determine transport target') || message.includes('pino-pretty') || message.includes('pino') && message.includes('target')) {
                console.warn('[Init] Suppressed pino-pretty error (expected in serverless)');
                return true; // Mark as handled
            }
        }
    }
    // For all other events, use original emit
    return originalEmit.apply(this, arguments);
};
// Prevent unhandled rejection crashes from pino-pretty
process.on('unhandledRejection', (reason)=>{
    const message = reason?.message || String(reason);
    if (message.includes('pino-pretty') || message.includes('unable to determine transport target')) {
        // Ignore pino-pretty errors
        return;
    }
    // Re-throw other unhandled rejections
    throw reason;
});
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/async_hooks [external] (async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("async_hooks", () => require("async_hooks"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/node:stream/promises [external] (node:stream/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream/promises", () => require("node:stream/promises"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:stream/web [external] (node:stream/web, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream/web", () => require("node:stream/web"));

module.exports = mod;
}),
"[externals]/worker_threads [external] (worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("worker_threads", () => require("worker_threads"));

module.exports = mod;
}),
"[project]/src/types.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompanyInfoSchema",
    ()=>CompanyInfoSchema,
    "CompetitorSchema",
    ()=>CompetitorSchema,
    "CompetitorsSchema",
    ()=>CompetitorsSchema,
    "NewsItemSchema",
    ()=>NewsItemSchema,
    "NewsSchema",
    ()=>NewsSchema,
    "RecruiterSchema",
    ()=>RecruiterSchema,
    "RecruitersSchema",
    ()=>RecruitersSchema,
    "TechStackSchema",
    ()=>TechStackSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/v3/index.js [app-route] (ecmascript)");
;
const CompanyInfoSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().describe('Official company name'),
    mission: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().nullish().describe('Company mission statement or tagline'),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().nullish().describe('Brief company description or about section'),
    headquarters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().nullish().describe('Headquarters location'),
    industry: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().nullish().describe('Industry or sector'),
    website: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().nullish().describe('Official website URL')
});
const NewsItemSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().describe('News headline or title'),
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().describe('Publication date'),
    source: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().describe('News source or publication'),
    summary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().describe('Brief summary of the news'),
    url: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().optional().describe('Link to full article')
});
const NewsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    articles: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].array(NewsItemSchema).describe('Recent company news items')
});
const TechStackSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    languages: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string()).describe('Programming languages used'),
    frameworks: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string()).describe('Frameworks and libraries'),
    tools: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string()).describe('Development tools and platforms'),
    infrastructure: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string()).describe('Cloud and infrastructure technologies')
});
const CompetitorSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().describe('Competitor company name'),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().nullish().describe('Brief description of what they do'),
    website: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().nullish().describe('Competitor website URL')
});
const CompetitorsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    competitors: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].array(CompetitorSchema).describe('Main competitors of the company')
});
const RecruiterSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().describe('Full name of the recruiter'),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().describe('Job title (e.g., Technical Recruiter, Talent Acquisition Manager)'),
    linkedInUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().optional().describe('LinkedIn profile URL'),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().optional().describe('Email address if publicly available'),
    department: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().optional().describe('Department or team they recruit for')
});
const RecruitersSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    recruiters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].array(RecruiterSchema).describe('Recruiters and HR contacts at the company')
});
}),
"[project]/src/scraper.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompanyResearcher",
    ()=>CompanyResearcher
]);
// MUST be first - configures environment to prevent pino errors
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$init$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/init.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$browserbasehq$2f$stagehand$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@browserbasehq/stagehand/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/dist/esm/v3/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-route] (ecmascript)");
;
;
;
;
;
;
class CompanyResearcher {
    stagehand;
    verbose;
    constructor(verbose = false){
        this.verbose = verbose;
        // Determine which LLM provider to use based on available API keys
        const modelConfig = this.getModelConfig();
        // Use BROWSERBASE if credentials available, otherwise LOCAL
        const env = process.env.BROWSERBASE_API_KEY && process.env.BROWSERBASE_PROJECT_ID ? 'BROWSERBASE' : 'LOCAL';
        this.stagehand = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$browserbasehq$2f$stagehand$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Stagehand"]({
            env,
            verbose: verbose ? 1 : 0,
            apiKey: process.env.BROWSERBASE_API_KEY,
            projectId: process.env.BROWSERBASE_PROJECT_ID,
            disablePino: true,
            disableAPI: true,
            model: modelConfig.modelName ? {
                ...modelConfig.modelClientOptions,
                modelName: modelConfig.modelName
            } : undefined
        });
        if (verbose) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Environment: ${env}`, 'info');
        }
    }
    getModelConfig() {
        // Priority: Google Gemini > Anthropic Claude > OpenAI GPT
        if (process.env.GOOGLE_API_KEY) {
            return {
                // Using gemini-2.0-flash (latest stable Gemini model supported by Stagehand)
                modelName: 'gemini-2.0-flash',
                modelClientOptions: {
                    apiKey: process.env.GOOGLE_API_KEY
                }
            };
        } else if (process.env.ANTHROPIC_API_KEY) {
            return {
                modelName: 'claude-3-5-sonnet-20241022',
                modelClientOptions: {
                    apiKey: process.env.ANTHROPIC_API_KEY
                }
            };
        } else if (process.env.OPENAI_API_KEY) {
            return {
                modelName: 'gpt-4o',
                modelClientOptions: {
                    apiKey: process.env.OPENAI_API_KEY
                }
            };
        }
        return {};
    }
    guessCompanyWebsite(companyName) {
        // Common company name to website mappings
        const knownCompanies = {
            'stripe': 'https://stripe.com',
            'anthropic': 'https://www.anthropic.com',
            'openai': 'https://openai.com',
            'google': 'https://www.google.com/about',
            'meta': 'https://about.meta.com',
            'facebook': 'https://about.meta.com',
            'amazon': 'https://www.aboutamazon.com',
            'microsoft': 'https://www.microsoft.com/about',
            'apple': 'https://www.apple.com/about',
            'netflix': 'https://about.netflix.com',
            'uber': 'https://www.uber.com/about',
            'airbnb': 'https://www.airbnb.com/about',
            'shopify': 'https://www.shopify.com/about',
            'salesforce': 'https://www.salesforce.com/company'
        };
        const normalized = companyName.toLowerCase().trim();
        if (knownCompanies[normalized]) {
            return knownCompanies[normalized];
        }
        // Guess based on company name
        return `https://www.${normalized}.com`;
    }
    async initialize() {
        // Initialize Stagehand (required in V3)
        await this.stagehand.init();
        if (this.verbose) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('Stagehand initialized successfully', 'success');
            // Show session URL if using Browserbase
            if (this.stagehand.browserbaseSessionID) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Watch live: https://browserbase.com/sessions/${this.stagehand.browserbaseSessionID}`, 'info');
            }
        }
    }
    async close() {
        await this.stagehand.close();
    }
    /**
   * Get the active page from Stagehand context
   */ getPage() {
        const pages = this.stagehand.context.pages();
        if (!pages || pages.length === 0) {
            throw new Error('No page available in Stagehand context. Make sure initialize() was called.');
        }
        return pages[0];
    }
    async research(companyName) {
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Starting research for: ${companyName}`, 'info');
            // Run research tasks sequentially to avoid navigation conflicts
            const companyInfo = await this.extractCompanyInfo(companyName);
            const competitors = await this.extractCompetitors(companyName);
            const news = await this.extractNews(companyName);
            const techStack = await this.extractTechStack(companyName);
            return {
                companyInfo,
                news,
                techStack,
                competitors,
                researchDate: new Date().toISOString()
            };
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Research failed: ${error}`, 'error');
            throw error;
        }
    }
    async extractCompanyInfo(companyName) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('Extracting company information...', 'info');
        try {
            const page = this.getPage();
            // Navigate directly to the company website
            const companyWebsite = this.guessCompanyWebsite(companyName);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Navigating to ${companyWebsite}...`, 'info');
            // Use waitUntil to handle page redirects properly
            try {
                await page.goto(companyWebsite, {
                    waitUntil: 'networkidle',
                    timeoutMs: 30000
                });
            } catch (navError) {
                // If navigation fails, try with domcontentloaded instead
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('Network idle failed, trying domcontentloaded...', 'warn');
                await page.goto(companyWebsite, {
                    waitUntil: 'domcontentloaded',
                    timeoutMs: 30000
                });
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["delay"])(5000); // Extra wait for dynamic content
            // Extract company information from the website with retry logic
            let companyInfo;
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Extract] Starting extraction for ${companyName} from ${companyWebsite}`, 'info');
                companyInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["retryWithBackoff"])(async ()=>{
                    return await this.stagehand.extract(`You are researching ${companyName}. Extract ALL available information using the page content as primary source, but MUST supplement with your general knowledge for any missing details.\n\n` + 'REQUIRED FIELDS (do NOT return null - use your knowledge if not on page):\n' + `- name: "${companyName}" or official name from page\n` + `- description: Write 4-6 sentences describing what ${companyName} does, their products/services, market position, and key achievements. Use page content + your knowledge of the company.\n` + `- mission: Write 4-6 sentences about ${companyName}'s mission, purpose, values and goals. Use page content + your knowledge.\n` + `- headquarters: City and country/state (check your knowledge of ${companyName}'s headquarters)\n` + `- industry: Specific sector (e.g., "AI Safety", "E-commerce Platform", "Payment Processing")\n` + `- website: Official URL\n\n` + `CRITICAL: For well-known companies like ${companyName}, you likely know their headquarters and industry. Do NOT return null for these fields - use your training data knowledge to fill them in accurately.`, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompanyInfoSchema"]);
                }, {
                    maxRetries: 2,
                    initialDelay: 2000,
                    shouldRetry: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isRetryableError"]
                });
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('Company information extracted', 'success');
                console.log(`[Extract] Successfully extracted data:`, JSON.stringify(companyInfo, null, 2));
                // STRICT VALIDATION: Fill in missing fields individually with targeted prompts
                if (!companyInfo.headquarters) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('Headquarters is missing, using LLM knowledge...', 'info');
                    try {
                        const result = await this.stagehand.extract(`Where is ${companyName}'s headquarters located? Respond with city and state/country (e.g., "San Francisco, California", "London, UK", "New York, NY"). Use your knowledge of ${companyName}.`, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
                            headquarters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string()
                        }));
                        companyInfo.headquarters = result.headquarters || "Location not specified";
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Headquarters filled: ${companyInfo.headquarters}`, 'success');
                    } catch (err) {
                        companyInfo.headquarters = "Location not specified";
                    }
                }
                if (!companyInfo.industry) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('Industry is missing, using LLM knowledge...', 'info');
                    try {
                        const result = await this.stagehand.extract(`What industry or sector does ${companyName} operate in? Respond with a specific industry (e.g., "AI Safety", "E-commerce Platform", "Payment Processing", "Browser Automation"). Use your knowledge of ${companyName}.`, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
                            industry: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string()
                        }));
                        companyInfo.industry = result.industry || "Technology";
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Industry filled: ${companyInfo.industry}`, 'success');
                    } catch (err) {
                        companyInfo.industry = "Technology";
                    }
                }
                if (!companyInfo.description) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('Description is missing, using LLM knowledge...', 'info');
                    try {
                        const result = await this.stagehand.extract(`Write a 4-6 sentence description of ${companyName}. Include what they do, their main products/services, and their market position. Use your knowledge of ${companyName}.`, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
                            description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string()
                        }));
                        companyInfo.description = result.description || `${companyName} is a technology company.`;
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Description filled (length: ${companyInfo.description?.length || 0})`, 'success');
                    } catch (err) {
                        companyInfo.description = `${companyName} is a technology company.`;
                    }
                }
                // GUARANTEE: Ensure website is always set
                companyInfo.website = companyWebsite;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('All required fields guaranteed', 'success');
                return companyInfo;
            } catch (extractError) {
                const errorMessage = extractError instanceof Error ? extractError.message : String(extractError);
                const errorStack = extractError instanceof Error ? extractError.stack : undefined;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Failed to extract company info after retries: ${errorMessage}`, 'error');
                console.error(`[Extract] Failed to extract company info:`, {
                    error: errorMessage,
                    stack: errorStack,
                    companyName,
                    website: companyWebsite,
                    errorType: extractError?.constructor?.name,
                    errorDetails: extractError
                });
                throw extractError; // Re-throw to be caught by outer catch
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            const errorStack = error instanceof Error ? error.stack : undefined;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Failed to extract company info (outer catch): ${errorMessage}`, 'error');
            console.error(`[Extract] Outer error catch:`, {
                error: errorMessage,
                stack: errorStack,
                errorType: error?.constructor?.name
            });
            // Return minimal info if extraction fails
            return {
                name: companyName,
                mission: 'Not found',
                description: 'Not found'
            };
        }
    }
    async extractCompetitors(companyName) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('Extracting competitors...', 'info');
        try {
            const page = this.getPage();
            // Use current page context (already on company website)
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["delay"])(2000);
            // Extract competitors using LLM knowledge + page context
            let competitorsData;
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Extract] Starting competitors extraction for ${companyName}`, 'info');
                competitorsData = await this.stagehand.extract(`Based on the visible content and your knowledge of ${companyName}, identify 5-7 main competitors in the same industry. For each competitor, provide:\n` + '- Company name (exact official name)\n' + '- Brief description of what they do and how they compete (2-3 lines explaining their products/services)\n' + '- Website URL (if known)\n' + 'Use both the page content and your general knowledge of the industry.', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompetitorsSchema"]);
                const competitors = competitorsData.competitors || [];
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Extracted ${competitors.length} competitors`, 'success');
                console.log(`[Extract] Successfully extracted competitors:`, JSON.stringify(competitorsData, null, 2));
                return competitors.slice(0, 7); // Limit to 7 competitors
            } catch (extractError) {
                const errorMessage = extractError instanceof Error ? extractError.message : String(extractError);
                const errorStack = extractError instanceof Error ? extractError.stack : undefined;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Failed to extract competitors: ${errorMessage}`, 'error');
                console.error(`[Extract] Failed to extract competitors:`, {
                    error: errorMessage,
                    stack: errorStack,
                    companyName,
                    errorType: extractError?.constructor?.name,
                    errorDetails: extractError
                });
                throw extractError;
            }
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Failed to extract competitors: ${error}`, 'warn');
            return [];
        }
    }
    async extractNews(companyName) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('Extracting recent news...', 'info');
        try {
            const page = this.getPage();
            // Navigate to company newsroom or blog
            const companyWebsite = this.guessCompanyWebsite(companyName);
            await page.goto(`${companyWebsite}/newsroom`);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["delay"])(2000);
            // Extract news items from search results
            let newsData;
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Extract] Starting news extraction for ${companyName}`, 'info');
                newsData = await this.stagehand.extract('Extract the top 5 recent news articles about this company. For each article, get the title, date, source, and a brief summary. Only include news from the last 6 months if possible.', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NewsSchema"]);
                const news = newsData.articles || [];
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Extracted ${news.length} news items`, 'success');
                console.log(`[Extract] Successfully extracted news:`, JSON.stringify(newsData, null, 2));
                return news.slice(0, 5); // Limit to 5 items
            } catch (extractError) {
                const errorMessage = extractError instanceof Error ? extractError.message : String(extractError);
                const errorStack = extractError instanceof Error ? extractError.stack : undefined;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Failed to extract news: ${errorMessage}`, 'error');
                console.error(`[Extract] Failed to extract news:`, {
                    error: errorMessage,
                    stack: errorStack,
                    companyName,
                    errorType: extractError?.constructor?.name,
                    errorDetails: extractError
                });
                throw extractError; // Re-throw to be caught by outer catch
            }
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Failed to extract news: ${error}`, 'warn');
            return [];
        }
    }
    async extractTechStack(companyName) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('Detecting tech stack...', 'info');
        try {
            const page = this.getPage();
            // Navigate to company careers page
            const companyWebsite = this.guessCompanyWebsite(companyName);
            await page.goto(`${companyWebsite}/careers`);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["delay"])(3000);
            // Extract tech stack
            let techStack;
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Extract] Starting tech stack extraction for ${companyName}`, 'info');
                techStack = await this.stagehand.extract('Extract information about the technologies used by this company. Look for programming languages, frameworks, tools, and infrastructure. If this is a careers page, look at job listings for required skills. If this is a tech blog, look at technologies mentioned.', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TechStackSchema"]);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('Tech stack detected', 'success');
                console.log(`[Extract] Successfully extracted tech stack:`, JSON.stringify(techStack, null, 2));
                return techStack;
            } catch (extractError) {
                const errorMessage = extractError instanceof Error ? extractError.message : String(extractError);
                const errorStack = extractError instanceof Error ? extractError.stack : undefined;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Failed to extract tech stack: ${errorMessage}`, 'error');
                console.error(`[Extract] Failed to extract tech stack:`, {
                    error: errorMessage,
                    stack: errorStack,
                    companyName,
                    errorType: extractError?.constructor?.name,
                    errorDetails: extractError
                });
                throw extractError; // Re-throw to be caught by outer catch
            }
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Failed to extract tech stack: ${error}`, 'warn');
            // Return empty tech stack if extraction fails
            return {
                languages: [],
                frameworks: [],
                tools: [],
                infrastructure: []
            };
        }
    }
    /**
   * Extract recruiters from LinkedIn and company website
   * Searches for recruiters, talent acquisition, and HR professionals
   */ async extractRecruiters(companyName) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('Extracting recruiters...', 'info');
        const recruiters = [];
        try {
            const page = this.getPage();
            // Step 1: Try LinkedIn search for recruiters
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('Searching LinkedIn for recruiters...', 'info');
            try {
                // Search LinkedIn for company recruiters
                const linkedInSearchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(companyName + ' recruiter')}&origin=GLOBAL_SEARCH_HEADER`;
                await page.goto(linkedInSearchUrl, {
                    waitUntil: 'domcontentloaded',
                    timeoutMs: 30000
                });
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["delay"])(3000); // Wait for content to load
                // Extract recruiter profiles from LinkedIn search results
                const linkedInRecruiters = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["retryWithBackoff"])(async ()=>{
                    return await this.stagehand.extract(`Extract recruiter profiles from LinkedIn search results. Look for people with titles containing "Recruiter", "Talent Acquisition", "HR", "People Operations", or similar recruiting roles at ${companyName}.\n\n` + 'For each person found, extract:\n' + '- Full name\n' + '- Job title (exact title from their profile)\n' + '- LinkedIn profile URL\n' + '- Department they recruit for (if mentioned)\n\n' + `Only include people who work at or recruit for ${companyName}. Limit to 10 recruiters.`, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecruitersSchema"]);
                }, {
                    maxRetries: 2,
                    initialDelay: 2000,
                    shouldRetry: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isRetryableError"]
                });
                if (linkedInRecruiters?.recruiters?.length > 0) {
                    recruiters.push(...linkedInRecruiters.recruiters);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Found ${linkedInRecruiters.recruiters.length} recruiters on LinkedIn`, 'success');
                }
            } catch (linkedInError) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`LinkedIn search failed: ${linkedInError instanceof Error ? linkedInError.message : linkedInError}`, 'warn');
            }
            // Step 2: Check company careers/team page
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('Checking company careers/team page...', 'info');
            try {
                const companyWebsite = this.guessCompanyWebsite(companyName);
                // Try careers page first
                await page.goto(`${companyWebsite}/careers`, {
                    waitUntil: 'domcontentloaded',
                    timeoutMs: 20000
                });
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["delay"])(2000);
                const careersRecruiters = await this.stagehand.extract(`Look for recruiting team members, HR contacts, or talent acquisition professionals on this page.\n\n` + 'Extract:\n' + '- Full name\n' + '- Job title\n' + '- Email (if publicly listed)\n' + '- Department they recruit for\n\n' + 'Also check for "Contact Recruiting", "Meet Our Team", or similar sections.', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecruitersSchema"]);
                if (careersRecruiters?.recruiters?.length > 0) {
                    // Avoid duplicates by checking names
                    const existingNames = new Set(recruiters.map((r)=>r.name.toLowerCase()));
                    const newRecruiters = careersRecruiters.recruiters.filter((r)=>!existingNames.has(r.name.toLowerCase()));
                    recruiters.push(...newRecruiters);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Found ${newRecruiters.length} additional recruiters on careers page`, 'success');
                }
            } catch (careersError) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Careers page search failed: ${careersError instanceof Error ? careersError.message : careersError}`, 'warn');
            }
            // Step 3: Try team/about page
            try {
                const companyWebsite = this.guessCompanyWebsite(companyName);
                await page.goto(`${companyWebsite}/about`, {
                    waitUntil: 'domcontentloaded',
                    timeoutMs: 20000
                });
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["delay"])(2000);
                const teamRecruiters = await this.stagehand.extract(`Look for HR, People Operations, or Recruiting team members on this about/team page.\n\n` + 'Extract:\n' + '- Full name\n' + '- Job title (look for titles with HR, Recruiting, Talent, People in them)\n' + '- LinkedIn URL (if available)\n' + '- Department\n', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecruitersSchema"]);
                if (teamRecruiters?.recruiters?.length > 0) {
                    const existingNames = new Set(recruiters.map((r)=>r.name.toLowerCase()));
                    const newRecruiters = teamRecruiters.recruiters.filter((r)=>!existingNames.has(r.name.toLowerCase()));
                    recruiters.push(...newRecruiters);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Found ${newRecruiters.length} additional recruiters on about page`, 'success');
                }
            } catch (aboutError) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`About page search failed: ${aboutError instanceof Error ? aboutError.message : aboutError}`, 'warn');
            }
            // Step 4: Use LLM knowledge as fallback for well-known companies
            if (recruiters.length === 0) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('No recruiters found, using LLM knowledge...', 'info');
                try {
                    const knowledgeRecruiters = await this.stagehand.extract(`Based on your knowledge, who are some known recruiters or talent acquisition professionals at ${companyName}?\n\n` + 'For well-known companies, you may have information about:\n' + '- Head of Recruiting / Talent Acquisition\n' + '- Technical Recruiters\n' + '- University Recruiters\n' + '- HR Leadership\n\n' + 'Provide names and titles if known. Include LinkedIn URLs if you know them.', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecruitersSchema"]);
                    if (knowledgeRecruiters?.recruiters?.length > 0) {
                        recruiters.push(...knowledgeRecruiters.recruiters);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Added ${knowledgeRecruiters.recruiters.length} recruiters from LLM knowledge`, 'success');
                    }
                } catch (knowledgeError) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`LLM knowledge extraction failed: ${knowledgeError instanceof Error ? knowledgeError.message : knowledgeError}`, 'warn');
                }
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Total recruiters found: ${recruiters.length}`, 'success');
            return recruiters.slice(0, 10); // Limit to 10 recruiters
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Failed to extract recruiters: ${error}`, 'error');
            return [];
        }
    }
}
}),
"[project]/app/api/recruiters/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "maxDuration",
    ()=>maxDuration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exa$2d$recruiters$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exa-recruiters.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scraper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/scraper.ts [app-route] (ecmascript)");
;
;
;
const maxDuration = 300; // 5 minutes timeout
async function POST(request) {
    const startTime = Date.now();
    try {
        const body = await request.json();
        const { companyName, useExa = true } = body;
        const normalizedCompany = companyName?.trim();
        if (!normalizedCompany) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Company name is required'
            }, {
                status: 400
            });
        }
        console.log(`[Recruiters API] Starting recruiter search for: ${normalizedCompany}`);
        let recruiters;
        let method = 'none';
        // Try Exa first (fast) if available
        if (useExa && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exa$2d$recruiters$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isExaAvailable"])()) {
            console.log('[Recruiters API] Using Exa (fast mode)');
            method = 'exa';
            try {
                const exaFinder = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exa$2d$recruiters$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExaRecruiterFinder"]();
                recruiters = await exaFinder.findRecruiters(normalizedCompany);
            } catch (exaError) {
                console.warn('[Recruiters API] Exa failed, falling back to Stagehand:', exaError);
                method = 'stagehand-fallback';
            }
        }
        // Fallback to Stagehand (browser-based)
        if (!recruiters || recruiters.length === 0) {
            if (!process.env.GOOGLE_API_KEY && !process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) {
                // If Exa found nothing and no LLM key, return empty
                if (recruiters) {
                    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        recruiters: [],
                        companyName: normalizedCompany,
                        searchDate: new Date().toISOString(),
                        meta: {
                            method: method,
                            durationSeconds: parseFloat(duration)
                        }
                    });
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'No API key configured. Please add EXA_API_KEY or GOOGLE_API_KEY.'
                }, {
                    status: 500
                });
            }
            console.log('[Recruiters API] Using Stagehand (browser mode)');
            method = method || 'stagehand';
            const researcher = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scraper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompanyResearcher"](false);
            try {
                await researcher.initialize();
                recruiters = await researcher.extractRecruiters(normalizedCompany);
                await researcher.close();
            } catch (stagehandError) {
                try {
                    await researcher.close();
                } catch  {}
                throw stagehandError;
            }
        }
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        const filteredRecruiters = (recruiters || []).filter(isLikelyRecruiterProfile);
        console.log(`[Recruiters API] Found ${filteredRecruiters.length} recruiters in ${duration}s using ${method}`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            recruiters: filteredRecruiters,
            companyName: normalizedCompany,
            searchDate: new Date().toISOString(),
            meta: {
                method,
                durationSeconds: parseFloat(duration)
            }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('[Recruiters API] Error:', errorMessage);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: errorMessage
        }, {
            status: 500
        });
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
    'hr'
];
function isLikelyRecruiterProfile(recruiter) {
    if (!recruiter?.name || !recruiter?.title) {
        return false;
    }
    const name = recruiter.name.trim();
    if (!looksLikePersonName(name)) {
        return false;
    }
    const titleLower = recruiter.title.toLowerCase();
    if (!recruiterTitleKeywords.some((keyword)=>titleLower.includes(keyword))) {
        return false;
    }
    const hasLinkedInProfile = recruiter.linkedInUrl?.includes('linkedin.com/in/') === true;
    const hasWorkEmail = Boolean(recruiter.email);
    return hasLinkedInProfile || hasWorkEmail;
}
function looksLikePersonName(name) {
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
        /page/i
    ];
    if (invalidPatterns.some((pattern)=>pattern.test(name))) {
        return false;
    }
    return parts.every((part)=>/^[A-Z][a-zA-Z'-]+$/.test(part));
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f0f6f07d._.js.map