/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-white': '#FEF7FF'
      },
      width: {
        '100': '30rem',
      },
      height: {
        '100': '30rem',
      }
    },
  },
  plugins: [],
}