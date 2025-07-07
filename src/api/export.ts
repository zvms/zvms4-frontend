import type { Response } from '@/../types'
import { ElNotification } from 'element-plus'
import type { UserActivityTimeSums } from 'types/user.v2'
import axios from '@/plugins/axios.ts'

export * as activity from './activity'
export * as user from './user'
export * as group from './group'
export * as exports from './exports'
export * as logs from './logs'
export const time = {
  async reads(search: string = '', page: number = 1, perpage: number = 5, sort: string = 'id', asc: boolean = true) {
    const result = (
      await axios(`/v2/times`, {
        params: {
          search,
          page,
          perpage,
          sort,
          asc
        }
      })
    ).data as Response<{
      _id: string
      name: string
      id: string
      'on-campus': number
      'off-campus': number
      'social-practice': number
    }> & {
      metadata: {
        size: number
      }
    }
    if (result.status === 'error') {
      ElNotification({
        title: 'Error when fetching data (' + result.code + ')',
        message: result.message,
        type: 'error'
      })
      return
    }
    return {
      time: result.data,
      size: result.metadata.size
    }
  }
}
