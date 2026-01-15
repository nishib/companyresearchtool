/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for server actions
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Add empty turbopack config to use Next.js 16 defaults
  turbopack: {},
  // Transpile src directory for API routes
  transpilePackages: ['@browserbasehq/stagehand'],
};

export default nextConfig;
