import { UserLogin } from '@/api/user/auth'
import { getUser } from '@/api/user/crud'
import type { User, UserActivityTimeSums, UserPosition } from '@/../@types/user'
import { defineStore } from 'pinia'
import { getClassName } from '@/utils/getClass'
import { getUserTime } from '@/api/user/time'
import { usePreferredLanguages } from '@vueuse/core'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: 20230616,
    _id: '60c9b1b0e6b3a3b4b8b0b0b0',
    name: '吴承宇',
    sex: 'male',
    position: ['admin', 'auditor'] as UserPosition[],
    class: '高一（6）班',
    token: '',
    isLogin: true,
    volTime: {
      largeScale: 1919,
      onCampus: 114,
      offCampus: 514
    } as UserActivityTimeSums,
    language: usePreferredLanguages().value[0]
  }),
  actions: {
    async setUser(user: number, password: string) {
      const result = await UserLogin(user, password)
      if (result) {
        const information = (await getUser(user)) as User<string>
        this._id = information?._id
        this.id = user
        this.name = information?.name
        this.position = information?.position
        this.class = getClassName(information?.class)
        this.token = ''
        this.isLogin = true
      }
    },
    async refreshUser() {
      const result = (await getUser(this.id)) as User<string>
      this._id = result._id
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
      this.id = 0
      this.name = ''
      this.token = ''
      this.isLogin = false
    },
    async getUserActivityTime() {
      const result = (await getUserTime(this.id)) as UserActivityTimeSums
      this.volTime.offCampus = result.offCampus
      this.volTime.onCampus = result.onCampus
      this.volTime.largeScale = result.largeScale
    },
    async setLanguage(language: string) {
      this.language = language
    }
  },
  persist: {
    storage: localStorage
  }
})
