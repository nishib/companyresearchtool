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
"[project]/src/exa-researcher.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExaResearcher",
    ()=>ExaResearcher,
    "isExaAvailable",
    ()=>isExaAvailable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$exa$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/exa-js/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-route] (ecmascript)");
;
;
class ExaResearcher {
    exa;
    constructor(){
        const apiKey = process.env.EXA_API_KEY;
        if (!apiKey) {
            throw new Error('EXA_API_KEY is required for fast search');
        }
        this.exa = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$exa$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](apiKey);
    }
    /**
   * Fast company research using Exa API
   * Returns results in seconds instead of minutes
   */ async research(companyName) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Exa] Starting fast research for: ${companyName}`, 'info');
        const startTime = Date.now();
        // Run all searches in parallel for maximum speed
        const [companyInfo, news, competitors, techStack] = await Promise.all([
            this.extractCompanyInfo(companyName),
            this.extractNews(companyName),
            this.extractCompetitors(companyName),
            this.extractTechStack(companyName)
        ]);
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Exa] Research completed in ${duration}s`, 'success');
        return {
            companyInfo,
            news,
            techStack,
            competitors,
            researchDate: new Date().toISOString()
        };
    }
    async extractCompanyInfo(companyName) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('[Exa] Extracting company info...', 'info');
        try {
            // Search for company info with content extraction
            const result = await this.exa.searchAndContents(`${companyName} company official website about`, {
                type: 'auto',
                numResults: 3,
                category: 'company',
                text: {
                    maxCharacters: 2000
                },
                summary: true,
                livecrawl: 'preferred'
            });
            // Also search for specific company details
            const detailsResult = await this.exa.searchAndContents(`${companyName} headquarters location industry founded`, {
                type: 'auto',
                numResults: 3,
                text: {
                    maxCharacters: 1000
                },
                summary: true
            });
            // Extract info from results
            const mainResult = result.results[0];
            const detailResult = detailsResult.results[0];
            // Parse the summary and text for structured info
            const description = mainResult?.summary || mainResult?.text?.slice(0, 500) || `${companyName} is a technology company.`;
            const detailText = (detailResult?.summary || detailResult?.text || '').toLowerCase();
            // Try to extract headquarters from text
            let headquarters = 'Not specified';
            const hqPatterns = [
                /headquartered in ([^,.]+)/i,
                /headquarters in ([^,.]+)/i,
                /based in ([^,.]+)/i,
                /located in ([^,.]+)/i
            ];
            for (const pattern of hqPatterns){
                const match = detailText.match(pattern);
                if (match) {
                    headquarters = match[1].trim();
                    break;
                }
            }
            // Try to extract industry
            let industry = 'Technology';
            const industryKeywords = [
                'fintech',
                'ai',
                'artificial intelligence',
                'e-commerce',
                'saas',
                'payments',
                'cloud',
                'software',
                'healthcare',
                'biotech'
            ];
            for (const keyword of industryKeywords){
                if (detailText.includes(keyword)) {
                    industry = keyword.charAt(0).toUpperCase() + keyword.slice(1);
                    break;
                }
            }
            const companyInfo = {
                name: companyName,
                description,
                mission: mainResult?.text?.slice(0, 300) || description,
                headquarters,
                industry,
                website: mainResult?.url || `https://www.${companyName.toLowerCase().replace(/\s+/g, '')}.com`
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('[Exa] Company info extracted', 'success');
            return companyInfo;
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Exa] Failed to extract company info: ${error}`, 'warn');
            return {
                name: companyName,
                description: `${companyName} is a technology company.`,
                mission: 'Information not available',
                headquarters: 'Not specified',
                industry: 'Technology',
                website: `https://www.${companyName.toLowerCase().replace(/\s+/g, '')}.com`
            };
        }
    }
    async extractNews(companyName) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('[Exa] Extracting news...', 'info');
        try {
            const result = await this.exa.searchAndContents(`${companyName} company news announcement`, {
                type: 'auto',
                numResults: 5,
                category: 'news',
                text: {
                    maxCharacters: 500
                },
                summary: true,
                livecrawl: 'preferred'
            });
            const news = result.results.map((item)=>({
                    title: item.title || 'Untitled',
                    date: item.publishedDate || new Date().toISOString().split('T')[0],
                    source: new URL(item.url).hostname.replace('www.', ''),
                    summary: item.summary || item.text?.slice(0, 200) || 'No summary available',
                    url: item.url
                }));
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Exa] Found ${news.length} news items`, 'success');
            return news;
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Exa] Failed to extract news: ${error}`, 'warn');
            return [];
        }
    }
    async extractCompetitors(companyName) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('[Exa] Extracting competitors...', 'info');
        try {
            const result = await this.exa.searchAndContents(`${companyName} competitors alternatives similar companies`, {
                type: 'auto',
                numResults: 7,
                category: 'company',
                text: {
                    maxCharacters: 500
                },
                summary: true
            });
            // Also do a direct search for competitor analysis
            const analysisResult = await this.exa.searchAndContents(`"${companyName}" competitor analysis market`, {
                type: 'auto',
                numResults: 3,
                text: {
                    maxCharacters: 1000
                },
                summary: true
            });
            // Extract competitor names from results
            const competitors = [];
            const seenNames = new Set([
                companyName.toLowerCase()
            ]);
            // Try to parse competitors from analysis text
            const analysisText = analysisResult.results[0]?.text || analysisResult.results[0]?.summary || '';
            // Common competitor patterns
            const competitorPatterns = [
                /competitors?\s+(?:include|are|such as)\s+([^.]+)/gi,
                /competes?\s+with\s+([^.]+)/gi,
                /alternatives?\s+(?:to|include)\s+([^.]+)/gi
            ];
            for (const pattern of competitorPatterns){
                const matches = analysisText.matchAll(pattern);
                for (const match of matches){
                    const names = match[1].split(/,|and/).map((n)=>n.trim()).filter((n)=>n.length > 2 && n.length < 50);
                    for (const name of names){
                        if (!seenNames.has(name.toLowerCase())) {
                            seenNames.add(name.toLowerCase());
                            competitors.push({
                                name,
                                description: `Competitor in the same market as ${companyName}`,
                                website: null
                            });
                        }
                    }
                }
            }
            // Add results from company search
            for (const item of result.results){
                const name = item.title?.split(/[-–|]/)[0]?.trim() || '';
                if (name && !seenNames.has(name.toLowerCase()) && name.toLowerCase() !== companyName.toLowerCase()) {
                    seenNames.add(name.toLowerCase());
                    competitors.push({
                        name,
                        description: item.summary || item.text?.slice(0, 200) || 'No description available',
                        website: item.url
                    });
                }
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Exa] Found ${competitors.length} competitors`, 'success');
            return competitors.slice(0, 7);
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Exa] Failed to extract competitors: ${error}`, 'warn');
            return [];
        }
    }
    async extractTechStack(companyName) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('[Exa] Extracting tech stack...', 'info');
        try {
            const result = await this.exa.searchAndContents(`${companyName} engineering tech stack technologies programming languages`, {
                type: 'auto',
                numResults: 5,
                text: {
                    maxCharacters: 1500
                },
                summary: true
            });
            // Also search for job postings
            const jobsResult = await this.exa.searchAndContents(`${companyName} careers jobs software engineer requirements`, {
                type: 'auto',
                numResults: 3,
                text: {
                    maxCharacters: 1000
                }
            });
            // Combine all text for analysis
            const allText = [
                ...result.results.map((r)=>r.text || r.summary || ''),
                ...jobsResult.results.map((r)=>r.text || '')
            ].join(' ').toLowerCase();
            // Define tech categories
            const languageKeywords = [
                'python',
                'javascript',
                'typescript',
                'java',
                'go',
                'golang',
                'rust',
                'c++',
                'ruby',
                'scala',
                'kotlin',
                'swift',
                'php'
            ];
            const frameworkKeywords = [
                'react',
                'next.js',
                'vue',
                'angular',
                'django',
                'flask',
                'express',
                'fastapi',
                'spring',
                'rails',
                'node.js',
                'tensorflow',
                'pytorch'
            ];
            const toolKeywords = [
                'docker',
                'kubernetes',
                'git',
                'jenkins',
                'terraform',
                'ansible',
                'grafana',
                'prometheus',
                'elasticsearch',
                'redis',
                'kafka',
                'rabbitmq'
            ];
            const infraKeywords = [
                'aws',
                'gcp',
                'azure',
                'cloudflare',
                'vercel',
                'heroku',
                'digitalocean',
                'mongodb',
                'postgresql',
                'mysql',
                'dynamodb',
                's3'
            ];
            const techStack = {
                languages: languageKeywords.filter((k)=>allText.includes(k)),
                frameworks: frameworkKeywords.filter((k)=>allText.includes(k.toLowerCase())),
                tools: toolKeywords.filter((k)=>allText.includes(k)),
                infrastructure: infraKeywords.filter((k)=>allText.includes(k))
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('[Exa] Tech stack extracted', 'success');
            return techStack;
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Exa] Failed to extract tech stack: ${error}`, 'warn');
            return {
                languages: [],
                frameworks: [],
                tools: [],
                infrastructure: []
            };
        }
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-route] (ecmascript)");
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
    normalizeWebsite(url) {
        if (!url) return null;
        try {
            const parsed = new URL(url);
            return `${parsed.protocol}//${parsed.hostname}`;
        } catch  {
            return null;
        }
    }
    sanitizeCompetitors(raw) {
        const blockedNamePatterns = [
            /top\s+\d+/i,
            /alternatives?/i,
            /community/i,
            /reddit/i,
            /dev\s*community/i,
            /news/i,
            /blog/i,
            /forum/i,
            /list/i
        ];
        const blockedDomains = new Set([
            'reddit.com',
            'dev.to',
            'medium.com',
            'news.ycombinator.com',
            'linkedin.com',
            'github.com',
            'substack.com'
        ]);
        const seen = new Set();
        return raw.map((competitor)=>({
                name: competitor?.name?.trim() ?? '',
                description: competitor?.description?.trim() ?? null,
                website: this.normalizeWebsite(competitor?.website ?? null)
            })).filter((competitor)=>competitor.name.length > 1).filter((competitor)=>!blockedNamePatterns.some((pattern)=>pattern.test(competitor.name))).filter((competitor)=>{
            if (!competitor.website) return true;
            try {
                const hostname = new URL(competitor.website).hostname.replace(/^www\./, '');
                return !blockedDomains.has(hostname);
            } catch  {
                return false;
            }
        }).filter((competitor)=>{
            const key = competitor.name.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        }).slice(0, 7);
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
                    return await this.stagehand.extract(`You are researching ${companyName}. Use ONLY the visible page content as your source. Do not infer or use general knowledge. Do not paraphrase; use exact wording from the page. If a field is not explicitly stated on the page, return null for that field.\n\n` + 'FIELDS:\n' + `- name: "${companyName}" or official name from page\n` + `- description: 2-4 sentences summarizing what ${companyName} does, based only on page content\n` + `- mission: 1-3 exact sentences that describe ${companyName}'s mission or purpose as stated on the page (must include the word "mission" or be part of a mission statement). Do not include a company name header or repeat the company name unless it appears in the sentence.\n` + `- headquarters: City and country/state as stated on the page\n` + `- industry: Specific sector as stated on the page\n` + `- website: Official URL stated on the page`, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompanyInfoSchema"]);
                }, {
                    maxRetries: 2,
                    initialDelay: 2000,
                    shouldRetry: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isRetryableError"]
                });
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('Company information extracted', 'success');
                console.log(`[Extract] Successfully extracted data:`, JSON.stringify(companyInfo, null, 2));
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])('Company fields extracted from page content', 'success');
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
            // Extract competitors using page context only
            let competitorsData;
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`[Extract] Starting competitors extraction for ${companyName}`, 'info');
                competitorsData = await this.stagehand.extract(`From the visible content only, list up to 5 direct competitors that are actual companies (not articles, lists, communities, or forums). Use exact wording from the page; do not paraphrase.\n` + 'If a competitor is not explicitly referenced on the page, omit it.\n' + 'For each competitor, provide:\n' + '- Company name (official name)\n' + '- Short description based on the page (1-2 sentences)\n' + '- Website URL if explicitly shown\n', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompetitorsSchema"]);
                const competitors = this.sanitizeCompetitors(competitorsData.competitors || []);
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
"[project]/src/report-generator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReportGenerator",
    ()=>ReportGenerator
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils.ts [app-route] (ecmascript)");
;
;
class ReportGenerator {
    async generateMarkdown(report) {
        const { companyInfo, news, techStack, competitors, researchDate } = report;
        const cleanText = (value, fallback = 'Not Available')=>{
            if (!value) return fallback;
            const cleaned = value.replace(/^\s*#+\s*/g, '').replace(/\s*\n+\s*/g, ' ').replace(/\s{2,}/g, ' ').trim();
            return cleaned || fallback;
        };
        const sanitizeNarrative = (value, companyName)=>{
            if (!value || value === 'Not Available') return 'Not Available';
            const blockedPhrases = [
                /one little project/i,
                /annual revenue/i,
                /total funding/i,
                /\bemploys\b/i,
                /\byoy\b/i
            ];
            const withoutHeader = value.replace(new RegExp(`^${companyName}\\s*\\([^)]*\\)\\s*`, 'i'), '').trim();
            const sentences = withoutHeader.split(/(?<=[.!?])\s+/);
            const kept = sentences.filter((sentence)=>{
                const trimmed = sentence.trim();
                if (!trimmed) return false;
                if (blockedPhrases.some((pattern)=>pattern.test(trimmed))) return false;
                const mentionsCompany = trimmed.toLowerCase().includes(companyName.toLowerCase());
                const allowedStart = /^(it|the company|this company|they|its|we|our)\b/i.test(trimmed);
                const containsGenericCompanyClaim = /\bis a company that\b/i.test(trimmed);
                if (containsGenericCompanyClaim && !mentionsCompany) return false;
                return mentionsCompany || allowedStart;
            });
            const unique = Array.from(new Set(kept.map((sentence)=>sentence.trim()))).filter(Boolean);
            const cleaned = unique.join(' ').trim();
            if (!cleaned) return 'Not Available';
            return /[.!?]$/.test(cleaned) ? cleaned : `${cleaned}.`;
        };
        const formatStackItem = (value)=>{
            const trimmed = value.trim();
            if (!trimmed) return trimmed;
            const normalized = trimmed.toLowerCase();
            const map = {
                'javascript': 'JavaScript',
                'typescript': 'TypeScript',
                'node.js': 'Node.js',
                'next.js': 'Next.js',
                'react': 'React',
                'vue': 'Vue',
                'angular': 'Angular',
                'go': 'Go',
                'rust': 'Rust',
                'scala': 'Scala',
                'kubernetes': 'Kubernetes',
                'git': 'Git',
                'terraform': 'Terraform',
                'vercel': 'Vercel',
                'aws': 'AWS',
                'gcp': 'GCP',
                'sql': 'SQL',
                'nosql': 'NoSQL',
                'api': 'API',
                'sdk': 'SDK',
                'ci': 'CI',
                'cd': 'CD',
                'cdn': 'CDN',
                'graphql': 'GraphQL',
                'grpc': 'gRPC',
                'http': 'HTTP',
                'https': 'HTTPS'
            };
            if (map[normalized]) return map[normalized];
            if (/[A-Z]/.test(trimmed)) return trimmed;
            return trimmed.split(' ').map((word)=>{
                if (!word) return word;
                if (map[word.toLowerCase()]) return map[word.toLowerCase()];
                return word[0].toUpperCase() + word.slice(1);
            }).join(' ');
        };
        let markdown = '';
        // Header
        markdown += `Company Research Report\n\n`;
        markdown += `Company: ${companyInfo.name}\n`;
        markdown += `Research Date: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatDate"])()}\n\n`;
        // Company Information
        const overview = sanitizeNarrative(cleanText(companyInfo.description, 'Not Available'), companyInfo.name);
        const mission = sanitizeNarrative(cleanText(companyInfo.mission), companyInfo.name);
        markdown += `Company Overview\n`;
        markdown += `Mission: ${mission}\n\n`;
        markdown += `${overview === 'Not Available' ? 'No Description Available' : overview}\n\n`;
        if (companyInfo.headquarters || companyInfo.industry || companyInfo.website) {
            markdown += `Key Facts\n`;
            if (companyInfo.headquarters) markdown += `Headquarters: ${companyInfo.headquarters}\n`;
            if (companyInfo.industry) markdown += `Industry: ${companyInfo.industry}\n`;
            if (companyInfo.website) markdown += `Website: ${companyInfo.website}\n`;
            markdown += `\n`;
        }
        // Recent News
        markdown += `Recent News\n\n`;
        if (news.length > 0) {
            news.forEach((item, index)=>{
                markdown += `${index + 1}. ${item.title}\n`;
                markdown += `Date: ${item.date} | Source: ${item.source}\n`;
                markdown += `${item.summary}\n`;
                if (item.url) {
                    markdown += `Read More: ${item.url}\n`;
                }
                markdown += `\n`;
            });
        } else {
            markdown += `No Recent News Found\n\n`;
        }
        // Tech Stack
        markdown += `Technology Stack\n\n`;
        if (techStack.languages.length > 0) {
            const languages = techStack.languages.map(formatStackItem).join(', ');
            markdown += `Programming Languages: ${languages}\n\n`;
        }
        if (techStack.frameworks.length > 0) {
            const frameworks = techStack.frameworks.map(formatStackItem).join(', ');
            markdown += `Frameworks and Libraries: ${frameworks}\n\n`;
        }
        if (techStack.tools.length > 0) {
            const tools = techStack.tools.map(formatStackItem).join(', ');
            markdown += `Tools and Platforms: ${tools}\n\n`;
        }
        if (techStack.infrastructure.length > 0) {
            const infrastructure = techStack.infrastructure.map(formatStackItem).join(', ');
            markdown += `Infrastructure: ${infrastructure}\n\n`;
        }
        if (techStack.languages.length === 0 && techStack.frameworks.length === 0 && techStack.tools.length === 0 && techStack.infrastructure.length === 0) {
            markdown += `Tech Stack Information Not Found\n\n`;
        }
        // Competitors
        markdown += `Competitors\n\n`;
        if (competitors.length > 0) {
            competitors.forEach((competitor)=>{
                const description = sanitizeNarrative(cleanText(competitor.description, 'Not Available'), competitor.name);
                markdown += `Name: ${competitor.name}\n`;
                markdown += `Description: ${description === 'Not Available' ? 'No Description Available' : description}\n`;
                if (competitor.website) {
                    markdown += `Website: ${competitor.website}\n`;
                }
                markdown += `\n`;
            });
        } else {
            markdown += `No Competitor Information Found\n\n`;
        }
        // Footer
        markdown += `Report Generated On ${researchDate} Using Automated Research Tools\n`;
        return markdown;
    }
    async saveReport(report, outputPath) {
        const markdown = await this.generateMarkdown(report);
        const filename = outputPath || `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeFilename"])(report.companyInfo.name)}-research-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatDate"])()}.md`;
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["writeFile"])(filename, markdown, 'utf-8');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["log"])(`Report saved to: ${filename}`, 'success');
        return filename;
    }
    async displayReport(report) {
        const markdown = await this.generateMarkdown(report);
        console.log('\n' + markdown);
    }
}
}),
"[project]/app/api/research/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "maxDuration",
    ()=>maxDuration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exa$2d$researcher$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/exa-researcher.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scraper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/scraper.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$report$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/report-generator.ts [app-route] (ecmascript)");
;
;
;
;
const maxDuration = 300; // 5 minutes timeout
async function POST(request) {
    const startTime = Date.now();
    try {
        const body = await request.json();
        const { companyName, useExa = true } = body;
        if (!companyName) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Company name is required'
            }, {
                status: 400
            });
        }
        console.log(`[Research API] Starting research for: ${companyName}`);
        let report;
        let method = 'none';
        // Try Exa first (fast) if available and requested
        if (useExa && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exa$2d$researcher$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isExaAvailable"])()) {
            console.log('[Research API] Using Exa (fast mode)');
            method = 'exa';
            try {
                const exaResearcher = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$exa$2d$researcher$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExaResearcher"]();
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
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'No API key configured. Please add EXA_API_KEY or GOOGLE_API_KEY.'
                }, {
                    status: 500
                });
            }
            console.log('[Research API] Using Stagehand (browser mode)');
            method = method || 'stagehand';
            const researcher = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$scraper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CompanyResearcher"](false);
            try {
                await researcher.initialize();
                report = await researcher.research(companyName);
                await researcher.close();
            } catch (stagehandError) {
                try {
                    await researcher.close();
                } catch  {}
                throw stagehandError;
            }
        }
        const reportGenerator = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$report$2d$generator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReportGenerator"]();
        const markdown = await reportGenerator.generateMarkdown(report);
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`[Research API] Completed in ${duration}s using ${method}`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            markdown,
            report,
            meta: {
                method,
                durationSeconds: parseFloat(duration)
            }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('[Research API] Error:', errorMessage);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: errorMessage
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1172bc5b._.js.map