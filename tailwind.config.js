/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['Bebas Neue Cyrillic', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      colors:{
        'primary':'#DEC5E3',
        'secondary':'#A9F8FB',
        'neutal-blue':'#0BF6FF',
        'neutal-black':'#000000',
        'neutal-grey':'#676767',
        'neutal-white':'#FBFBFB',
        'assent-red':'#CF1259',
      },
      backgroundImage:{
        'hero': "url('./Image/webp/Hero.jpg')",
        'stats': "url('./Image/webpStatistic.png')",
      },
    },
  },
  plugins: [],
}