/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./Front/src/index.html",
    "./Front/src/*.{html,js}",
    "./Front/src/**/*.{vue,js,ts,jsx,tsx}",
    "./Front/views/**/*.{html,js}"
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1900px'
    },
  },
  plugins: [
  ],
}