/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#e3f2fd",
          200: "#bbdefb",
          500: "#2196f3",
          700: "#1976d2",
          900: "#0d47a1",
        },
      },
    },
  },
  plugins: [],
};
