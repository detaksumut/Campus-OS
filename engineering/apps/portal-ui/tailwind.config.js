/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/presentation-react/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',    // Dark blue/slate for sidebar
          primary: '#1d4ed8', // Campus OS blue
          accent: '#3b82f6',  // Lighter blue for active states
          bg: '#f8fafc',      // Very light slate for dashboard background
        }
      }
    },
  },
  plugins: [],
}
