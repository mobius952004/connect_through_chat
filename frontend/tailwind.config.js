/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite/plugin'
import scrollbar from 'tailwind-scrollbar';



export default {
  content: [
    "./index.html",                  // root HTML file
    "./src/**/*.{js,jsx,ts,tsx}",    // all JS/JSX/TS/TSX files in src/
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // for flowbite-react
  ],
   safelist: [
    // Gradients & background colors you use
    'bg-gradient-to-r',
    'bg-gradient-to-br',
    'from-gray-900', 'via-gray-800', 'to-gray-900',
    'from-green-500', 'to-emerald-500',
    'from-green-400', 'to-emerald-400',
    'from-green-600', 'to-emerald-600',
    'hover:from-green-700', 'hover:to-emerald-700',
    'from-green-900/5', 'to-emerald-900/5',
    // Opacity + backdrop
    'border-gray-700/50',
    'backdrop-blur-sm',
    // Text colors
    'text-gray-300', 'text-gray-400', 'text-white',
    'hover:text-green-400',
    // Borders for mobile menu
    'border-t',
    'bg-gray-800/95',
  ],
  
  theme: {
    extend: {},
  },
  plugins: [
    flowbite,
  scrollbar({ nocompatible: true }) ],
};