/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'open-sans-condensed': ['"Open Sans Condensed"','sans-serif'],
      },
    },
  },
  plugins: [],
} 