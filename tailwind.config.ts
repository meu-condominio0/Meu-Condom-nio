import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        brand: {
          DEFAULT: '#064E3B',
          light: '#16A34A',
        },
        card: '#FFFFFF',
        neutral: {
          900: '#0F172A',
        },
        'text-muted': 'rgba(255, 255, 255, 0.72)',
      },
      transitionDuration: {
        250: '250ms',
      },
      keyframes: {
        'pulse-balance': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        'pulse-balance': 'pulse-balance 3s ease-in-out infinite',
      },
    },
  },
  plugins: [
    function ({ addVariant }: { addVariant: (name: string, fn: string) => void }) {
      addVariant('reduced-motion', '@media (prefers-reduced-motion: reduce)');
    },
  ],
} satisfies Config;
