/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#0f0f0f",
        surface: "#181818",
        elevated: "#272727",
      },
    },
  },
  plugins: [],
};
