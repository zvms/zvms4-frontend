import axios from '@/plugins/axios'
import { temporaryToken } from '@/plugins/short-token'
import type { Group, Response, UserPosition } from '@zvms/zvms4-types'
import { ElNotification } from 'element-plus'

export async function createGroup(group: Group) {
  const response = await axios({
    method: 'post',
    url: '/group',
    data: group
  })
  const data = response.data as Response<{ _id: string }>
  if (data.status === 'ok') {
    ElNotification({
      title: 'Success',
      message: 'Group created successfully: ' + data.data._id,
      type: 'success'
    })
    return data.data._id
  }
  return false
}

export async function getGroup(gid: string) {
  const response = await axios('/group/' + gid)
  const data = response.data as Response<Group>
  if (data.status === 'ok') {
    return data.data
  }
}

export async function getGroups(type: 'all' | 'permission' | 'class' = 'all', page = 1, limit = 10, search = '') {
  const response = await axios('/group', {
    params: { type, page, perpage: limit, search }
  })
  const data = response.data as Response<Group[]> & { metadata: { size: number } }
  if (data.status === 'ok') {
    return {
      groups: data.data,
      size: data.metadata.size
    }
  }
}

export async function editGroupName(gid: string, name: string) {
  const response = await axios({
    method: 'put',
    url: `/group/${gid}/name`,
    data: { name }
  })
  const data = response.data as Response<null>
  return data.status === 'ok'
}

export async function editGroupDescription(gid: string, description: string) {
  const response = await axios({
    method: 'put',
    url: `/group/${gid}/description`,
    data: { description }
  })
  const data = response.data as Response<null>
  return data.status === 'ok'
}

export async function editGroupPermissions(gid: string, permissions: UserPosition[]) {
  const response = await axios({
    method: 'put',
    url: `/group/${gid}/permissions`,
    data: { permissions }
  })
  const data = response.data as Response<null>
  return data.status === 'ok'
}

export async function deleteGroup(uid: string, gid: string) {
  const token = await temporaryToken(uid, true)
  const response = await axios({
    method: 'delete',
    url: `/group/${gid}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = response.data as Response<null>
  return data.status === 'ok'
}

export const updateMethods = {
  name: editGroupName,
  description: editGroupDescription,
  permissions: editGroupPermissions
}
