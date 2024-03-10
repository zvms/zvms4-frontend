import axios from '@/plugins/axios'
import type { Response } from '@zvms/zvms4-types'
import { ElNotification } from 'element-plus'

async function deleteNotification(id: string) {
  const result = (
    await axios(`/notification/${id}`, {
      method: 'delete'
    })
  ).data as Response<string>
  if (result.status == 'error') {
    ElNotification({
      title: '删除通知错误（' + result.code + '）',
      message: result.message,
      type: 'error'
    })
  }
}

export { deleteNotification as delete }
