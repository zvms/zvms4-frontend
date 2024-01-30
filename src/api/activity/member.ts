import axios from '@/plugins/axios'
import type { Response, ActivityMember } from '@zvms/zvms4-types'

export async function insert(aid: string, member: ActivityMember) {
  const result = (
    await axios(`/activity/${aid}/member`, {
      method: 'post',
      data: member
    })
  ).data as Response<ActivityMember>
  if (result.status === 'ok') {
    return result.data
  }
}

export async function remove(id: string, aid: string) {
  const result = (
    await axios(`/activity/${aid}/member/${id}`, {
      method: 'delete'
    })
  ).data as Response<ActivityMember>
  if (result.status === 'ok') {
    return result.data
  }
}
