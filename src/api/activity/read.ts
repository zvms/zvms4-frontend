import axios from '@/plugins/axios'
import type { Response } from '@zvms/zvms4-types'
import type { ActivityInstance } from '@zvms/zvms4-types'
import { ElNotification } from 'element-plus'
import { read as mine } from '@/api/user/activity'

async function getClassActivities(
  page: number = 1,
  perpage: number = 10,
  query: string = '',
  classid: string = ''
) {
  const result = (
    await axios(`/group/${classid}/activity`, {
      params: {
        page,
        perpage,
        query,
        classid
      }
    })
  ).data as Response<ActivityInstance[]> & {
    metadata: {
      size: number
    }
  }
  if (result.status === 'error') {
    ElNotification({
      title: `获取义工列表失败（${result.code}）`,
      message: result.message,
      type: 'error'
    })
    return
  }
  return {
    data: result.data,
    size: result.metadata.size
  }
}

async function getAllActivities(
  filter: {
    type: 'special' | 'specified' | 'off-campus' | 'all'
  },
  page: number = 1,
  perpage: number = 10,
  query: string = ''
) {
  const result = (
    await axios('/activity', {
      params: {
        mode: 'campus',
        type: filter.type,
        page,
        perpage,
        query
      }
    })
  ).data as Response<ActivityInstance[]> & {
    metadata: {
      size: number
    }
  }
  if (result.status === 'error') {
    ElNotification({
      title: `获取义工列表失败（${result.code}）`,
      message: result.message,
      type: 'error'
    })
    return
  }
  return {
    data: result.data,
    size: result.metadata.size
  }
}

async function getActivity(id: string) {
  // id: ObjectId
  const result = (await axios(`/activity/${id}`)).data as Response<ActivityInstance>
  if (result.status === 'error') {
    ElNotification({
      title: `获取义工失败（${result.code}）`,
      message: result.message,
      type: 'error'
    })
    return
  }
  return result.data
}

const exports = {
  campus: (
    filter: { type: 'special' | 'specified' | 'off-campus' | 'all' },
    page: number = 1,
    perpage: number = 10,
    query: string = ''
  ) => getAllActivities(filter, page, perpage, query),
  class: (page: number = 1, perpage: number = 10, query: string = '', classid: string = '') =>
    getClassActivities(page, perpage, query, classid),
  mine,
  single: (id: string) => getActivity(id)
}

export { exports as read }
