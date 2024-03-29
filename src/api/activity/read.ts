import axios from '@/plugins/axios'
import type { Response } from '@zvms/zvms4-types'
import type { ActivityInstance } from '@zvms/zvms4-types'
import { ElNotification } from 'element-plus'
import { read as mine } from '@/api/user/activity'
import dayjs from 'dayjs'

async function getAllActivities(
  range: 'class' | 'campus',
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
        mode: range,
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
  result.data.sort((prev, next) => {
    return dayjs(prev.date).isBefore(dayjs(next.date)) ? 1 : -1
  })
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
  campus: (filter: { type: 'special' | 'specified' | 'off-campus' | 'all' }, page: number = 1, perpage: number = 10, query: string = '') =>
    getAllActivities('campus', filter, page, perpage, query),
  class: (filter: { type: 'special' | 'specified' | 'off-campus' | 'all' }, page: number = 1, perpage: number = 10, query: string = '') =>
    getAllActivities('class', filter, page, perpage, query),
  mine,
  single: (id: string) => getActivity(id)
}

export { exports as read }
