import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    noDiscovery: true,
    include: ['axios', 'lucide-react', 'react', 'react-dom/client', 'react-router-dom'],
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000' // Proxy para evitar CORS en desarrollo
    }
  }
})