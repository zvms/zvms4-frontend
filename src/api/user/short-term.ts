import axios from '@/plugins/axios'
import type { Response } from '@/../@types/response'

export async function useShortTermToken(user: number, password: string) {
  const result = (
    await axios('/user/auth', {
      method: 'post',
      data: {
        id: user,
        password,
        role: 'short'
      }
    })
  ).data as Response<{ token: string; _id: string }>
  if (result.status === 'error') {
    return false
  } else {
    return result.data.token
  }
}
