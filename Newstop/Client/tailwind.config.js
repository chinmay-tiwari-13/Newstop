/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Merri: ['Merriweather', 'Merri'],
        Outfit: ['Outfit', 'Outfit'],
      },
      animation: {
        'spin-slow': 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
}
