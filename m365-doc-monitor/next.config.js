/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@radix-ui/react-dialog', '@radix-ui/react-scroll-area']
  }
}

module.exports = nextConfig
