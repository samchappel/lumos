/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    colors: {
      primary: '#d07e3d',
      secondary: '#54473e',
      success: '#749040',
      warning: '#ffc107',
      danger: '#52291e',
      info: '#b23c17',
      light: '#b1cbbb',
      dark: '#615042',
    },
  },
  variants: {},
  plugins: [require('daisyui')],
}

