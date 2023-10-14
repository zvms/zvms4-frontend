import { useTitle } from "@vueuse/core";
import { defineStore } from "pinia";

export const useHeaderStore = defineStore("header", {
  state: () => ({
    header: 'ZVMS 4.1',
    base: 'ZVMS 4.1'
  }),
  actions: {
    setHeader(header: string) {
      this.header = this.base + '｜' + header
      useTitle('镇海中学义工管理系统' + ' - ' + header.replaceAll('｜', ' - '))
    }
  }
})