module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // uncomment for npm @tincre/promo-dashboard installation
    './node_modules/@tincre/promo-dashboard/**',
    //    '../../dist/**',
    './node_modules/@tincre/promo-button/**',
    './node_modules/@tincre/promo-chat/**',
  ],
  theme: {
    extend: {
      textOpacity: ['dark'],
    },
  },
  plugins: ['@tailwindcss/typography'],
};
