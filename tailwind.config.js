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
        DolarToday: '#d70206',
        Yadio: '#f05b4f',
        BCV: '#f4c63d',
        MonitorDolar: '#d17905',
        LocalBitcoins: '#453D3F',
        Promedio: '#59922b',
      },
      screens: {
        '3xl': '1792px',
        // => @media (min-width: 1792px) { ... }
      },
      textColor: {
        DolarToday: '#d70206',
        Yadio: '#f05b4f',
        BCV: '#f4c63d',
        MonitorDolar: '#d17905',
        LocalBitcoins: '#453D3F',
        Promedio: '#59922b',
      },
    },
    fontFamily: {
      comfortaa: ['Comfortaa'],
      'comfortaa-semibold': ['Comfortaa-Light-300'],
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
