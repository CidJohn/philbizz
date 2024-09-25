/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "className",
  theme: {
    extend: {
      height: "450px",
      keyframes: {
        growFromBottom: {
          "0%": { height: "0%" },
          "100%": { height: "var(--bar-height)" },
        },
      },
      animation: {
        growFromBottom: "growFromBottom 1s ease-out forwards",
      },
    },
   
  },
  plugins: [],
};
