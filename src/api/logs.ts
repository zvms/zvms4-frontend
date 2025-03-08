import type { ActivityInstance, Response } from '../../types'
import axios from '@/plugins/axios.ts'
import { ElNotification } from 'element-plus'
import type { Log } from '../../types/log'

export async function read(
  page: number = 1,
  perpage: number = 10,
  query: string = ''
) {
  const result = (
    await axios('/logs', {
      params: {
        mode: 'campus',
        page,
        perpage,
        query
      }
    })
  ).data as Response<Log[]> & {
    metadata: {
      size: number
    }
  }
  if (result.status === 'error') {
    ElNotification({
      title: `Error fetching log list (${result.code})`,
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
