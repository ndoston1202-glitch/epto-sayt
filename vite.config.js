import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ikki sahifa: asosiy sayt (/) va reklama uchun ariza sahifasi (/ariza/)
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ariza: resolve(__dirname, 'ariza/index.html'),
      },
    },
  },
})
