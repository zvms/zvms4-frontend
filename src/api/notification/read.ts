import axios from '@/plugins/axios'
import type { Response, NotificationInstance } from '@zvms/zvms4-types'
import { ElNotification } from 'element-plus'

async function getMyNotifications(id: string, page: number = 1, perpage: number = 10) {
  const result = (
    await axios(`/user/${id}/notification`, {
      method: 'GET',
      params: {
        page,
        perpage
      }
    })
  ).data as Response<NotificationInstance[]> & {
    metadata: {
      size: number
    }
  }
  if (result.status === 'error') {
    ElNotification({
      title: `获取用户通知列表失败（${result.code}）`,
      message: result.message,
      type: 'error'
    })
    throw new Error(result.message)
  }
  return {
    data: result.data,
    total: result.metadata.size
  }
}

async function getNotifications(page: number = 1, perpage: number = 10) {
  const result = (
    await axios('/notification', {
      method: 'GET',
      params: {
        page,
        perpage
      }
    })
  ).data as Response<NotificationInstance[]> & {
    metadata: {
      size: number
    }
  }
  if (result.status === 'error') {
    ElNotification({
      title: `获取通知列表失败（${result.code}）`,
      message: result.message,
      type: 'error'
    })
    throw new Error(result.message)
  }
  return {
    data: result.data,
    total: result.metadata.size
  }
}

async function getSpecificNotification(id: string) {
  const result = (await axios(`/notification/${id}`)).data as Response<NotificationInstance>
  return result
}

const exports = {
  mine: getMyNotifications,
  global: getNotifications
}

export { exports as read, getSpecificNotification as readOne }
