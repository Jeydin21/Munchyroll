/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: 'selector',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#222222",
          light: "#5F5E5E",
          hover: "#4b4b4b",
        },
        secondary: {
          DEFAULT: "#F2F2F2",
          light: "#D1D1D1",
          hover:"#c1c1c1"
        },
        accent: {
          DEFAULT: "#FBBF24",
          light: "#FDE68A",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.3xl") }, // 24px
        h2: { fontSize: theme("fontSize.2xl") }, // 20px
        h3: { fontSize: theme("fontSize.xl") }, // 18px
        // h4, h5, h6, p - 16px;
      });
    }),
  ],
};
