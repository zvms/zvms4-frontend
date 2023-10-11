import { UserLogin } from '@/api/user/auth'
import { getUser } from '@/api/user/crud'
import type { User, UserActivityTimeSums, UserPosition } from '@/../@types/user'
import { defineStore } from 'pinia'
import { getClassName } from '@/utils/getClass'
import { getUserTime } from '@/api/user/time'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: 20230616,
    name: '吴承宇',
    sex: 'male',
    position: ['admin'] as UserPosition[],
    class: '高一（6）班',
    token: '',
    isLogin: false,
    volTime: {
      largeScale: 0,
      onCampus: 0,
      offCampus: 0
    } as UserActivityTimeSums
  }),
  actions: {
    async setUser(user: number, password: string) {
      const result = await UserLogin(user, password)
      if (result) {
        const information = (await getUser(user)) as User<string>
        this.id = information?.id
        this.name = information?.name
        this.position = information?.position
        this.class = getClassName(information?.class)
        this.token = ''
        this.isLogin = true
      }
    },
    async refreshUser() {
      const result =(await getUser(this.id)) as User<string>
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
    }
  },
  persist: {
    storage: localStorage
  }
})
