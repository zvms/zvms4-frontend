import axios from '@/plugins/axios'
import type { Response } from '@/../@types/response'
import type { UserActivityTimeSums } from '@/../@types/user'

export async function getUserTime(user: number) {
  const result = (await axios(`/user/${user}/time`, {
    withCredentials: true
  })) as Response<{
    inside: number
    outside: number
    large: number
  }>
  return {
    offCampus: result.data.outside,
    special: result.data.large,
    specified: result.data.inside
  } as UserActivityTimeSums
}
