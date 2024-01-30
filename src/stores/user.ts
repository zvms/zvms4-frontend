import api from '@/api'
import type { User, UserActivityTimeSums, UserPosition } from '@zvms/zvms4-types'
import { defineStore } from 'pinia'
import { getUserClassName } from '@/utils/getClass'
import { usePreferredLanguages } from '@vueuse/core'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: 0,
    _id: '65577f940238690a167beb5e',
    name: '',
    sex: 'male',
    position: ['admin'] as UserPosition[],
    class: '',
    token: '',
    code: 0,
    isLogin: true,
    time: {
      largeScale: 1919,
      onCampus: 114,
      offCampus: 514
    } as UserActivityTimeSums,
    language: usePreferredLanguages().value[0]
  }),
  actions: {
    async setUser(user: string, password: string) {
      const result = await api.user.auth.useLongTermAuth(user, password)
      if (result) {
        const information = (await api.user.readOne(user)) as User
        this._id = information?._id
        this.id = information?.id
        this.name = information?.name
        this.position = information?.position
        this.class = getUserClassName(information.id, information.code)
        this.token = ''
        this.code = information.code
        this.isLogin = true
      }
    },
    async refreshUser() {
      const result = (await api.user.readOne(this._id)) as User
      this._id = result._id
      this.id = result.id
      this.name = result.name
      this.position = result.position
      this.class = getUserClassName(result.id, result.code)
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
      const result = (await api.user.time.read(this._id)) as UserActivityTimeSums
      this.time.offCampus = result.offCampus
      this.time.onCampus = result.onCampus
      this.time.largeScale = result.largeScale
    },
    async setLanguage(language: string) {
      this.language = language
    }
  },
  persist: {
    storage: localStorage
  }
})
