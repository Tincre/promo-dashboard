module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // uncomment for npm @tincre/promo-dashboard installation
    './node_modules/@tincre/promo-dashboard/*.{js,ts,jsx,tsx}',
    './node_modules/@tincre/promo-dashboard/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tincre/promo-button/*',
    './node_modules/@tincre/promo-button/**/*',
    '../../dist/*.{js,ts,jsx,tsx}', // remove for deployed apps
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
