import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/homedata': {
        target: 'http://127.0.0.1:5000/',
        changeOrigin: true,
        secure: true,
        ws: true
      },
      '/boxscore': {
        target: 'http://127.0.0.1:5000/',
        changeOrigin: true,
        secure: true,
        ws: true
      },
      '/gamecount': {
        target: 'http://127.0.0.1:5000/',
        changeOrigin: true,
        secure: true,
        ws: true
      },
    },
  },
})