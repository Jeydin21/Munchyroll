/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F0E0E",
          light: "#343434",
          hover: "#1F1F1F",
        },
        secondary: {
          DEFAULT: "#FFFFFF",
          light: "#D9D9D9",
        },
        accent: {
          DEFAULT: "#FBBF24",
          light: "#FDE68A",
        },

        background: {
          DEFAULT: "#0F0E0E",
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
    require("@tailwindcss/line-clamp"),
  ],
};
