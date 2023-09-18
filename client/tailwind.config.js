/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media',
  daisyui: {
    themes: [
      {
        dracula: {
          ...require("daisyui/src/colors/themes")["[data-theme=dracula]"],
          primary: '#d07e3d',
          secondary: '#a9988d',
          accent: '#fbd873',
          background: '#2a2b33'
        },
      },
    ],
  },
  variants: {},
  plugins: [require('daisyui')],
}

