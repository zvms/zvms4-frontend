import { defineStore } from "pinia";

export const useHeaderStore = defineStore("header", {
  state: () => ({
    header: 'ZVMS 4',
    base: 'ZVMS 4'
  }),
  actions: {
    setHeader(header: string) {
      this.header = 'ZVMS 4' + header
    },
    setBase(base: string) {
      this.base = base
    }
  }
})
