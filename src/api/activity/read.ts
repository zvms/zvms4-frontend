import axios from '@/plugins/axios'
import type { Response } from '@/../@types/response'
import type { ActivityInstance } from '@/../@types/activity'
import { ElNotification } from 'element-plus'

export async function getAllActivities(
  range: 'in-class' | 'campus',
  filter: {
    type: 'special' | 'specified' | 'off-campus' | 'all'
  }
) {
  const result = (
    await axios('/activity', {
      params: {
        type: filter.type,
        range
      }
    })
  ).data as Response<ActivityInstance[]>
  if (result.status === 'error') {
    ElNotification({
      title: `获取义工列表失败（${result.code}）`,
      message: result.message,
      type: 'error'
    })
    return
  }
  return result.data
}

export async function getUserActivities(id: number) {
  const result = (await axios(`/user/${id}/activity`)).data as Response<ActivityInstance[]>
  if (result.status === 'error') {
    ElNotification({
      title: `获取用户义工列表失败（${result.code}）`,
      message: result.message,
      type: 'error'
    })
    return
  }
  return result.data
}

export async function getActivity(id: string) {
  // id: ObjectId
  const result = (await axios(`/activity/${id}`)).data as Response<ActivityInstance>
  if (result.status === 'error') {
    ElNotification({
      title: `获取义工失败（${result.code}）`,
      message: result.message,
      type: 'error'
    })
    return
  }
  return result.data
}
