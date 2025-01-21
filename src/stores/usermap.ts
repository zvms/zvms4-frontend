import { defineStore } from 'pinia'
import type { User, Response } from '@/../types'
import axios from '@/plugins/axios'
import { ElNotification } from 'element-plus'
import api from '@/api'

export const useUserMapStore = defineStore('userMap', {
  state: () => ({
    users: [] as User[]
  }),
  actions: {
    async fetchUserMap() {
      const response = await axios('/user')
      const result = response.data as Response<User[]>
      if (result.status === 'ok') {
        this.users = result.data
      } else {
        ElNotification({
          title: 'Fetch User Error',
          type: 'error'
        })
      }
    },
    async queryUser(uid: string) {
      const resultInState = this.users.find((user) => user._id === uid)
      if (!resultInState) {
        const result = await api.user.readOne(uid)
        if (!result) {
          ElNotification({
            title: 'Fetch User Error',
            type: 'error'
          })
          return null
        }
        return result
      }
      return resultInState
    }
  }
})
