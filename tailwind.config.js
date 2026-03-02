/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f3',
          100: '#fde6e7',
          200: '#fbd0d3',
          300: '#f7a9ae',
          400: '#f27984',
          500: '#ec1b24',
          600: '#d61820',
          700: '#b3141b',
          800: '#94131a',
          900: '#7c141b',
        },
        secondary: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#808080',
          600: '#666666',
          700: '#515151',
          800: '#434343',
          900: '#383838',
        },
        charcoal: {
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#c2c2c2',
          300: '#9e9e9e',
          400: '#757575',
          500: '#4a4a4a',
          600: '#3a3a3a',
          700: '#2a2a2a',
          800: '#1f1f1f',
          900: '#141414',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(236, 27, 36, 0.5), 0 0 10px rgba(236, 27, 36, 0.3)' },
          '100%': { boxShadow: '0 0 10px rgba(236, 27, 36, 0.8), 0 0 20px rgba(236, 27, 36, 0.4)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(236, 27, 36, 0.3)',
        'glow-md': '0 0 15px rgba(236, 27, 36, 0.4)',
        'glow-lg': '0 0 25px rgba(236, 27, 36, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
};
