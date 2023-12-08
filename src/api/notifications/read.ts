import axios from '@/plugins/axios'
import type { Response } from '@/../@types/response'
import type { Broadcast } from '@/../@types/broadcast'
import { ElNotification } from 'element-plus'

export async function getMyNotifications(id: string) {
  const result = (await axios(`/user/${id}/broadcast`)).data as Response<Broadcast[]>
  if (result.status === 'error') {
    ElNotification({
      title: `获取用户通知列表失败（${result.code}）`,
      message: result.message,
      type: 'error'
    })
    return
  }
  return result.data
}

export async function getNotifications() {
  return [] // TODO: Write actual logics
}
