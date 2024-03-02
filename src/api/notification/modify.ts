import axios from '@/plugins/axios'
import type { Response, NotificationInstance } from '@zvms/zvms4-types'
import { ElNotification } from 'element-plus'

async function modifyNotification(notification: NotificationInstance, id: string) {
  console.log(notification)
  const result = (
    await axios(`/notification/${id}`, {
      method: 'put',
      data: notification
    })
  ).data as Response<string>
  if (result.status == 'error') {
    ElNotification({
      title: '修改通知错误（' + result.code + '）',
      message: result.message,
      type: 'error'
    })
  } else {
    return result.data
  }
}

export { modifyNotification as modify }
