/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp',],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.sanity.io',
            port: '',
            pathname: '/images/01jwvji0/production/**',
          },
        ],
      },
}

module.exports = nextConfig
