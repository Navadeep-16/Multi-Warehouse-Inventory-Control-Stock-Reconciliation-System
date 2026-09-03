/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050608',
        foreground: '#F5F3EE',
        surface: {
          DEFAULT: '#0B1017',
          elevated: '#111720',
          card: '#161D2A',
        },
        border: '#1E293B',
        primary: {
          DEFAULT: '#D6A85F',
          foreground: '#050608',
        },
        secondary: {
          DEFAULT: '#64748B',
          foreground: '#F5F3EE',
        },
        accent: {
          DEFAULT: '#F0C982',
          foreground: '#050608',
        },
        muted: {
          DEFAULT: '#5A5D63',
          foreground: '#A6A9AF',
        },
        success: '#6FAF8F',
        warning: '#C89A52',
        danger: '#C86B67',
        info: '#7B93AD',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        editorial: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
    },
  },
  plugins: [],
}
