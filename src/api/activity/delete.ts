import axios from '@/plugins/axios'
import { temporaryToken } from '@/plugins/short-token'

export async function deleteActivity(id: string, uid: string, token: string = '') {
  if (!token) {
    token = await temporaryToken(uid)
  }
  const result = (
    await axios(`/activities/${id}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  ).data
  return result
}
