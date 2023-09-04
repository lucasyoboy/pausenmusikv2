/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-img': "url('/image/background.webp)",
      },
      colors: {
        'primery': '#F0F3F8',
        'secondary': '#59071A',
        'three': '#E8232F',
        'four': '#A6A534',
      },
      fontFamily: {
        'montserrat': ['montserrat'],
      }
    }
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

