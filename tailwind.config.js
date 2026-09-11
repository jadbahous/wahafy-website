/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#16231F',
        matte: '#1E322B',
        panel: '#22362E',
        line: 'rgba(243,245,242,0.12)',
        'line-soft': 'rgba(243,245,242,0.06)',
        paper: '#F3F5F2',
        'paper-line': '#E4EDE7',
        gold: '#4F7C6C',
        'gold-deep': '#395A4E',
      },
      fontFamily: {
        display: ['"Manrope"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
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
