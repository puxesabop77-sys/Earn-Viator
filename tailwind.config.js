/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        viator: {
          bg: '#0f172a',
          card: '#1e293b',
          primary: '#ef4444',
          accent: '#38bdf8'
        }
      }
    },
  },
  plugins: [],
}
