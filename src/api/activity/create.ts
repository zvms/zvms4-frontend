import axios from '@/plugins/axios'
import type { Activity } from '@/../types/v2'
import { dayjs } from 'element-plus'

export async function createActivity(activity: Activity) {
  /// @ts-ignore
  delete activity._id
  activity.date = dayjs(activity.date).toISOString()
  const result = (
    await axios('/v2/activities', {
      method: 'post',
      data: activity
    })
  ).data as {
    id: string
  }
  return result.id
}

export default createActivity
