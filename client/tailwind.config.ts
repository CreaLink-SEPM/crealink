import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'loading-animation': ['TT Bluescreens', 'sans-serif'],
      'loading-animation2': ['Walecriture Regular', 'sans-serif']
    },
    extend: {

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        gray: {
          100: '#F1F1F1', // var(--white)
          200: '#BDBDBD', // var(--para-color)
        },
        blue: {
          100: '#5CADFF',
          200: '#CCE2FC',
          300: '#99C5FA',
          400: '#66A9F7',
          500: '#338CF5',
          600: '#0070F4',
          700: '#0064DA',
          800: '#0059C2',
          900: '#004391',
        },
        teal: {
          100: '#E6FFFA',
          200: '#B2F5EA',
          300: '#81E6D9',
          400: '#4FD1C5',
          500: '#3ABAB4',
          600: '#319795',
          700: '#2C7A7B',
          800: '#285E61',
          900: '#234E52',
        },
        green: {
          100: '#5CADFF',
          200: '#C5F5E5',
        },
        gradient: {
          'vertical': 'var(--gradient-vertical)',
          'horizontal': 'var(--gradient-horizontal)',
        },
        black: {
          100: '#101010',
          200: '#404040',
        },
        red: {
          100: '#F59F9F',
        }
      }
    },
  },
  plugins: [],
}
export default config
