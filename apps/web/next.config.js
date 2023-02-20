const withTM = require('next-transpile-modules')(['ui', 'search']);

module.exports = withTM({
  reactStrictMode: true,
});
