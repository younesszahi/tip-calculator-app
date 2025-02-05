/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Specifies the content files to scan for class names
  theme: {
    extend: {
      colors: {
        lightblue: "#ADD8E6", // Custom lightblue color
        lightgreen: "#90EE90", // Custom lightgreen color
      },
    },
  },
  plugins: [],
};
