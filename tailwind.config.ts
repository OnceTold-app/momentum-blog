import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#E8EDEC',
          100: '#C5DCD8',
          500: '#223C37',
          600: '#1A2E2A',
          700: '#12201E',
        },
        gold: {
          300: '#D4D0C3',
          400: '#C5C0AF',
          500: '#B6B2A3',
          600: '#9E9A8C',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Open Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
