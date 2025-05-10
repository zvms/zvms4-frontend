import { temporaryToken } from '@/plugins/short-token'
import type { User, Response } from '@/../types'
import { ElNotification } from 'element-plus'
import nprogress from 'nprogress'
import axiosExported, { AxiosError } from 'axios'
import { baseURL, default as axios } from '@/plugins/axios.ts'

async function getUser(id: string) {
  const instance = axiosExported.create({
    baseURL,
    withCredentials: true,
    timeout: 24000,
    headers: {
      'Content-type': 'application/json',
      Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
    }
  })
  instance.interceptors.response.clear()
  instance.interceptors.response.use(
    (response) => {
      nprogress.done()
      return response.data
    },
    (error: Error | AxiosError) => {
      nprogress.done()
      console.log(error, 'error')
      return {
        status: 'error',
        code: (error instanceof AxiosError ? error.response?.status : 500) ?? 500,
        message: error.message
      }
    })
  const result = (await instance(`/users/${id}`)) as Response<User>
  if (result.status === 'error') {
    throw result
  }
  return result?.data as User
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
  async delete(user: string, idx: number) {
    const result = (
      await axios({
        method: 'delete',
        url: `/users/${user}/past/${idx}`
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
