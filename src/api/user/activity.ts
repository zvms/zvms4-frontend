import axios from '@/plugins/axios'
import type { ActivityInstance, Response } from '@/../types'
import { ElNotification } from 'element-plus'

async function getUserActivities(
  id: string,
  page: number = 1,
  perpage: number = 10,
  query: string = ''
) {
  const result = (
    await axios(`/user/${id}/activity`, {
      method: 'get',
      params: {
        page,
        perpage,
        query
      }
    })
  ).data as Response<ActivityInstance[]> & {
    metadata: {
      size: number
    }
  }
  if (result.status === 'error') {
    ElNotification({
      title: `获取用户义工列表失败（${result.code}）`,
      message: result.message,
      type: 'error'
    })
    return
  }
  return {
    data: result.data,
    size: result.metadata.size
  }
}

export { getUserActivities as read }
