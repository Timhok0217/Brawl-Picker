/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'small_ph':"280px",
      'phone': "480px",
      'sm': '640px',
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
    },
    colors: {
      // Настройте свою цветовую палитру здесь
      'body_bg': '#f5f7fb',
      'input_tag':"#8b00ff",
      //'profile_card': "#c0c0c0",
      'profile_card': "#808080",
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
    extend: {
      backgroundImage: (theme) => ({'brawlBall': "url('./src/img/brawl_ball.jpg')",
      'gemGrab': "url('./src/img/smash_and_grab.jpg')",
      'heist': "url('./src/img/heist.jpg')",
      'showdown': "url('./src/img/showdown.jpg')",
      'bounty': "url('./src/img/bounty.jpg')"
       })
    },
  },
  plugins: [],
}
