import axios from '@/plugins/axios'
import type { Response, UserActivityTimeSums } from '@/../types'
import { ElNotification } from 'element-plus'
import type { ActivityMember } from 'types/activity.v2'

async function getUserTime(user: string) {
  return (await axios(`/v2/users/${user}/time`)).data as {
    'on-campus': number
    'off-campus': number
    'social-practice': number
  }
}

export interface UserActivityTimePercentile {
  value: number
  group: number
  grade: number
}

async function getUserTimePercentile(user: string) {
  return (await axios(`/v2/users/${user}/time_statistics`)).data as Record<
    ActivityMember['mode'],
    UserActivityTimePercentile
  >
}

export { getUserTime as read, getUserTimePercentile as percentile }
