import axios from '@/plugins/axios'
import type { Response } from '@/../@types/response'
import { ElNotification } from 'element-plus'
import { useUserStore } from '@/stores/user'

export async function userModifyImpression(user: number, aid: string, impression: string) {
  const result = (
    await axios({
      url: `/user/${user.toString()}/activity/${aid}/impression`,
      method: 'put',
      data: {
        impression
      }
    })
  ).data as Response<null>
  if (result.status === 'error') {
    ElNotification({
      title: `同步感想内容失败（${result.code.toString()}）`,
      message: result.message,
      type: 'error'
    })
    return
  }
  return
}

export async function reflectImpression(
  user: number,
  aid: string,
  type: 'first' | 'final' | 'once',
  mode: 'approve' | 'reject'
) {
  const userStore = useUserStore()
  if (!userStore.position.includes('auditor') && type !== 'first') {
    ElNotification({
      title: '审核感想提交失败',
      message: '您没有终审权限',
      type: 'error'
    })
    return
  }
  if (!userStore.position.includes('secretary') && type === 'first') {
    ElNotification({
      title: '初审感想提交失败',
      message: '您没有初审权限',
      type: 'error'
    })
    return
  }
  const status =
    type !== 'once'
      ? mode === 'approve'
        ? type === 'final'
          ? 'effective'
          : 'first-instance-approved'
        : type === 'final'
        ? 'rejected'
        : 'first-instance-rejected'
      : mode === 'approve'
      ? 'effective'
      : 'rejected'
  const result = (
    await axios({
      url: `/user/${user.toString()}/activity/${aid}/impression`,
      method: 'put',
      data: {
        type: status
      }
    })
  ).data as Response<null>
  if (result.status === 'error') {
    ElNotification({
      title: `审核感想提交失败（${result.code.toString()}）`,
      message: result.message,
      type: 'error'
    })
    return
  }
  return
}
