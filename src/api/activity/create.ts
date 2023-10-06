import axios from '@/plugins/axios'
import type { Response } from '@/../@types/response'
import type { ActivityCreateInstance } from '@/../@types/activity'
import { ElNotification } from 'element-plus'

export async function createActivity(activity: ActivityCreateInstance) {
  const result = (
    await axios('/activity/create', {
      method: 'post',
      data: activity,
      withCredentials: true
    })
  ).data as Response<string>
  if (result.status === 'error') {
    ElNotification({
      title: '创建义工错误（' + result.code + '）',
      message: result.message,
      type: 'error'
    })
  } else {
    ElNotification({
      title: '创建义工成功',
      message: '义工 ID 为' + result.data,
      type: 'success'
    })
    return result.data
  }
}
