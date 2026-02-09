/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{pug,ejs,html,js}",      // ← very important
    "./public/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}