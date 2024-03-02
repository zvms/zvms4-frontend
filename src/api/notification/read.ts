import axios from '@/plugins/axios'
import type { Response, NotificationInstance } from '@zvms/zvms4-types'
import { ElNotification } from 'element-plus'
import dayjs from 'dayjs'

function sortNotifications(li: NotificationInstance[]): NotificationInstance[] {
  return li.sort((a, b) =>
    dayjs(a.time, 'YYYY-MM-DD HH:mm:ss').isBefore(dayjs(b.time, 'YYYY-MM-DD HH:mm:ss')) ? 1 : -1
  )
}

async function getMyNotifications(id: string) {
  const result = (await axios(`/user/${id}/notification`)).data as Response<NotificationInstance[]>
  if (result.status === 'error') {
    ElNotification({
      title: `获取用户通知列表失败（${result.code}）`,
      message: result.message,
      type: 'error'
    })
    return
  }
  return sortNotifications(result.data)
}

async function getNotifications() {
  const result = (await axios('/notification', {
    withCredentials: false
  })).data as Response<NotificationInstance[]>
  if (result.status === 'error') {
    ElNotification({
      title: `获取通知列表失败（${result.code}）`,
      message: result.message,
      type: 'error'
    })
    return
  }
  return sortNotifications(result.data)
}

const exports = {
  mine: getMyNotifications,
  global: getNotifications
}

export { exports as read }
