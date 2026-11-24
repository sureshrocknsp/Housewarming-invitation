/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#641E16',
          dark: '#4A140E',
          light: '#7E261D',
          deep: '#3A0E0A',
        },
        templeRed: {
          DEFAULT: '#8B1E1E',
          dark: '#681313',
          light: '#A62A2A',
        },
        turmeric: {
          DEFAULT: '#D6A437',
          light: '#F3C356',
          dark: '#B08324',
          bright: '#F5B014',
        },
        leafGreen: {
          DEFAULT: '#356B36',
          light: '#488D49',
          dark: '#244B25',
          deep: '#1A381B',
        },
        cream: {
          DEFAULT: '#FFF8E8',
          soft: '#FBF3DD',
          warm: '#F5E9CE',
          light: '#FFFCF5',
        },
        antiqueGold: {
          DEFAULT: '#B8863B',
          light: '#D4A359',
          dark: '#936625',
        },
        saffron: {
          DEFAULT: '#FF7722',
          light: '#FFA05E',
        }
      },
      fontFamily: {
        telugu: ['Noto Serif Telugu', 'serif'],
        'telugu-sans': ['Noto Sans Telugu', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        'traditional': '0 8px 30px rgba(100, 30, 22, 0.18)',
        'gold-glow': '0 0 25px rgba(214, 164, 55, 0.45)',
        'lamp-glow': '0 0 35px rgba(245, 176, 20, 0.65)',
        'royal': '0 12px 40px -10px rgba(74, 20, 14, 0.35)',
      },
      backgroundImage: {
        'kolam-pattern': "radial-gradient(#D6A437 1px, transparent 1px)",
        'gold-gradient': "linear-gradient(135deg, #F3C356 0%, #D6A437 50%, #B8863B 100%)",
        'maroon-gradient': "linear-gradient(135deg, #7E261D 0%, #641E16 50%, #4A140E 100%)",
        'royal-gradient': "linear-gradient(180deg, #4A140E 0%, #641E16 50%, #8B1E1E 100%)",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        flameFlicker: {
          '0%, 100%': { transform: 'scale(1) skewX(0deg)', filter: 'drop-shadow(0 0 8px #F5B014)' },
          '25%': { transform: 'scale(1.06, 0.95) skewX(-2deg)', filter: 'drop-shadow(0 0 12px #FF7722)' },
          '50%': { transform: 'scale(0.96, 1.05) skewX(2deg)', filter: 'drop-shadow(0 0 16px #F5B014)' },
          '75%': { transform: 'scale(1.04, 0.98) skewX(-1deg)', filter: 'drop-shadow(0 0 10px #FF9933)' },
        },
        garlandSway: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(1.2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.08)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        flame: 'flameFlicker 1.8s ease-in-out infinite',
        sway: 'garlandSway 6s ease-in-out infinite',
        glow: 'pulseGlow 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
