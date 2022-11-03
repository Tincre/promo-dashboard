/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      yup: path.resolve("./node_modules/yup"),
      "@heroicons/react": path.resolve("./node_modules/@heroicons/react"),
      "react-chartjs-2": path.resolve("./node_modules/react-chartjs-2"),
      "chart.js": path.resolve("./node_modules/chart.js"),
      "react": path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
      "tailwindcss": path.resolve("./node_modules/tailwindcss"),
    };
    return config;
  },
};

module.exports = nextConfig;
