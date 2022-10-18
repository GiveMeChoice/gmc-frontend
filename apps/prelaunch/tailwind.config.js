const config = require('tailwind-config/tailwind.config.js');
const defaultTheme = require('tailwindcss/defaultTheme');

config.theme.borderRadius = {
  ...defaultTheme.borderRadius,
  'hero-flare': '590px',
  hero: '1200px',
};

module.exports = config;
