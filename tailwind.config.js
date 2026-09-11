/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        matte: '#0a0a0a',
        panel: '#0d0d0d',
        line: 'rgba(255,255,255,0.14)',
        'line-soft': 'rgba(255,255,255,0.08)',
        paper: '#000000',
        'paper-line': 'rgba(255,255,255,0.12)',
        muted: '#9a9a9a',
        stat: '#d8d8d8',
        gold: '#d4d4d4',
        'gold-deep': '#ffffff',
      },
      fontFamily: {
        display: ['"Inter"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Times New Roman', 'Times', 'serif'],
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
