/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var", sans-serif'],
      },
      borderColor: {
        default: "#E0E0E0",
        dark: "#48484A",
      },
    },
  },
  plugins: [],
};
