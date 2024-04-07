import axios from '@/plugins/axios'
import { temporaryToken } from '@/plugins/short-token'
import type { Response } from '@zvms/zvms4-types'

export async function remove(imageId: string, userId: string, token?: string) {
  if (!token) {
    token = await temporaryToken(userId)
  }
  const result = (await axios.delete(`/image/${imageId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }))
    .data as Response<null>
  if (result.status === 'error') {
    return false
  } else {
    return true
  }
}
