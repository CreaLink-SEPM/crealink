import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      title: ['Montserrat', 'sans-serif'],
      body: ['Montserrat', 'sans-serif'],
      heading: ['Montserrat', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors: {
        gray: {
          100: '#999999',
        },
        black: {
          100: '#000000',
        },
        red: {
          100: '#A20103',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-scoped-groups')({
      groups: ['one', 'two'],
    }),
  ],
};
export default config;
