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
      },
    },
    backgroundImage: (theme) => ({
      'dawn': `linear-gradient(to top, #C4AD8A, #19547B)`, // Dawn
      'noon': `gradient-to-t from-[#bdc3c7] to-[#003973]`, // Noon
      'dusk': `gradient-to-t from-[#C45656] to-[#2C3E50]`, // Dusk
      'night': `gradient-to-t from-[#141E30] to-[#243B55]`, // Night
    }),
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
