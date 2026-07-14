import { defineStore } from 'pinia'
import { useTitle } from '@vueuse/core'

export const useHeaderStore = defineStore('header', {
  state: () => ({
    header: '义工平台',
    base: '义工平台'
  }),
  actions: {
    setHeader(header: string) {
      const newHeader = header + ' - ' + this.base
      this.header = newHeader
      const title = useTitle()
      title.value = newHeader
    },
    resetHeader() {
      this.header = this.base
      const title = useTitle()
      title.value = this.base
    }
  }
})
