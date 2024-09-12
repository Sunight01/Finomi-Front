/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-white': '#FEF7FF',
        'super-light-gray': '#F4F4F5',
        'light-green':'#B8FFB7',
        'light-blue':'#C6E7FF',
        'light-red':'#FFCFCF',
      },
      width: {
        '100': '30rem',
      },
      height: {
        '100': '30rem',
        '102': '32rem',
        '104': '34rem',
        '106': '36rem', 
      },
      margin: {
        '4px': '10px'
      },
      screens: {
        sm: '320px',
        mbm: '426px'
      },
      fontFamily:{
        'inter': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}