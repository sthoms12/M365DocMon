/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@node-rs/bcrypt-linux-x64-gnu',
        'node_modules/@node-rs/bcrypt-linux-x64-musl',
      ],
    },
  },
  // Add this to ensure Cloudflare compatibility
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

export default nextConfig;