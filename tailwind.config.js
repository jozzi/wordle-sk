module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      transitionProperty: {
        'top': 'top',
        'top-height': 'top,height',
        'cell': 'background-color, font-size',
      },
    },
  },
  plugins: [],
}
