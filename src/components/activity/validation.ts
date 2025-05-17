import type { Activity } from '@/../types/v2'
import dayjs from 'dayjs'

export function validateActivity(
  activity: Activity,
  index: 'info' | 'member' | 'review' = 'review'
): boolean {
  if (index !== 'member') {
    if (!activity) return false
    if (!activity.name) return false
    if (!activity.date) return false
    if (!activity.approver) return false
    try {
      dayjs(activity.date)
    } catch {
      return false
    }
    if (!activity.type) return false
  }
  return true
}
