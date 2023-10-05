import { UserLogin, UserLogout } from '@/api/user/auth'
import { getUser, handlerUserInformation } from '@/api/user/crud'
import type { UserActivityTimeSums, UserPosition } from '@/../@types/user'
import { defineStore } from 'pinia'
import { getClassName } from '@/utils/getClass'
import { getUserTime } from '@/api/user/time'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: 0,
    name: '',
    sex: 'male',
    position: [] as UserPosition[],
    class: '',
    token: '',
    isLogin: false,
    volTime: {
      specified: 0,
      special: 0,
      offCampus: 0
    } as UserActivityTimeSums
  }),
  actions: {
    async setUser(user: number, password: string) {
      const result = await UserLogin(user, password)
      if (result.errorn === 1) {
        console.log(result.data)
        const information = handlerUserInformation(user, result.data)
        this.id = information.id
        this.name = information.name
        this.position = information.position
        this.class = getClassName(information.class)
        this.token = ''
        this.isLogin = true
      }
    },
    async refreshUser() {
      const result = await getUser(this.id)
      this.id = result.id
      this.name = result.name
      this.position = result.position
      this.class = getClassName(result.class)
      this.token = ''
      this.isLogin = true
    },
    getUser() {
      return {
        id: this.id,
        name: this.name
      }
    },
    async removeUser() {
      await UserLogout()
      this.id = 0
      this.name = ''
      this.token = ''
      this.isLogin = false
    },
    async getUserActivityTime() {
      const result = await getUserTime(this.id)
      this.volTime.offCampus = result.offCampus
      this.volTime.special = result.special
      this.volTime.specified = result.specified
    }
  },
  persist: {
    storage: localStorage
  }
})
