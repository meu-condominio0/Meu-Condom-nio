import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    port: 5173,
    host: true,
    proxy: {
      "/api": {
        target: "http://backend_dev:8000",   // 👈 ALTERADO AQUI
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});