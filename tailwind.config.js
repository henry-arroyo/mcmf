/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a237e',
          gold: '#ffd700',
          teal: '#2ec4b6'
        }
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        'source-sans': ['Source Sans Pro', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      maxWidth: {
        '7xl': '80rem'
      }
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
}
