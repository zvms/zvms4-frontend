import axios from '@/plugins/axios'
import type { Response } from '@/../types'
import { ElNotification } from 'element-plus'

export async function userModifyDuration(user: string, aid: string, duration: number) {
  const result = (
    await axios({
      url: `/activities/${aid}/member/${user.toString()}/duration`,
      method: 'put',
      data: { duration }
    })
  ).data as Response<null>
  if (result.status === 'error') {
    ElNotification({
      title: `Error in modifying duration (${result.code.toString()})`,
      message: result.message,
      type: 'error'
    })
    return
  }
}

