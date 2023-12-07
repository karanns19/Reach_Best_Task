/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        customBlue: {
          light: '#0B3366',
          dark: '#082A56'
        },
        customWhite: '#FAFAFA',
        customSkyBlue: '#0C66D6',
        borderColor: 'rgb(223,223,223,0.41)',
        customGrey: '#C6C6C6',
        customHeadingColor: '#545454',
        customTextColor : '#909090'
      }
    },
  },
  plugins: [],
}
