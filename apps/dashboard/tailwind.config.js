const config = require('tailwind-config/tailwind.config.js');
const defaultTheme = require('tailwindcss/defaultTheme');

config.theme.borderRadius = {
  ...defaultTheme.borderRadius,
  'hero-flare': '632px',
  hero: '1200px',
};

module.exports = config;
