import axios from '@/plugins/axios'
import type { Response, ActivityInstance, ActivityMemberHistory } from '@zvms/zvms4-types'
import { ElNotification } from 'element-plus'

export async function getImpressions(aid: string) {
  const result = (await axios(`/activity/${aid}`)).data as Response<ActivityInstance>
  if (result.status === 'error') {
    ElNotification({
      title: `获取感想列表失败（${result.code.toString()}）`,
      message: result.message,
      type: 'error'
    })
    return null
  }
  return result.data.members
}

export async function getHistory(aid: string, user: string) {
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
  return result.data
}
