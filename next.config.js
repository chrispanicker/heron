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
      
    generateBuildId: async () => {
      // This could be anything, using the latest git hash
      return `${process.env.GIT_HASH}`
    },
    experimental: { 
      missingSuspenseWithCSRBailout: false, 
      taint: true,
    },
    env:{
      REVALIDATION_SECRET: process.env.REVALIDATION_SECRET,
    }
}

module.exports = nextConfig
