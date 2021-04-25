module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#6F9F77',
        secundary: '#9dbea3',
        background: '#0F444C',
        'background-title': '#5e8d83',
        title: '#e8ae1c',
        'sub-title': '#27343a',
        active: '#f4f5f6',
        grey: '#746868',
        price: '#002152',
      },
      screens: {
        '3xl': '1792px',
        // => @media (min-width: 1792px) { ... }
      },
    },
    fontFamily: {
      comfortaa: ['Comfortaa'],
      'comfortaa-semibold': ['Comfortaa-Light-300'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
