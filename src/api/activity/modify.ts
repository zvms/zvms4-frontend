import axios from '@/plugins/axios'
import type { Response } from '@zvms/zvms4-types'

async function modifyActivityTitle(aid: string, title: string) {
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

async function modifyActivityDescription(aid: string, description: string) {
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

async function modifyActivityStatus(aid: string, status: string) {
  const result = (
    await axios({
      url: `/activity/${aid}/status`,
      method: 'put',
      data: {
        status
      }
    })
  ).data as Response<null>
  if (result.status === 'error') {
    return result
  }
  return
}

export {
  modifyActivityDescription as description,
  modifyActivityTitle as title,
  modifyActivityStatus as status
}
