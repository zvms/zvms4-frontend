import axios from '@/plugins/axios'
import type { Response } from '@/../types'

async function modifyActivityInfo(aid: string, name: string, description: string) {
  const result = (
    await axios({
      url: `/v2/activities/${aid}/info`,
      method: 'put',
      data: {
        description,
        name
      }
    })
  ).data as Response<null>
  if (result.status === 'error') {
    return result
  }
  return
}

async function modifyActivityStatus(aid: string, status: string) {
  await axios({
    url: `/v2/activities/${aid}/status`,
    method: 'put',
    data: {
      status
    }
  })
}

export {
  modifyActivityInfo as info,
  modifyActivityStatus as status
}
