import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { version } from './package.json'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version)
  },
  plugins: [
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      'shared': path.resolve(__dirname, '../shared/index.ts')
    }
  },
  server: {
    proxy: {
        '/api': 'http://localhost:3000'
      }
  }
})
