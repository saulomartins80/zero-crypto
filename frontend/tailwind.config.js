/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // BOVINEXT Brand Colors (Verde Campo #2D5016)
        primary: {
          50: '#F0F9E6',
          100: '#E1F2CC',
          200: '#C3E599',
          300: '#A5D866',
          400: '#87CB33',
          500: '#2D5016', // Verde Campo - Cor principal
          600: '#244011',
          700: '#1B300D',
          800: '#122008',
          900: '#091004',
        },
        secondary: {
          50: '#FDF6E3',
          100: '#FAEDC7',
          200: '#F5DB8F',
          300: '#F0C957',
          400: '#EBB71F',
          500: '#8B4513', // Marrom Terra
          600: '#6F370F',
          700: '#53290B',
          800: '#371B07',
          900: '#1B0D04',
        },
        accent: {
          50: '#FFFBF0',
          100: '#FFF7E1',
          200: '#FFEFC3',
          300: '#FFE7A5',
          400: '#FFDF87',
          500: '#DAA520', // Dourado Grão
          600: '#AE841A',
          700: '#826313',
          800: '#56420D',
          900: '#2A2106',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'bovinext-gradient': 'linear-gradient(135deg, #2D5016 0%, #8B4513 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
