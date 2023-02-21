const withTM = require('next-transpile-modules')(['ui', 'search', 'helpers']);

module.exports = withTM({
  reactStrictMode: true,
});
