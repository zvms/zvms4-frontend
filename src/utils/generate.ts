import type { Activity, ActivityMember, Registration, Special, ActivityInstance } from '@zvms/zvms4-types'
export function generateActivity(
  base: Activity,
  members: ActivityMember[],
  registration?: Registration,
  special?: Special,
  prize?: string
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
  return activity
}
