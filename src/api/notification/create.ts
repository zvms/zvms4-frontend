import axios from '@/plugins/axios'
import type { Response } from '@/../@types/response'
import type { BroadcastInstance } from '@/../@types/broadcast'
import { ElNotification } from 'element-plus'

async function createNotification(notification: BroadcastInstance) {
  const result = (
    await axios('notifications/create', {
      method: 'post',
      data: notification,
      withCredentials: true
    })
  ).data as Response<string>
  if (result.status == 'error') {
    ElNotification({
      title: '创建通知错误（' + result.code + '）',
      message: result.message,
      type: 'error'
    })
  } else {
    return result.data
  }
}

export { createNotification as create }
