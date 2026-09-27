import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix Turbopack root detection when multiple package.json files exist in the monorepo
  turbopack: {
    root: __dirname,
  },
  // Proxy /api and /uploads to the backend API server
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${apiUrl}/uploads/:path*`,
      },
    ];
  },

  // Redirect legacy routes (previously handled by React Router <Navigate>)
  async redirects() {
    return [
      { source: '/summer-internships', destination: '/careers', permanent: true },
      { source: '/internships',        destination: '/careers', permanent: true },
    ];
  },

  // Allow Cloudinary and other external image domains
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
    unoptimized: true, // keep parity with original <img> tags
  },

  // Optimize package imports for faster builds and smaller bundle sizes
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', 'framer-motion', 'recharts'],
  },

  compress: true,

  // Standard security and performance response headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },

  // Suppress hydration warnings from browser extensions & AOSs
  reactStrictMode: true,
};

export default nextConfig;
