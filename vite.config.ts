import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://cn.vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@utils': resolve(__dirname, 'src/modules/utils')
    }
  },
  build: {
    target: 'esnext', // or 'es2022'
    lib: {
      entry: resolve(__dirname, 'src/modules/index.ts'),
      name: 'VueBookReader',
      fileName: (format) => `vue-book-reader.${format}.js`,
      formats: ['es'] 
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
