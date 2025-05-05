import api from '@/api'
import type { User, UserActivityTimeSums, UserPosition } from '@/../types'
import { defineStore } from 'pinia'
import { usePreferredLanguages } from '@vueuse/core'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { getUserPositions } from '@/utils/groupPosition'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: 0,
    _id: '',
    name: '',
    position: [] as UserPosition[],
    groups: [] as string[],
    class_id: '',
    isLogin: false,
    shouldResetPassword: false,
    time: {
      socialPractice: 0,
      onCampus: 0,
      offCampus: 0
    } as UserActivityTimeSums,
    language: usePreferredLanguages().value[0]
  }),
  actions: {
    async getUserClassId(groups: string[]) {
      const result = await Promise.all(groups.map((group) => api.group.readOne(group)))
      const group = result.find((group) => group?.type === 'class')
      if (group) {
        this.class_id = group._id
      }
    },
    async setUserInformation(user: User) {
      this._id = user._id
      this.id = user.id
      this.name = user.name
      this.groups = user.group
      await this.getUserClassId(user.group)
      this.position = await getUserPositions(user)
    },
    async setUser(user: string, password: string) {
      const strongPasswordValidator = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$'
      )
      const result = await api.user.auth.useLongTermAuth(user, password)
      if (result) {
        const information = (await api.user.readOne(user)) as User
        await this.setUserInformation(information)
        if (!strongPasswordValidator.test(password)) {
          this.shouldResetPassword = true
        }
        this.isLogin = true
      }
    },
    async refreshUser() {
      const result = (await api.user.readOne(this._id)) as User
      await this.setUserInformation(result)
    },
    getUser() {
      return {
        id: this.id,
        name: this.name
      }
    },
    async removeUser() {
      this._id = ''
      this.id = 0
      this.name = ''
      this.groups = []
      this.isLogin = false
    },
    async getUserActivityTime() {
      const result = (await api.user.time.read(this._id)) as UserActivityTimeSums
      this.time.offCampus = result.offCampus
      this.time.onCampus = result.onCampus
      this.time.socialPractice = result.socialPractice
    },
    setLanguage(language: string) {
      this.language = language
    },
    async resetPassword(token: string, newPassword: string) {
      const result = await api.user.password.put(this._id, newPassword, token)
      if (!result) {
        ElNotification({
          title: 'Error when resetting password',
          message: 'Please try again later',
          type: 'error'
        })
      }
      ElNotification({
        title: 'Password reset successfully',
        message: 'Please login again',
        type: 'success'
      })
      await this.removeUser()
      this.shouldResetPassword = false
      const router = useRouter()
      await router.push('/user/login')
    },
    setTime(time: UserActivityTimeSums) {
      this.time.onCampus = time.onCampus
      this.time.offCampus = time.offCampus
      this.time.socialPractice = time.socialPractice
    },
    relatedGroup(group: string): boolean {
      console.log(this.position)
      if (this.position.includes('admin') || this.position.includes('department')) {
        return true
      } else if (this.position.includes('secretary')) {
        return group === this.class_id
      } else return false
    }
  },
  persist: {
    storage: localStorage
  }
})
