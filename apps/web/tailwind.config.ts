import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5B8DEF',
        primaryHover: '#4A7AD8',
        accent: '#7C5BFF',
        mint: '#5FD0B5',
        ink: '#1F2A44',
        inkMuted: '#5B6475',
        surface: '#FFFFFF',
        canvas: '#F6F7FB',
        border: '#E4E7EE',
        success: '#2EBD85',
        warning: '#F7B500',
        danger: '#F45B69',
      },
      boxShadow: {
        card: '0 10px 30px rgba(24,39,75,0.08)',
        cardHover: '0 14px 40px rgba(24,39,75,0.12)',
      },
      borderRadius: {
        xs: '6px',
        sm: '10px',
        md: '14px',
        lg: '18px',
      },
    },
  },
  plugins: [],
} satisfies Config;
