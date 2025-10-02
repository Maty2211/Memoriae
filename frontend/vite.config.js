import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite para Single Page Application (SPA)
export default defineConfig({
  plugins: [react()],
  
  // 1. Fuerza la ruta base a la ubicación actual (./) para evitar errores 404 de enrutamiento.
  //base: './', 

  server: {
    port: 3000, // Aseguramos que se use el puerto 3000
    // 2. Configuración para SPA: si la ruta no existe, sirve el index.html (esto debería evitar el 404).
    historyApiFallback: true, 

    // 3. Proxy para redirigir las llamadas de la API a Django (puerto 8000).
    proxy: {
      '/pomodoro': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
      // Proxy general para otras APIs de Django
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})