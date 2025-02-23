import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_PUBLIC_API_URL': JSON.stringify(process.env.VITE_PUBLIC_API_URL),
  }
})
