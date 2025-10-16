import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/dj-rest-auth": { target: "http://localhost:8000", changeOrigin: true },
      "/api":         { target: "http://localhost:8000", changeOrigin: true },
      "/calendario": { target: "http://localhost:8000", changeOrigin: true },
      "/to_do_list": { target: "http://localhost:8000", changeOrigin: true },
      "/pomodoro": {target: 'http://localhost:8000', changeOrigin: true,},
      "/flashcard": { target: "http://localhost:8000", changeOrigin: true },
    },
    preview: {
      host: '0.0.0.0',
      port: 8080,
      strictPort: true,
      allowedHosts: ['.up.railway.app']
    }
  },
});