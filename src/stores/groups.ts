import { defineStore } from 'pinia'
import type { Group } from '@/../types'
import api from '@/api'

export const useGroupsStore = defineStore('group', {
  state: () => ({
    groups: {} as Record<string, Group>
  }),
  actions: {
    async fetchGroup(id: string) {
      if (id in this.groups) {
        return this.groups[id]
      } else {
        const group = await api.group.readOne(id)
        if (group) {
          this.groups[id] = group
          return group
        }
      }
    }
  }
})
