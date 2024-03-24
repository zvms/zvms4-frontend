import axios from '@/plugins/axios'
import type { Response, NotificationInstance } from '@zvms/zvms4-types'
import { ElNotification } from 'element-plus'

async function modifyNotification(notification: NotificationInstance, id: string) {
  const result = (
    await axios(`/notification/${id}`, {
      method: 'put',
      data: {notification}
    })
  ).data as Response<string>
  if (result.status == 'error') {
    ElNotification({
      title: 'Error when modifying notification' + result.code,
      message: result.message,
      type: 'error'
    })
  } else {
    return result.data
  }
}

async function modifyNotificationTitle(title: string, id: string) {
  const result = (
    await axios(`/notification/${id}/title`, {
      method: 'put',
      data: {title}
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

async function modifyNotificationContent(content: string, id: string) {
  const result = (
    await axios(`/notification/${id}/content`, {
      method: 'put',
      data: {content}
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
  content: modifyNotificationContent,
}
