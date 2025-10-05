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
    await axios('/activities', {
      method: 'post',
      data: activity
    })
  ).data as Response<string>
  if (result.status === 'error') {
    ElNotification({
      title: 'Error creating activity (' + result.code + ')',
      message: result.message,
      type: 'error'
    })
  } else {
    ElNotification({
      title: 'Successfully created the activity',
      message: 'ID: ' + result.data,
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
