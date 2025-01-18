import axios from '@/plugins/axios'
import { temporaryToken } from '@/plugins/short-token'
import type { Response } from '@zvms/zvms4-types'
import { remove as removeImage } from '../image'

export async function insert(activityId: string, userId: string, imageId: string) {
  const result = (
    await axios(`/activity/${activityId}/member/${userId}/image/`, {
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
    .data as Response<
    {
      _id: string
    }[]
  >
  if (result.status === 'error') {
    return [] as string[]
  } else {
    return result.data.map((item) => item._id)
  }
}

export async function remove(
  activityId: string,
  userId: string,
  imageId: string,
  token?: string,
  deleteImage = true
) {
  if (!token) {
    token = await temporaryToken(userId)
  }
  const result = (
    await axios.delete(`/activity/${activityId}/member/${userId}/image/${imageId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  ).data as Response<null>
  if (result.status === 'error') {
    return false
  } else {
    if (deleteImage) {
      await removeImage(imageId, userId, token)
    }
  }
}
