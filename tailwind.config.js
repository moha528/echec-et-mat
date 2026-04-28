/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0a',
          2: '#141312',
          3: '#1f1d1a',
        },
        bone: {
          DEFAULT: '#f5e6c8',
          2: '#d9c9a8',
          3: '#8a7d65',
        },
        bronze: {
          DEFAULT: '#c9a961',
          deep: '#8a6f3a',
        },
        blood: '#6b1f1f',
        line: 'rgba(245, 230, 200, 0.08)',
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter2: '-0.02em',
        eyebrow: '0.18em',
        widest2: '0.3em',
      },
      lineHeight: {
        display: '0.95',
      },
      maxWidth: {
        prose2: '56ch',
        page: '80rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
