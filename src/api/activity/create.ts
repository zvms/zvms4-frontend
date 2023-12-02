import axios from '@/plugins/axios'
import type { Response } from '@/../@types/response'
import type {
  Activity,
  ActivityInstance,
  ActivityMember,
  Prize,
  Registration,
  Special,
} from '@/../@types/activity'
import { ElNotification } from 'element-plus'

export async function createActivity(activity: ActivityInstance) {
  const result = (
    await axios('/activity', {
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
      message: 'ID 为 ' + result.data,
      type: 'success'
    })
    return result.data
  }
}

export default createActivity

export async function createActivityWithDividedData(
  base: Activity,
  members: ActivityMember[],
  registration?: Registration,
  special?: Special,
  prize?: Prize
) {
  if (base.type === 'specified' || base.type === 'social' || base.type === 'scale') {
    special = undefined
    prize = undefined
  }
  if (base.type === 'special' || base.type === 'scale' || base.type === 'social') {
    registration = undefined
  }
  const activity = {
    ...base,
    members,
    registration,
    special: {
      ...special,
      prize
    }
  } as ActivityInstance
  await createActivity(activity)
}
