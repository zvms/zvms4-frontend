import axios from '@/plugins/axios'
import type { ActivityType, Response } from '@/../types'
import type { ActivityInstance } from '@/../types'
import { ElNotification } from 'element-plus'
import { read as mine } from '@/api/user/activity'

async function getClassActivities(
  page: number = 1,
  perpage: number = 10,
  query: string = '',
  classid: string = ''
) {
  const result = (
    await axios(`/groups/${classid}/activities`, {
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
      title: `Error fetching activity list (${result.code})`,
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
    type: ActivityType | 'all'
  },
  page: number = 1,
  perpage: number = 10,
  query: string = ''
) {
  const result = (
    await axios('/activities', {
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
      title: `Error fetching activity list (${result.code})`,
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
  const result = (await axios(`/activities/${id}`)).data as Response<ActivityInstance>
  if (result.status === 'error') {
    ElNotification({
      title: `Error fetching activity (${result.code})`,
      message: result.message,
      type: 'error'
    })
    return
  }
  return result.data
}

const exports = {
  campus: (
    filter: { type: ActivityType | 'all' },
    page: number = 1,
    perpage: number = 10,
    query: string = '',
  ) => getAllActivities(filter, page, perpage, query),
  class: (page: number = 1, perpage: number = 10, query: string = '', classid: string = '') =>
    getClassActivities(page, perpage, query, classid),
  mine,
  single: (id: string) => getActivity(id)
}

export { exports as read }
