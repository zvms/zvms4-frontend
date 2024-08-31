import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import basicSsl from '@vitejs/plugin-basic-ssl'
import UnoCSS from 'unocss/vite'
import oxlint from 'unplugin-oxlint/vite'
import legacy from '@vitejs/plugin-legacy'
import vueDevtools from 'vite-plugin-vue-devtools'
import VueComponents from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { VitePWA as pwa } from 'vite-plugin-pwa'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import { vitePluginFakeServer } from 'vite-plugin-fake-server'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    legacy({
      targets: [
        'defaults',
        'not IE 11',
        'chrome 64',
        'firefox 78',
        'safari 12',
        'edge 79',
        'Android >= 8'
      ],
      polyfills: ['es.promise', 'es.symbol', 'es.string.replace-all']
    }),
    // basicSsl(),
    UnoCSS(),
    vueDevtools(),
    pwa({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Zhenhai High School Volunteer Management System 4',
        short_name: 'ZVMS',
        description: 'The Zhenhai High School Volunteer Management System 4',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: false,
        sourcemap: true
      }
    }),
    Icons({}),
    AutoImport({
      resolvers: [ElementPlusResolver(), VantResolver(), IconsResolver()]
    }),
    VueComponents({
      resolvers: [ElementPlusResolver(), VantResolver(), IconsResolver()]
    }),
    vitePluginFakeServer({
      watch: true,
      enableDev: true
    }),
  ],
  resolve: {
    alias: {
      '@/../@types': fileURLToPath(new URL('./types', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
