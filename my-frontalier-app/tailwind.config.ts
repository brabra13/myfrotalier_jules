import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a202c',
        secondary: '#2d3748',
        accent: '#3182ce',
        success: {
          light: '#68d391',
          DEFAULT: '#38a169',
        },
        warning: '#ed8936',
        error: '#e53e3e',
        background: {
          DEFAULT: '#ffffff',
          secondary: '#f7fafc',
          tertiary: '#edf2f7',
        },
        text: {
          primary: '#1a202c',
          secondary: '#4a5568',
          muted: '#718096',
        },
        border: {
          light: '#f1f5f9',
          DEFAULT: '#e2e8f0',
        },
        status: {
          todo: '#ed8936',
          inprogress: '#3182ce',
          waiting: '#d69e2e',
          completed: '#38a169',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};

export default config;
