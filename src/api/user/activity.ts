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
    await axios(`/users/${id}/activities`, {
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
      title: `Error in getting activity list (${result.code})`,
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
