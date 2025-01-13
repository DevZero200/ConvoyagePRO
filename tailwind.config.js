/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B2B65', // Bleu nuit
          orange: '#FF5733', // Orange
        },
        secondary: '#2C3E50',
        accent: '#F4F4F4',
        text: '#BDC3C7'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};