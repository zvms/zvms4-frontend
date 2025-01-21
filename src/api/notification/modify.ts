import axios from '@/plugins/axios'
import type { Response } from '@/../types'
import { ElNotification } from 'element-plus'

async function modifyNotificationTitle(id: string, title: string) {
  const result = (
    await axios(`/notification/${id}/title`, {
      method: 'put',
      data: { title }
    })
  ).data as Response<string>
  if (result.status == 'error') {
    ElNotification({
      title: 'Error when modifying notification title' + result.code,
      message: result.message,
      type: 'error'
    })
  } else {
    return result.data
  }
}

async function modifyNotificationContent(id: string, content: string) {
  const result = (
    await axios(`/notification/${id}/content`, {
      method: 'put',
      data: { content }
    })
  ).data as Response<string>
  if (result.status == 'error') {
    ElNotification({
      title: 'Error when modifying notification content' + result.code,
      message: result.message,
      type: 'error'
    })
  } else {
    return result.data
  }
}

export const modify = {
  title: modifyNotificationTitle,
  content: modifyNotificationContent
}
