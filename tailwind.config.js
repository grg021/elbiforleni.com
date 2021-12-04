module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'leni-blue': '#031684',
        'leni-pink': '#ce0f69'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
