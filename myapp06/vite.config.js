import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// No need to import tailwindcss here

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})