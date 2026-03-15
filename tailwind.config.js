/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        google: {
          blue: '#4285F4',
          red: '#EA4335',
          yellow: '#FBBC05',
          green: '#34A853',
        },
        brand: {
          blue: '#E8F0FE',
          green: '#CEEAD6',
          yellow: '#FEF7E0',
          pink: '#FCE8E6',
          slate: '#202124',
        }
      },
      boxShadow: {
        'brutalist': '6px 6px 0px rgba(32,33,36,1)',
        'brutalist-hover': '2px 2px 0px rgba(32,33,36,1)',
      }
    },
  },
  plugins: [],
}
