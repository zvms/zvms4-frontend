import { createI18n } from 'vue-i18n'
import { useLocalStorage } from '@vueuse/core'
import zhCN from './locales/zh-CN.json'
import enUS from './locales/en-US.json'

export default createI18n({
  locale: useLocalStorage('locale', 'en-US').value ?? navigator.language ?? 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  },
  legacy: false
})
