import axios from '@/plugins/axios'
import type { ActivityInstance } from '@/../@types/activity'
import type { Response } from '@/../@types/response'
import { ElNotification } from 'element-plus'

async function getUserActivities(id: string) {
  const result = (await axios(`/user/${id}/activity`)).data as Response<ActivityInstance[]>
  if (result.status === 'error') {
    ElNotification({
      title: `获取用户义工列表失败（${result.code}）`,
      message: result.message,
      type: 'error'
    })
    return
  }
  return result.data
}

export { getUserActivities as read }
