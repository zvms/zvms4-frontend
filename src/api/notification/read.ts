import axios from '@/plugins/axios'
import type { Response } from '@/../@types/response'
import type { BroadcastInstance } from '@/../@types/broadcast'
import { ElNotification } from 'element-plus'

async function getMyNotifications(id: string) {
  const result = (await axios(`/user/${id}/broadcast`)).data as Response<BroadcastInstance[]>
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

async function getNotifications() {
  // return [] // TODO: Write actual logics
  const result = (await axios('/broadcast')).data as Response<BroadcastInstance[]>
  if (result.status === 'error') {
    ElNotification({
      title: `获取通知列表失败（${result.code}）`,
      message: result.message,
      type: 'error'
    })
    return
  }
}

const exports = {
  mine: getMyNotifications,
  global: getNotifications
}

export { exports as read }
