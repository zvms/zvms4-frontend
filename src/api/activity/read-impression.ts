import axios from '@/plugins/axios'
import type { Response, ActivityInstance, ActivityMemberHistory } from '@zvms/zvms4-types'
import { ElNotification } from 'element-plus'

export async function getImpressions(aid: string) {
  const result = (await axios(`/activity/${aid}`)).data as Response<ActivityInstance>
  if (result.status === 'error') {
    ElNotification({
      title: `Wrong in getting activity (${result.code.toString()})`,
      message: result.message,
      type: 'error'
    })
    return null
  }
  return result.data.members
}

export async function getHistory(aid: string, user: string, reverse = true) {
  const result = (await axios(`/activity/${aid}/member/${user}/history`)).data as Response<
    ActivityMemberHistory[]
  >
  if (result.status === 'error') {
    ElNotification({
      title: `Error in getting history (${result.code.toString()})`,
      message: result.message,
      type: 'error'
    })
    return null
  }
  if (reverse) {
    return result.data.reverse()
  } else {
    return result.data
  }
}
