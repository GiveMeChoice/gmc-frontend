const withTM = require('next-transpile-modules')([
  'ui',
  'gmc-types',
  'helpers',
]);

module.exports = withTM({
  reactStrictMode: true,
});
