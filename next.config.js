/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
