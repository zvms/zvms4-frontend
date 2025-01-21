import axios from '@/plugins/axios'
import type { Response, NotificationInstance } from '@/../types'
import { ElNotification } from 'element-plus'

async function createNotification(notification: NotificationInstance) {
  const result = (
    await axios('/notification', {
      method: 'post',
      data: notification
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
