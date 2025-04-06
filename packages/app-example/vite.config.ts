import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteProximityPrefetch } from 'vue-proximity-prefetch'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteProximityPrefetch({
      threshold: 200,
      predictionInterval: 100,
      debug: true
    })
  ],
})
