/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      customFont: ["Roboto", "sans-serif"],
      sans: ["Helvetica", "Arial", "sans-serif"], // Custom font family
    },
    colors: {
      yellowCustom: "#FFD700", // Custom yellow color
      lightOrange: "#FFA500", // Custom light orange color
    },
  },
};
export const plugins = [];
