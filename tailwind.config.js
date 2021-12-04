module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'leni-blue': '#031684'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
