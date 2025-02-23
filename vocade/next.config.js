/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
      };
    }
    return config;
  },
  // Disable rewrites warning for static export
  rewrites: () => [],
  // Allow importing Tauri modules
  transpilePackages: ['@tauri-apps/api', '@fabianlars/tauri-plugin-oauth'],
};

module.exports = nextConfig; 