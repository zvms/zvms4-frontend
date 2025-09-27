import type {
  Activity,
  ActivityMember,
  Registration,
  Special,
  ActivityInstance,
} from '@/../types'
import { ElMessage } from 'element-plus'
export function generateActivity(
  base: Activity,
  members: ActivityMember[],
  approverStudent?: string,
  registration?: Registration,
  special?: Special,
  submitting: boolean = false
) {
  const activity = {
    ...base,
    members
  } as ActivityInstance
  if (!activity.approver || activity.approver === 'member') {
    activity.approver = approverStudent ?? 'member'
  }
  return activity
}
