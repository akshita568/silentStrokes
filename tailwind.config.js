/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-cream': '#F9F6F0', // Soft, warm off-white for main backgrounds
        'theme-yellow': '#FDF5E6', // Warm, pastel yellow for navbar and soft accents
        'theme-olive': '#7B8E61', // Pastel olive green 
        'theme-orange': '#F0A868', // Warm pastel orange for accents
        'theme-dark': '#2D2D2D', // Deep charcoal for high-contrast text/borders
      },
      boxShadow: {
        'solid': '0 12px 28px -4px rgba(45, 45, 45, 0.14), 0 6px 12px -3px rgba(45, 45, 45, 0.08)', // Soft, diffused charcoal shadow replacing harsh solid
        'soft': '0 8px 20px -3px rgba(45, 45, 45, 0.12), 0 4px 8px -2px rgba(45, 45, 45, 0.06)',
      }
    },
  },
  darkMode: "class",
  plugins: [],
}
