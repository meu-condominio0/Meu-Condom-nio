import type { Config } from 'tailwindcss';

const config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0F3D2E',
          800: '#145943',
          accent: '#20C997',
        },
        ink: {
          title: '#111111',
          body: '#374151',
          muted: '#6B7280',
        },
        bg: {
          base: '#FFFFFF',
          soft: '#F6F7F8',
        },
        border: {
          soft: 'rgba(17,17,17,0.08)',
        },
      },
      borderRadius: {
        xl: '16px',
      },
      boxShadow: {
        e2: '0 1px 2px rgba(0,0,0,0.06)',
        e4: '0 8px 24px rgba(0,0,0,0.08)',
      },
      spacing: {
        2: '8px',
        4: '16px',
        6: '24px',
        8: '32px',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'SF Pro',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
