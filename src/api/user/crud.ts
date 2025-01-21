import axios from '@/plugins/axios'
import { temporaryToken } from '@/plugins/short-token'
import type { User, Response } from '@/../types'
import { ElNotification } from 'element-plus'

async function getUser(id: string) {
  const result = (await axios(`/user/${id}`)).data as Response<User>
  if (result.status === 'error') {
    ElNotification({
      title: 'Error in getting user: ' + result.message,
      message: result.message,
      type: 'error'
    })
    return undefined
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

async function putUser(user: string, target: string, name: string, id: string, groups: string[]) {
  const token = await temporaryToken(user)
  const result = (
    await axios({
      method: 'put',
      url: `/user/${target}`,
      data: { name, groups, id },
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  ).data as Response<null>
  if (result.status === 'error') {
    ElNotification({
      title: 'Error when updating user: ' + result.message,
      message: result.message,
      type: 'error'
    })
    return false
  }
  return true
}

export { getUser as readOne, getUsers as read, putUser as update }
