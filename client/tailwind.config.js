/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        'userDeck': 'repeat(16, minmax(0, 1fr))'
      }
    },
  },
  plugins: [],
}

