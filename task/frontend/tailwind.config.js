/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Make sure Tailwind processes all relevant files
    ],
    theme: {
      extend: {
        animation: {
          fadeIn: 'fadeIn 3s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
        },
      },
    },
    plugins: [],
  };
  