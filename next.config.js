/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.themoviedb.org',
      },
      {
        protocol: 'https',
        hostname: '**.tmdb.org',
      },
      {
        protocol: 'https',
        hostname: '**.telegram-cdn.org',
      },
      {
        protocol: 'https',
        hostname: 'telegraph-image.pages.dev',
      }
    ],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
