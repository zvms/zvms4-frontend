import type {
  Activity,
  ActivityMember,
  Registration,
  Special,
  ActivityInstance,
  Trophy,
  SpecialActivity,
  SpecifiedActivity
} from '@/../types'
import dayjs from 'dayjs'
import { ElNotification } from 'element-plus'
export function generateActivity(
  base: Activity,
  members: ActivityMember[],
  approverStudent?: string,
  registration?: Registration,
  special?: Special,
  submitting: boolean = false
) {
  if (base.type === 'specified' || base.type === 'social' || base.type === 'scale') {
    special = undefined
  }
  if (base.type === 'special' || base.type === 'scale' || base.type === 'social') {
    registration = undefined
  }
  const activity = {
    ...base,
    members
  } as ActivityInstance
  if (activity.approver && activity.approver === 'member') {
    if (!approverStudent && submitting) {
      ElNotification({
        title: 'Student-approved activities should indicate the approver.',
        type: 'error',
      })
      return null
    }
    activity.approver = approverStudent ?? ''
  }
  if (registration && base.type === 'specified') {
    ;(activity as SpecifiedActivity).registration = registration
  }
  if (special && base.type === 'special') {
    ;(activity as SpecialActivity).special = special
  }
  return activity
}
