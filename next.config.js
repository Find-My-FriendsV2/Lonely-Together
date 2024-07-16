/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['uploadthing.com', 'lh3.googleusercontent.com', 'lonely-together.s3.us-east-1.amazonaws.com'],
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
