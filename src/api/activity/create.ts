import axios from '@/plugins/axios'
import { generateActivity } from '@/utils/generate'
import type {
  Response,
  Activity,
  ActivityInstance,
  ActivityMember,
  Registration,
  Special
} from '@/../types'
import { ElNotification, dayjs } from 'element-plus'

export async function createActivity(activity: ActivityInstance) {
  /// @ts-ignore
  delete activity._id
  activity.date = dayjs(activity.date).toISOString()
  const result = (
    await axios('/activity', {
      method: 'post',
      data: activity
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
  approveStudent?: string,
) {
  const activity = generateActivity(base, members, approveStudent ?? '', registration, special, true)
  if (activity !== null) {
    await createActivity(activity)
  }
}
