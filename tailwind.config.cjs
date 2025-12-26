/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
      extend: {
          screens: {
              'semi-xl': '1380px',
              '3xl': '1800px',
          },
      },
  },
  plugins: [],
}