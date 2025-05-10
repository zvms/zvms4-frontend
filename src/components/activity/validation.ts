import type { ActivityInstance } from '@/../types'
import dayjs from 'dayjs'

export function validateActivity(activity: ActivityInstance, index: 'info' | 'member' | 'review' = 'review'): boolean {
  if (index !== 'member') {
    if (!activity) return false
    if (!activity.name) return false
    if (!activity.date) return false
    if (!activity.approver && activity.type !== 'special') return false
    try {
      dayjs(activity.date)
    } catch {
      return false
    }
    if (!activity.type) return false
    if (activity.type === 'special' && !activity.special) return false
    if (activity.type === 'special' && !activity.special.classify) return false
  }
  if (index !== 'info') {
    for (const member of activity.members) {
      if (!member._id) return false
      if (!member.duration) return false
      if (member.duration < 0) return false
      if (member.duration > 30 && activity.type === 'special') return false
      if (member.duration > 18 && activity.type !== 'special') return false
      if (!member.mode) return false
    }
  }
  return true
}
