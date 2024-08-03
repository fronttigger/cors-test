/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
    output: 'standalone',
  },
  async rewrites() {
    return [
      {
        source: '/sample-script.js',
        destination: '/public/sample-script.js',
      },
    ]
  },
}

export default nextConfig
