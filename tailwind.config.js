/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mint': '#B4E4D6',     
        'olive': '#7B895B',    
        'sand': '#E3D5CA',     
        'lilac': '#DCD0FF',    
        'dove': '#8C8C8C',     
        'base-white': '#FAFAFA',
        'text-main': '#2d373c' // Keeping a dark slate for readable text
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'], 
      }
    },
  },
  darkMode: "class",
  plugins: [],
}