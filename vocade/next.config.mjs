/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  rewrites: async () => {
    return [
      {
        source: '/auth/callback',
        destination: '/api/auth/callback'
      }
    ]
  }
};

export default nextConfig;
