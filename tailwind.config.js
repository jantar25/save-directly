/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'Manrope': 'Manrope',
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1050px',
      'xl': '1280px',
      '2xl': '1536px',
    },  
    extend: {
      // eslint-disable-next-line no-unused-vars
      colors: _ => ({
        'main': '#FF9900',
        'main-dark': '#37517e',
        'main-hover': '#4d6691',
        'red-extended':'#EF5455',
        'yellow-extended':'#FAD644',
        'gray-extended':'#E4E4E4',
        'white-extended':'#F8F8F8',
        'white-new':'#F8F8FF',
      }),
      rotate: {
        '60': '60deg',
        '120': '120deg',
        '180': '180deg',
        '240': '240deg',
        '300': '300deg',
        '360': '360deg',
      }
    },
  },
  plugins: [],
}

