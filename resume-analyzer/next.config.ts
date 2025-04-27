/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  // Enable static optimization for better performance
  swcMinify: true,
  // Configure image optimization
  images: {
    domains: [],
    unoptimized: true,
  },
  // Configure headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
