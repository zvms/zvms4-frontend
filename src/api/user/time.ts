import axios from '@/plugins/axios'
import type { Response, UserActivityTimeSums } from '@/../types'
import { ElNotification } from 'element-plus'

async function getUserTime(user: string) {
  const result = (await axios(`/users/${user}/time`)).data as Response<
    UserActivityTimeSums
  >
  if (result.status === 'error') {
    ElNotification({
      title: 'Error fetching time (' + result.code + ')',
      message: result.message,
      type: 'error'
    })
    return null
  }
  return result.data as UserActivityTimeSums
}

export { getUserTime as read }
