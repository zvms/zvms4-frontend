import axios from '@/plugins/axios'
import md5 from 'md5'
import type { Response } from '@/../@types/response'
import type { LoginResult } from '@/../@types/user'

export async function UserLogin(user: number, password: string) {
  const result = await axios('/user/login', {
    method: 'POST',
    data: {
      userident: user.toString(),
      password: md5(password),
    }
  })
  return result.data as Response<LoginResult>
}

export async function UserLogout() {
  const result = await axios('/user/logout', {
    method: 'POST'
  })
  return result.data as Response<null>
}
