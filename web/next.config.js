module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    domains: ['cdn.sanity.io'],
  },
}
