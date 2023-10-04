import { UserLogin } from '@/api/user/auth'
import { defineStore } from 'pinia'

export const defineUserStore = defineStore('user', {
  state: () => ({
    id: 0,
    name: '',
    token: ''
  }),
  actions: {
    async setUser(user: number, password: string) {
      const result = (await UserLogin(user, password)) as {
        id: number
        name: string
        token: string
      }
      this.id = user
      this.name = result.name
      this.token = result.token
    },
    getUser() {
      return {
        id: this.id,
        name: this.name
      }
    }
  }
})
