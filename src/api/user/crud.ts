import axios from '@/plugins/axios'
import type { User, Response } from '@zvms/zvms4-types'
import { ElNotification } from 'element-plus'

async function getUser(id: string) {
  const result = (await axios(`/user/${id}`)).data as Response<User>
  if (result.status === 'error') {
    ElNotification({
      title: '获取用户信息错误（' + result.code + '）',
      message: result.message,
      type: 'error'
    })
    return null
  }
  return result.data as User
}

async function getUsers(id: string) {
  const result = (
    await axios(`/user`, {
      params: {
        query: id
      }
    })
  ).data as Response<User[]>
  if (result.status === 'error') {
    ElNotification({
      title: '获取用户信息错误（' + result.code + '）',
      message: result.message,
      type: 'error'
    })
    return []
  }
  return result.data
}

export { getUser as readOne, getUsers as read }
