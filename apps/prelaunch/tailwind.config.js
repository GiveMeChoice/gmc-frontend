const config = require('tailwind-config/tailwind.config.js');
const defaultTheme = require('tailwindcss/defaultTheme');

config.theme.borderRadius = {
  ...defaultTheme.borderRadius,
  hero: '500px',
  heroBig: '1200px',
};

module.exports = config;
