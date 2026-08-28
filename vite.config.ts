import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/university-admission-chatbot/',
  plugins: [react()],
  server: {
    proxy: {
      '/api/muce': {
        target: 'https://muce.edu.vn',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/muce/, '/TroLyAo'),
      },
    },
  },
})
