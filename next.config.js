/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
        {
          source: '/app/example',
          destination: `http://dev-chewy-api.use1.plat.dev.chewy.com/api/examplep/v1/service/details`,
        },
      ]
}
}

module.exports = nextConfig
