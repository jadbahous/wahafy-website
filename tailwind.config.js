/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C0C0C',
        matte: '#141414',
        panel: '#1C1C1C',
        line: 'rgba(255,255,255,0.10)',
        'line-soft': 'rgba(255,255,255,0.06)',
        paper: '#FAFAF8',
        'paper-line': '#E7E5E2',
        gold: '#C9973A',
        'gold-deep': '#A16207',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        wrap: '1240px',
      },
    },
  },
  plugins: [],
};
