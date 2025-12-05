/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDF5F3',
          100: '#FAEAE6',
          200: '#F5D5CD',
          300: '#EABFB4',
          400: '#DFA99B',
          500: '#D4745E', // Main terracotta
          600: '#C15D47',
          700: '#A04A38',
          800: '#7F3A2C',
          900: '#5E2B21',
        },
        secondary: {
          50: '#F0F5F5',
          100: '#E1EBEB',
          200: '#C3D7D6',
          300: '#A5C3C2',
          400: '#87AFAD',
          500: '#2C5F5D', // Deep teal
          600: '#234C4A',
          700: '#1B3938',
          800: '#122625',
          900: '#0A1313',
        },
        accent: {
          50: '#FDFBF7',
          100: '#FBF7EF',
          200: '#F7EFDF',
          300: '#F3E7CF',
          400: '#EFDFBF',
          500: '#D4AF37', // Gold
          600: '#C09B2C',
          700: '#9D7E23',
          800: '#7A611B',
          900: '#574412',
        },
        cream: '#FAF7F2',
        charcoal: '#2D2D2D',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'], // Elegant headings
        body: ['Lora', 'serif'], // Readable body text
        sans: ['Montserrat', 'sans-serif'], // Modern accents
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
