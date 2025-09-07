import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: { port: 5173, host: true },
  plugins: [react()],
  esbuild: { jsx: 'automatic' }
});

