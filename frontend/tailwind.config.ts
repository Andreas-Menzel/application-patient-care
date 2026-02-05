import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          primary: colors.white,       // Main backgrounds
          secondary: colors.gray[200], // Card headers/sections
          card: colors.white,          // Card bodies
        },
        outline: {
          DEFAULT: colors.gray[300],   // Standard borders
        },
        content: {
          main: colors.black,          // Primary text
          muted: colors.gray[500],     // Secondary text
        },

        brand: {
          DEFAULT: '#091478',
          foreground: colors.white,
          100: '#091478',
          90: '#222C86',
          80: '#3A4393',
          70: '#535BA1',
          60: '#6B72AE',
          50: '#848ABC',
          40: '#9DA1C9',
          30: '#B5B9D7',
          20: '#CED0E4',
          10: '#E6E8F2',
          
          soft: '#CED0E4', // e.g., bubble bg
        }
      },

      borderRadius: {
        'container': '1.5rem',
        'card': '1rem',
        'element': '0.75rem',
      },

      maxWidth: {
        '300': '75rem',
      }
    },
  },
  plugins: [],
} satisfies Config