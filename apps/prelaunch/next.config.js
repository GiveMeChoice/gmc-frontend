const withTM = require('next-transpile-modules')(['ui', 'blog']);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '/',
  },
});
