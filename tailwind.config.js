/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html, js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'open-sans-condensed': ['"Open Sans Condensed"','sans-serif'],
      },
    },
  },
  plugins: [],
}

/* cyan: '#22D3EE',
yellow: '#FACC15',
silver: '#A1A1AA'
 */