module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // uncomment for npm @tincre/promo-dashboard installation
    './node_modules/@tincre/promo-dashboard/**',
    './node_modules/@tincre/promo-button/**',
    './node_modules/@tincre/promo-chat/**',
  ],
  theme: {
    extend: {},
  },
  plugins: ['@tailwindcss/typography'],
};
