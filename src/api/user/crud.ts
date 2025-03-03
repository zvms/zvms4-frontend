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

async function getUsers(id: string = '', page: number = 1, perpage: number = 5) {
  const result = (
    await axios(`/user`, {
      params: {
        query: id,
        page,
        perpage
      }
    })
  ).data as Response<User[]> & {
    metadata: {
      size: number
    }
  }
  if (result.status === 'error') {
    ElNotification({
      title: '获取用户信息错误（' + result.code + '）',
      message: result.message,
      type: 'error'
    })
    return
  }
  return {
    users: result.data,
    size: result.metadata.size
  }
}

async function putUser(user: string, target: string, name: string, id: string, group: string[], create: boolean) {
  const token = await temporaryToken(user)
  const result = (
    await axios({
      method: create ? 'post' : 'put',
      url: `/user/${target}`,
      data: { name, group, id, sex: 'unknown', past: [] },
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

async function deleteUser(user: string, target: string) {  const token = await temporaryToken(user)
  const result = (
    await axios({
      method: 'delete',
      url: `/user/${target}`,
      data: { target },
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

export { getUser as readOne, getUsers as read, putUser as update, deleteUser as removeOne }
