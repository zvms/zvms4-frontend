import axios from '@/plugins/axios'
import type { Response, ActivityInstance } from '@/../types'
import { ElNotification } from 'element-plus'

export async function getImpressions(aid: string) {
  const result = (await axios(`/activities/${aid}`)).data as Response<ActivityInstance>
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
