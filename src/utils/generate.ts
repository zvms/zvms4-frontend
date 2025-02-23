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
export function generateActivity(
  base: Activity,
  members: ActivityMember[],
  approverStudent: string,
  registration?: Registration,
  special?: Special,
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
  if (activity.approver === 'member') {
    activity.approver = approverStudent
  }
  if (registration && base.type === 'specified') {
    ;(activity as SpecifiedActivity).registration = registration
  }
  if (special && base.type === 'special') {
    ;(activity as SpecialActivity).special = special
  }
  return activity
}
