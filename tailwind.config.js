/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        space: ["Space Grotesk", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
        ralewaydots: ['"Raleway Dots"', "cursive"],
      },
      animation: {
        marquee: "marquee 10s linear infinite alternate",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
