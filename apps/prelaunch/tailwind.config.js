const config = require('tailwind-config/tailwind.config.js');
const defaultTheme = require('tailwindcss/defaultTheme');

config.theme.borderRadius = {
  ...defaultTheme.borderRadius,
  'hero-flare': '632px',
  hero: '1200px',
};

config.theme.extend.keyframes = {
  'gradient-flow': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
};

config.theme.extend.animation = {
  'gradient-flow': 'gradient-flow 15s ease infinite',
};

module.exports = config;
