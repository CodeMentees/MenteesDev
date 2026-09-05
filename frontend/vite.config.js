import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
          motion: ['framer-motion'],
          ui: ['flowbite', 'aos', 'react-icons'],
          utils: ['axios', 'redux', '@reduxjs/toolkit'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // Tree-shake unused code
    minify: 'esbuild',
    target: 'esnext',
  },
  // Pre-bundle heavy deps to avoid re-processing on each cold start
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'axios'],
  },
})

