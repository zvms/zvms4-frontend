import axios from '@/plugins/axios'
import type { Response, LoginResult } from '@/../types'
import { ElNotification } from 'element-plus'
import { byteArrayToHex } from './utils'
import { encryptData, importPublicKey } from './crypto'

export async function getRSAPublicCert(): Promise<string> {
  const result = (
    await axios('/cert', {
      method: 'GET',
      params: {
        type: 'public',
        method: 'RSA'
      }
    })
  ).data as Response<string>
  if (result.status === 'error') {
    ElNotification({
      title: 'Error when fetching RSA public key',
      message: result.message,
      type: 'error'
    })
    return ''
  }
  return result.data
}

export async function resetPassword(
  user: string,
  password: string,
  token: string,
  reset: boolean = false
) {
  const payload = JSON.stringify({
    password: password,
    time: Date.now()
  })
  const publicKey = await importPublicKey(await getRSAPublicCert())
  const credential = await encryptData(publicKey, payload)
  const hex = byteArrayToHex(new Uint8Array(credential))
  const result = (await axios(`/users/${user}/password`, {
    method: 'PUT',
    data: {
      credential: hex
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })) as Response<LoginResult>
  if (result.status === 'error') {
    ElNotification({
      title: 'Error when resetting password',
      message: result.message,
      type: 'error'
    })
    return
  }
  if (!reset) {
    localStorage.setItem('token', result.data.token)
  }
  return result.data
}

async function UserLogin(user: string, password: string, term: 'long' | 'short' = 'long') {
  const payload = JSON.stringify({
    password: password,
    time: Date.now()
  })
  const publicKey = await importPublicKey(await getRSAPublicCert())
  const credential = await encryptData(publicKey, payload)
  const hex = byteArrayToHex(new Uint8Array(credential))
  const result = (await axios('/users/auth', {
    method: 'POST',
    data: {
      id: user.toString(),
      credential: hex,
      mode: term
    }
  })) as Response<LoginResult>
  if (result.status === 'error') {
    ElNotification({
      title: 'Login failed (' + result.code + ')',
      message: result.message,
      type: 'error'
    })
    return
  }
  if (term === 'long') {
    localStorage.setItem('token', result.data.token)
  }
  return result.data
}

export { UserLogin as useLongTermAuth }
