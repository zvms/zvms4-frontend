import axios from '@/plugins/axios'
import { temporaryToken } from '@/plugins/short-token'
import type { Response, ActivityMember } from '@/../types'

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

export async function remove(id: string, aid: string, uid: string) {
  const token = await temporaryToken(uid)
  const result = (
    await axios(`/activity/${aid}/member/${id}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  ).data as Response<ActivityMember>
  if (result.status === 'ok') {
    return result.data
  }
}

export async function read(aid: string, uid: string) {
  const result = (await axios(`/activity/${aid}/member/${uid}`)).data as Response<ActivityMember>
  if (result.status === 'ok') {
    return result.data
  }
}
