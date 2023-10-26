import { createI18n } from 'vue-i18n'
import { useLocalStorage } from '@vueuse/core'

export default createI18n({
  locale: useLocalStorage('locale', 'en-US').value ?? navigator.language ?? 'en-US',
  fallbackLocale: 'en-US'
})
