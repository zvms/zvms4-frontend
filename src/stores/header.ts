import { defineStore } from 'pinia'
import { useTitle } from '@vueuse/core'

export const useHeaderStore = defineStore('header', {
  state: () => ({
    header: 'ZVMS 4',
    base: 'ZVMS 4'
  }),
  actions: {
    setHeader(header: string) {
      const newHeader = header + ' - ' + this.base
      this.header = newHeader
      const title = useTitle()
      title.value = newHeader
    }
  }
})
