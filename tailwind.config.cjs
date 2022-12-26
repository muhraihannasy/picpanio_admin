/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#CE1261",
        secondary: "#A80D4E",
        third: "#D70000",
        fourty: "#FFD4E6",
        fivety: "#333333",
        sixty: "#E9EB83",
        seventy: "#D9D9D9",
        eighty: "#666666",
      },
      fontFamily: {
        maven: ["Maven Pro", "sans-serif"],
      },
    },
  },
  plugins: [],
};
