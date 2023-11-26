import { createI18n } from 'vue-i18n'
import { useLocalStorage } from '@vueuse/core'
import { zhCN, enUS, zhTW, jaJP, koKR, ruRU, frFR } from './locales'

export default createI18n({
  locale: useLocalStorage('locale', 'en-US').value ?? navigator.language ?? 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
    'zh-TW': zhTW,
    'ja-JP': jaJP,
    'ko-KR': koKR,
    'ru-RU': ruRU,
    'fr-FR': frFR
  },
  legacy: false
})
