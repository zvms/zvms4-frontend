import axios from '@/plugins/axios'
import { temporaryToken } from '@/plugins/short-token'
import type { User, Response } from '@/../types'
import { ElNotification } from 'element-plus'

async function getUser(id: string) {
  const result = (await axios(`/users/${id}`)).data as Response<User>
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
    await axios(`/users`, {
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
      title: 'Error when fetching data (' + result.code + ')',
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
      url: `/users/${target}`,
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

export const past = {
  async insert(user: string, past: string) {
    const result = (
      await axios({
        method: 'post',
        url: `/users/${user}/past`,
        data: { past },
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
  },
  async delete(user: string, past: string) {
    const result = (
      await axios({
        method: 'delete',
        url: `/users/${user}/past/${past}`,
        params: {
          data: past
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
}

async function deleteUser(user: string, target: string) {  const token = await temporaryToken(user)
  const result = (
    await axios({
      method: 'delete',
      url: `/users/${target}`,
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
