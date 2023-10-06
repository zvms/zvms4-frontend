import axios from '@/plugins/axios'
import type { Response } from '@/../@types/response'
import type { UserActivityTimeSums } from '@/../@types/user'
import { ElNotification } from 'element-plus'

export async function getUserTime(user: number) {
  const result = (await axios(`/user/${user}/time`, {
    withCredentials: true
  })) as Response<UserActivityTimeSums>
  if (result.status === 'error') {
    ElNotification({
      title: '获取用户时间错误（' + result.code + '）',
      message: result.message,
      type: 'error'
    })
    return null
  }
  return result.data
}
