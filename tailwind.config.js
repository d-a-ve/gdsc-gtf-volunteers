/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        "2xs": "360px",
        "3xs": "320px",
      },
      zIndex: {
        1: "1",
      },
    },
  },
  plugins: [],
};
