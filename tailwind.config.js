/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Two looks, one vocabulary. Every colour on the page is a token that
        // reads a CSS variable (src/index.css): `fg` is whatever writes on the
        // surface, `bg` the surface itself, `panel`/`matte` its raised and
        // sunk steps. On the night look fg is white and bg is black; on the
        // daylight look fg is ink and bg is porcelain — and a `.zone-dark`
        // (the hero, the closing band, the chat) stays night on both.
        fg: 'rgb(var(--fg) / <alpha-value>)',
        bg: 'rgb(var(--bg) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        matte: 'rgb(var(--matte) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        stat: 'rgb(var(--stat) / <alpha-value>)',
        line: 'rgb(var(--fg) / 0.14)',
        'line-soft': 'rgb(var(--fg) / 0.08)',
        paper: 'rgb(var(--bg) / <alpha-value>)',
        'paper-line': 'rgb(var(--fg) / 0.12)',
        ok: 'rgb(var(--ok) / <alpha-value>)',
        'ok-dot': 'rgb(var(--ok-dot) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
        ink: '#121418',
      },
      fontFamily: {
        // Schibsted Grotesk carries the headlines: a newspaper grotesk with a
        // firm, editorial voice. Instrument Sans sets everything you read.
        display: ['"Schibsted Grotesk"', '"Instrument Sans"', 'system-ui', 'sans-serif'],
        body: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
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
