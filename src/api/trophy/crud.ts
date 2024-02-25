import axios from '@/plugins/axios'
import { temporaryToken } from '@/plugins/short-token'
import type { Response, Trophy, TrophyAward, TrophyMember } from '@zvms/zvms4-types'

export async function readTrophy(id: string) {
  const resp = await axios(`/trophy/${id}`)
  const result = resp.data as Response<Trophy>
  if (result.status === 'ok') {
    return result.data
  }
}

export async function readTrophies() {
  const resp = await axios(`/trophy`)
  console.log(resp)
  const result = resp.data as Response<Trophy[]>
  console.log(result)
  if (result.status === 'ok') {
    return result.data
  }
}

export async function insertTrophy(data: Omit<Trophy, '_id'>) {
  const resp = await axios('/trophy', {
    method: 'POST',
    data,
  })
  const trophy = resp.data as Response<null>
  if (trophy.status === 'ok') {
    return true
  }
  return false
}

export async function removeTrophy(id: string) {
  const resp = await axios(`/trophy/${id}`, {
    method: 'DELETE',
  })
  const trophy = resp.data as Response<null>
  if (trophy.status === 'ok') {
    return true
  }
  return false
}

export async function modifyTrophyName(id: string, name: string) {
  const resp = await axios(`/trophy/${id}/name`, {
    method: 'PUT',
    data: name,
  })
  const trophy = resp.data as Response<null>
  if (trophy.status === 'ok') {
    return true
  }
  return false
}

export async function insertTrophyAward(id: string, data: TrophyAward) {
  const resp = await axios(`/trophy/${id}/award`, {
    method: 'POST',
    data,
  })
  const trophy = resp.data as Response<null>
  if (trophy.status === 'ok') {
    return true
  }
  return false
}

export async function removeTrophyAward(id: string, award: string) {
  const resp = await axios(`/trophy/${id}/award/${award}`, {
    method: 'DELETE',
  })
  const trophy = resp.data as Response<null>
  if (trophy.status === 'ok') {
    return true
  }
  return false
}

export async function modifyTrophyAwardDuration(id: string, award: string, duration: number) {
  const resp = await axios(`/trophy/${id}/award/${award}/duration`, {
    method: 'PUT',
    data: duration,
  })
  const trophy = resp.data as Response<null>
  if (trophy.status === 'ok') {
    return true
  }
  return false
}

export async function insertTrophyMember(id: string, data: TrophyMember) {
  const resp = await axios(`/trophy/${id}/member`, {
    method: 'POST',
    data,
  })
  const trophy = resp.data as Response<null>
  if (trophy.status === 'ok') {
    return true
  }
  return false
}

export async function removeTrophyMember(id: string, member: string, uid: string) {
  const token = await temporaryToken(uid)
  const resp = await axios(`/trophy/${id}/member/${member}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const trophy = resp.data as Response<null>
  if (trophy.status === 'ok') {
    return true
  }
  return false
}

export async function modifyTrophyMemberAward(id: string, member: string, award: number) {
  const resp = await axios(`/trophy/${id}/member/${member}/award`, {
    method: 'PUT',
    data: award,
  })
  const trophy = resp.data as Response<null>
  if (trophy.status === 'ok') {
    return true
  }
  return false
}

export async function modifyTrophyMemberMode(id: string, member: string, mode: 'on-campus' | 'off-campus') {
  const resp = await axios(`/trophy/${id}/member/${member}/mode`, {
    method: 'PUT',
    data: mode,
  })
  const trophy = resp.data as Response<null>
  if (trophy.status === 'ok') {
    return true
  }
  return false
}

export async function modifyTrophyMemberStatus(id: string, member: string, status: TrophyMember['status']) {
  const resp = await axios(`/trophy/${id}/member/${member}/status`, {
    method: 'PUT',
    data: status,
  })
  const trophy = resp.data as Response<null>
  if (trophy.status === 'ok') {
    return true
  }
  return false
}
