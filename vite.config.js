import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sahifalar: asosiy sayt (/), reklama uchun ariza (/ariza/), Instagram mediateka (/mediateka/)
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ariza: resolve(__dirname, 'ariza/index.html'),
        mediateka: resolve(__dirname, 'mediateka/index.html'),
      },
    },
  },
})
