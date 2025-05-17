import axios from '@/plugins/axios'
import type { Response, UserActivityTimeSums } from '@/../types'
import { ElNotification } from 'element-plus'

async function getUserTime(user: string) {
  return (await axios(`/v2/users/${user}/time`)).data as UserActivityTimeSums
}

export { getUserTime as read }
