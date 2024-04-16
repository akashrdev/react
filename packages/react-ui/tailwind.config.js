/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      dark: {
        100: '#1b1b1c',
        90: '#232324',
        80: '#2a2a2b',
        70: '#323335',
        60: '#383a3c',
        50: '#434445',
        40: '#656564',
        30: '#737373',
        20: '#888989',
      },
      light: {
        100: '#ffffff',
        90: '#f9f9f9',
        80: '#f2f3f5',
        70: '#ebebeb',
        60: '#dee1e7',
        50: '#d7d7d7',
        40: '#c4c6c8',
        30: '#b3b3b3',
      },
      accent: {
        dark: '#08C0B4',
        transparent: '#09cbbf80',
        success: {
          DEFAULT: '#09cbbf',
          transparent: '#09CBBF1A',
        },
        warning: {
          DEFAULT: '#ff9900',
          transparent: '#FF99001A',
        },
        error: {
          DEFAULT: '#f62d2d',
          transparent: '#f62d2d1a',
        },
      },
    },
    extend: {
      fontSize: {
        h2: [
          '1.0625rem',
          {
            fontWeight: 600,
            lineHeight: '1.25rem',
          },
        ],
        text: ['0.9375rem', '1.125rem'],
        subtext: ['0.8125rem', '1rem'],
        caption: ['0.6875rem', '0.875rem'],
      },
      backgroundImage: {
        'gradient-button':
          'linear-gradient(95deg, #2B2D2D 4.07%, #414445 51.31%, #2B2D2D 95.93%)',
      },
    },
  },
  plugins: [],
  prefix: 'dt-',
};