/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite//plugin'

export default {
  content: [
    "./index.html",                  // root HTML file
    "./src/**/*.{js,jsx,ts,tsx}",    // all JS/JSX/TS/TSX files in src/
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // for flowbite-react
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite
  ],
};