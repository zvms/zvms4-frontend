import axios from '@/plugins/axios'
import md5 from 'md5'
import type { Response } from '@/../@types/response'
import type { LoginResult } from '@/../@types/login'
import { ElNotification } from 'element-plus'

export async function UserLogin(user: number, password: string) {
  const result = await axios('/user/login', {
    method: 'POST',
    data: {
      userident: user.toString(),
      password: md5(password),
    }
  }) as Response<LoginResult>
  if (result.status === 'error') {
    ElNotification({
      title: '登录错误（' + result.code + '）',
      message: result.message,
      type: 'error'
    })
    return
  }
  return result.data
}
