// Color palette: https://coolors.co/palette/e63946-f1faee-a8dadc-457b9d-1d3557
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "poke-red": "#E63946",
        "poke-cream": "#F1FAEE",
        "poke-light-blue": "#A8DADC",
        "poke-neutral-blue": "#457B9D",
        "poke-dark-blue": "#1D3557",
      },
    },
  },
  plugins: [],
};
