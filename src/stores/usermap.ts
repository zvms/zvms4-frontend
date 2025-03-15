import { defineStore } from 'pinia'
import type { User } from '@/../types'

export const useUserMapStore = defineStore('userMap', {
  state: () => ({
    users: [] as User[]
  }),
  actions: {
    async fetchUserMap() {
      return null
    },
    async queryUser(uid: string) {
      return null
  }
})
