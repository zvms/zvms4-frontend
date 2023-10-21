import axios from '@/plugins/axios'
import type { Response } from '@/../@types/response'

export async function modifyActivityTitle(aid: string, title: string) {
  const result = (
    await axios({
      url: `/activity/${aid}/title`,
      method: 'put',
      data: {
        title
      }
    })
  ).data as Response<null>
  if (result.status === 'error') {
    return result
  }
  return
}

export async function modifyActivityDescription(aid: string, description: string) {
  const result = (
    await axios({
      url: `/activity/${aid}/description`,
      method: 'put',
      data: {
        description
      }
    })
  ).data as Response<null>
  if (result.status === 'error') {
    return result
  }
  return
}
