import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/login': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/logout': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/callback': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
    },
  },
})
