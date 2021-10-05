const securityHeaders = [
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Content-Security-Policy-Report-Only',
    value: `default-src 'self'; img-src * ; media-src * ; script-src 'self'`,
  },
]

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  /*   async redirects() {
    return [
      {
        source: '/',
        destination: process.env.NEXT_PUBLIC_BASE_PATH,
        permanent: true,
      },
    ]
  }, */
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
}
