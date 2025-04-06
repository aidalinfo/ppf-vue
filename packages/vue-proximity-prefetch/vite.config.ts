import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    dts({ include: ['src'] })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueProximityPrefetch',
      fileName: (format) => format === 'es' ? 'index.js' : 'index.cjs',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter'
        }
      }
    },
    emptyOutDir: true,
    sourcemap: true
  }
});