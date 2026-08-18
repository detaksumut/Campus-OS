/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          dark: '#0f172a',
          blue: '#1e3a8a',
          accent: '#3b82f6',
        }
      }
    },
  },
  plugins: [],
}
