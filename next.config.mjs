/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The landing page is rendered from index.html, and the API routes read the agent prompts from /agents at runtime.
  outputFileTracingIncludes: {
    '/': ['./index.html'],
    '/api/**/*': ['./agents/**/*'],
  },
  // Keep the old static-site URLs working (Vercel cleanUrls used to handle these).
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/data-deletion.html', destination: '/data-deletion', permanent: true },
      { source: '/demo.html', destination: '/demo', permanent: true },
      { source: '/tracker.html', destination: '/tracker', permanent: true },
      { source: '/crm/index.html', destination: '/crm', permanent: true },
    ];
  },
};

export default nextConfig;
