import axios from '@/plugins/axios'
import type { User } from '@/../@types/user'
import type { Response } from '@/../@types/response'
import { ElNotification } from 'element-plus'

export async function getUser(id: number) {
  const result = (await axios(`/user/${id}`)).data as Response<User<string>>
  if (result.status === 'error') {
    ElNotification({
      title: '获取用户信息错误（' + result.code + '）',
      message: result.message,
      type: 'error'
    })
    return null
  }
  return result.data
}

export async function modifyPassword(id: number, validate: string, password: string) {
  const result = await axios(`/user/${id}/password`, {
    data: {
      oldPassword: validate,
      newPassword: password,
      action: 'modify'
    },
    method: 'PATCH'
  }) as Response<null>
  if (result.status === 'error') {
    ElNotification({
      title: '修改密码错误（' + result.code + '）',
      message: result.message,
      type: 'error'
    })
  }
}
