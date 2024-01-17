import axios from '@/plugins/axios'
import type { Response } from '@/../@types/response'
import type { LoginResult } from '@/../@types/login'
import { ElNotification } from 'element-plus'
import JSEncrypt from 'jsencrypt'

export async function getRSAPublicCert(): Promise<JSEncrypt | undefined> {
  const result = (await axios('/cert', {
    method: 'GET',
    params: {
      type: 'public',
      method: 'RSA'
    }
  })) as Response<string>
  if (result.status === 'error') {
    ElNotification({
      title: '获取公钥错误（' + result.code + '）',
      message: result.message,
      type: 'error'
    })
    return
  }
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(result.data)
  return encrypt
}

async function UserLogin(user: string, password: string, term: 'long' | 'short' = 'long') {
  const encrypt = await getRSAPublicCert()
  if (!encrypt) return
  const password_encrypted = encrypt?.encrypt(password)
  const result = (await axios('/user/auth', {
    method: 'POST',
    data: {
      userident: user.toString(),
      password: password_encrypted,
      role: term
    }
  })) as Response<LoginResult>
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

export { UserLogin as useLongTermAuth }
