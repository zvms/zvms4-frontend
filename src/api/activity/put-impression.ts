import axios from '@/plugins/axios'
import type { Response, MemberActivityStatus } from '@/../types'
import { ElNotification } from 'element-plus'

export async function userModifyDuration(user: string, aid: string, duration: number) {
  const result = (
    await axios({
      url: `/activity/${aid}/member/${user.toString()}/duration`,
      method: 'put',
      data: { duration }
    })
  ).data as Response<null>
  if (result.status === 'error') {
    ElNotification({
      title: `Error in modifying duration (${result.code.toString()})`,
      message: result.message,
      type: 'error'
    })
    return
  }
}

export async function userModifyStatus(
  user: string,
  aid: string,
  status: MemberActivityStatus,
  notification: boolean = true
) {
  const result = (
    await axios({
      url: `/activity/${aid}/member/${user.toString()}/status`,
      method: 'put',
      data: { status }
    })
  ).data as Response<null>
  if (result.status === 'error') {
    ElNotification({
      title: `Error in modifying status (${result.code.toString()})`,
      message: result.message,
      type: 'error'
    })
    return
  }
  if (notification !== false) {
    ElNotification({
      title: 'Status modified successfully',
      type: 'success'
    })
  }
  return
}

export async function userModifyImpression(
  user: string,
  aid: string,
  impression: string,
  submit: boolean
) {
  try {
    const result = (
      await axios({
        url: `/activity/${aid}/member/${user.toString()}/impression`,
        method: 'put',
        data: { impression }
      })
    ).data as Response<null>
    if (submit) {
      await userModifyStatus(user, aid, 'pending', false)
    }
    if (result.status === 'error') {
      ElNotification({
        title: `Error in modifying impression (${result.code.toString()})`,
        message: result.message,
        type: 'error'
      })
      return
    }
    ElNotification({
      title: 'Impression modified successfully',
      type: 'success'
    })
    return
  } catch (e) {
    ElNotification({
      title: 'Error in modifying impression',
      message: (e as Error).toString(),
      type: 'error'
    })
  }
}
