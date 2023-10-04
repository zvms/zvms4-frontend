import axios from '@/plugins/axios'
import type { User } from '@/../@types/user'
import type { ObjectId } from 'mongodb'

export async function getUser(id: number): Promise<User> {
  return (await axios.get(`/user/${id}`)).data as User
}

export async function createUser(user: User): Promise<ObjectId> {
  return (await axios.post('/user', user)).data as ObjectId
}

export async function updateUser(user: User): Promise<void> {
  await axios.put(`/user/${user.id}`, user)
}

export async function patchUser(id: number, user: Partial<User>): Promise<void> {
  await axios.patch(`/user/${id}`, user)
}

export async function deleteUser(id: number): Promise<void> {
  await axios.delete(`/user/${id}`)
}
