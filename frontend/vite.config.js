import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import htmlPerRoute from './vite-plugin-html-per-route.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), htmlPerRoute()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['flowbite', 'aos', 'react-icons'],
          utils: ['axios', 'redux', '@reduxjs/toolkit'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
