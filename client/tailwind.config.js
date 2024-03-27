/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html"
  ],
  theme: {
    fontFamily:{
      main: ['Poppins', 'sans-serif']
    },
    listStyleType:{
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman'
    },
    extend: {
      width:{
        main: '1220px'
      },
      backgroundColor:{
        main: '#424040'
      },
      colors: {
        main: '#ee3131',
        opacity: 'rgba(0, 0, 0, 0.9)',
        opacityLoading: 'rgba(0, 0, 0, 0.4)'
      },
      keyframes: {
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp")
  ],
}