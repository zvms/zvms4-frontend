import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import vueDevtools from 'vite-plugin-vue-devtools'
import VueComponents from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    legacy(),
    vueDevtools(),
    AutoImport({
      resolvers: [ElementPlusResolver(), VantResolver()]
    }),
    VueComponents({
      resolvers: [ElementPlusResolver(), VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [require('autoprefixer'), require('tailwindcss')]
    }
  }
})
