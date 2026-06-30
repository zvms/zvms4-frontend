import { createI18n } from 'vue-i18n'
import { zhCN } from './locales'

export default createI18n({
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN
  },
  legacy: false
})
