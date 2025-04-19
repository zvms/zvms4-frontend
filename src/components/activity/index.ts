import type { UserPosition, ActivityType, CreateActivityType } from '@/../types'
import { pad } from '@/plugins/ua.ts'

export { default as ZActivityCreate } from './ZActivityCreate.vue'
export { default as ZActivityDetails } from './ZActivityDetails.vue'
export { default as ZActivityList } from './ZActivityList.vue'
export { default as ZActivityMember } from './ZActivityMember.vue'
export { default as ZActivityMemberTimeJudge } from './ZTimeJudge.vue'
export { default as ZActivityCard } from './ZActivityCard.vue'
export { default as ZActivityMemberList } from './ZActivityMemberList.vue'
export { default as ZActivityPage } from './ZActivityPage.vue'
export { default as ZUserTimeJudge } from './ZUserTimeJudge.vue'
export { default as ZUploadFile } from './ZUploadFile.vue'
export function permissions(positions: UserPosition[]) {
  function upperStudent(positions: UserPosition[]) {
    const result =
      positions.includes('admin') ||
      positions.includes('department') ||
      positions.includes('secretary')
        ? true
        : positions.includes('auditor') || positions.includes('student')
        ? 'need-audit'
        : false
    return result
  }
  function specialManagement(positions: UserPosition[]) {
    const result =
      positions.includes('admin') || positions.includes('department')
        ? true
        : positions.includes('auditor')
        ? 'need-audit'
        : false
    return result
  }
  const insert = {
    normal: upperStudent(positions),
    special: specialManagement(positions),
    merge: specialManagement(positions),
    upload: positions.includes('admin') && !pad()
  } as Record<CreateActivityType, boolean | 'need-audit'>
  return insert
}
