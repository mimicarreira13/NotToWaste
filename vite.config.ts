import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['nottowaste-2.onrender.com']
  },
  preview: {
    allowedHosts: ['nottowaste-2.onrender.com']
  }
})
