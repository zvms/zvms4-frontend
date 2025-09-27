import { createI18n } from 'vue-i18n'
import { useLocalStorage } from '@vueuse/core'
import { zhCN, enUS } from './locales'

export default createI18n({
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  },
  legacy: false
})
