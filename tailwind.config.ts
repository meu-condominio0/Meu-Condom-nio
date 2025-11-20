import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Design system: cores principais, tipografia e tokens compartilhados.
      colors: {
        brand: {
          primary: '#39FF14', // Verde neon inspirado no logo.
          secondary: '#0FA958', // Verde mais escuro para CTAs.
          glow: '#6BFF8A',
        },
        background: {
          base: '#0C0F14',
          muted: '#111827',
          soft: '#F8FAFC',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F1F5F9',
          border: '#E2E8F0',
        },
        state: {
          success: '#22C55E',
          error: '#EF4444',
          warning: '#F59E0B',
          info: '#3B82F6',
        },
        text: {
          DEFAULT: '#E5E7EB',
          muted: '#9CA3AF',
          strong: '#FFFFFF',
          dark: '#0B0C0F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
      },
      spacing: {
        'space-2': '0.5rem',
        'space-3': '0.75rem',
        'space-4': '1rem',
        'space-6': '1.5rem',
        'space-8': '2rem',
      },
      borderRadius: {
        button: '12px',
        card: '16px',
        pill: '9999px',
      },
      boxShadow: {
        soft: '0 18px 40px rgba(15, 23, 42, 0.14)',
        glow: '0 0 0 2px rgba(57, 255, 20, 0.35)',
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
