const withTM = require('next-transpile-modules')(['ui', 'blog']);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '/',
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'media0.giphy.com' },
      { protocol: 'https', hostname: 'media4.giphy.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
    ],
  },
});
