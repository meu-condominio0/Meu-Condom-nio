import path from "path"  // <-- ADICIONE ESTA LINHA
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  esbuild: { jsx: 'automatic' },
  
  // --- ADICIONE ESTE BLOCO INTEIRO ---
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  // ------------------------------------
});