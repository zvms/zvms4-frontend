import './assets/main.css'
import './assets/styles/element/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

import ElementPlus from 'element-plus'
import Vant from 'vant'
import CKEditor from '@ckeditor/ckeditor5-vue'

import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'vant/lib/index.css'
import 'animate.css/animate.min.css'

import { zhCn } from 'element-plus/es/locale/index.mjs'

import persistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

app.use(createPinia().use(persistedstate))
app.use(router)
app.use(i18n)
app.use(CKEditor)

app.use(ElementPlus, {
  size: 'default',
  locale: zhCn
})

app.use(Vant)

app.mount('#app')
