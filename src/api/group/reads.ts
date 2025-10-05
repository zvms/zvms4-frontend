import axios from '@/plugins/axios'
import type { Response, User } from '@/../types'

export async function users(
  gid: string,
  page: number = 1,
  perpage: number = 10,
  search: string = '',
  pwdm: boolean = false
) {
  const response = (
    await axios(`/groups/${gid}/user`, {
      params: {
        page,
        perpage,
        search,
        pwdm
      }
    })
  ).data as Response<User[]> & { metadata: { size: number } }
  if (response.status === 'ok') {
    return {
      users: response.data,
      size: response.metadata.size
    }
  } else {
    return {
      users: [],
      size: 0
    }
  }
}

export async function time(
  gid: string,
  page: number = 1,
  perpage: number = 10,
  search: string = '',
  exceed: boolean = true,
  shortage: boolean = false
) {
  const response = (
    await axios(`/groups/${gid}/time`, {
      params: {
        page,
        perpage,
        exceed,
        shortage,
        search
      }
    })
  ).data as Response<
    {
      _id: string
      name: string
      id: string
      'on-campus': number
      'off-campus': number
      'social-practice': number
    }[]
  > & { metadata: { size: number } }
  if (response.status === 'ok') {
    return {
      time: response.data,
      size: response.metadata.size
    }
  } else {
    return {
      time: [],
      size: 0
    }
  }
}
