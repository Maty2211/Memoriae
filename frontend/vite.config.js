import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      // proxía cualquier request que empiece con estos prefijos al backend
      "/dj-rest-auth": { target: "http://localhost:8000", changeOrigin: true },
      "/api":         { target: "http://localhost:8000", changeOrigin: true },
      "/calendario": { target: "http://localhost:8000", changeOrigin: true },
      "/to_do_list": { target: "http://localhost:8000", changeOrigin: true },
      "/flashcard": { target: "http://localhost:8000", changeOrigin: true },
      // agrega otras rutas (evento, to do, etc.)
    },
  },
});