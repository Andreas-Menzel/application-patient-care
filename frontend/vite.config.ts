import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { version } from './package.json'

// https://vite.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version)
  },
  plugins: [
    vue(),
    tailwindcss()
  ],
  server: {
    proxy: {
        '/api': 'http://localhost:3000'
      }
  }
})
