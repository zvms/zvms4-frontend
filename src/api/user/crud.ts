import axios from '@/plugins/axios'
import type { LoginResult, User } from '@/../@types/user'
import ObjectId from 'bson-objectid'
import { getUserPosition } from '@/utils/getPosition'
import type { Response } from '@/../@types/response'
import { getUserClass } from '@/utils/getClass'

export const handlerUserInformation = (id: number, user: LoginResult) =>
  ({
    _id: new ObjectId().toHexString(),
    id,
    name: user.username,
    sex: 'unknown',
    position: getUserPosition(user.permission),
    class: getUserClass(id, user.classId)
  }) as User<string>

export async function getUser(id: number) {
  const result = (await axios.get(`/user/${id}`)).data as Response<LoginResult>
  return handlerUserInformation(id, result.data)
}

export async function modifyPassword(id: number, validate: string, password: string) {
  return await axios.post(`/user/${id}/modify-password`, {
    data: {
      oldPassword: validate,
      newPassword: password
    }
  })
}
