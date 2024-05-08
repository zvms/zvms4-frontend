import { defineStore } from "pinia";

export const useHeaderStore = defineStore("header", {
  state: () => ({
    header: 'ZVMS 4',
    base: 'ZVMS 4'
  }),
  actions: {
    setHeader(header: string) {
      // this.header = this.base + '｜' + header
      function replaceAll(str: string, find: string, replace: string) {
        return str.replace(new RegExp(find, 'g'), replace)
      }
      this.header = replaceAll(this.base, '4', '4｜' + header)
    }
  }
})
