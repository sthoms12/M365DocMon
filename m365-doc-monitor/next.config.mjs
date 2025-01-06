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
};

export default nextConfig;