/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  daisyui: {
    themes: [
      {
        dracula: {
          ...require("daisyui/src/colors/themes")["[data-theme=dracula]"],
          primary: '#d07e3d',
          secondary: '#a9988d',
          accent: '#fbd873',
        },
      },
    ],
  },
  variants: {},
  plugins: [require('daisyui')],
}

