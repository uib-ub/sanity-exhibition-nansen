module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
        use: ["@svgr/webpack"],
    });
    return config
  }
  /* basePath: '/exhibition',
  async redirects() {
    return [
      {
        source: '/exhibition',
        destination: '/exhibition/chk',
        permanent: true,
      },
    ]
  }, */
}