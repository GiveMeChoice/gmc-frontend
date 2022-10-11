const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    borderRadius: {
      ...defaultTheme.borderRadius,
      'prelaunch-hero': '800px',
    },
    extend: {
      colors: {
        primary: '#a7f700',
        secondary: '#f0f0f5',
        gmcDune: '#dcb586',
        gmcJungle: '#adbe00',
        gmcForest: '#029900',
        gmcHeart: '#cc5170',
        gmcGlacier: '#a7afc1',
        gmcBeach: '#f8ff93',
        gmcSurf: '#56e2b3',
        gmcSoil: '#8b763b',
        gmcBerry: '#aa7ab2',
        gmcCandy: '#f79cc4',
        gmcOcean: '#0e2071',
      },
    },
  },
  plugins: [],
};
