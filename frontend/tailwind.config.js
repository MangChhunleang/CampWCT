/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2937',
        secondary: '#4B5563',
        accent: '#10B981',
      },
    },
  },
  plugins: [],
} 