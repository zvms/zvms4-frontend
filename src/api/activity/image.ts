import axios from '@/plugins/axios'
import type { Response } from '@zvms/zvms4-types'

export async function insert(activityId: string, userId: string, imageId: string) {
  const result = (
    await axios.post(`/activity/${activityId}/member/${userId}/image/`, {
      method: 'post',
      data: {
        image: imageId
      }
    })
  ).data as Response<null>
  if (result.status === 'error') {
    return false
  }
  return true
}

export async function read(activityId: string, userId: string) {
  const result = (await axios.get(`/activity/${activityId}/member/${userId}/image/`))
    .data as Response<{
    _id: string
  }[]>
  if (result.status === 'error') {
    return [] as string[]
  } else {
    return result.data.map((item) => item._id)
  }
}

export async function remove(activityId: string, userId: string) {
  const result = (await axios.delete(`/activity/${activityId}/member/${userId}/image/`))
    .data as Response<null>
  if (result.status === 'error') {
    return false
  } else {
    return true
  }
}
