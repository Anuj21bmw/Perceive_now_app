/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        perceive: {
          purple: '#3F1470',
          gold: '#FFA301',
          'purple-light': '#5A1F8A',
          'purple-dark': '#2D0F52',
          'gold-light': '#FFB533',
          'gold-dark': '#CC8201',
        },
        dark: {
          bg: '#0F0F0F',
          surface: '#1A1A1A',
          'surface-elevated': '#2A2A2A',
          border: '#333333',
          text: '#E5E5E5',
          'text-secondary': '#B3B3B3',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
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
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
