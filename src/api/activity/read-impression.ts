import axios from '@/plugins/axios'
import type { Response, ActivityMember } from '@zvms/zvms4-types'
import { ElNotification } from 'element-plus'

export async function getImpressions(aid: string) {
  const result = (await axios(`/activity/${aid}/impression`)).data as Response<ActivityMember[]>
  if (result.status === 'error') {
    ElNotification({
      title: `获取感想列表失败（${result.code.toString()}）`,
      message: result.message,
      type: 'error'
    })
    return null
  }
  return result.data
}
