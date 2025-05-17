import axios from '@/plugins/axios'
import type { Activity } from '@/../types/v2'
import { read as mine } from '@/api/user/activity'

async function getClassActivities(
  page: number = 1,
  perpage: number = 10,
  search: string = '',
  classid: string = ''
) {
  return (
    await axios(`/v2/groups/${classid}/activities`, {
      params: {
        page,
        perpage,
        search,
        classid
      }
    })
  ).data as {
    activities: Activity[]
    total: number
  }
}

async function getAllActivities(
  filter: {
    type: Activity['type'] | 'all'
  },
  page: number = 1,
  perpage: number = 10,
  search: string = ''
) {
  return (
    await axios('/v2/activities', {
      params: {
        mode: 'campus',
        activity_type: filter.type,
        page,
        perpage,
        search
      }
    })
  ).data as {
    activities: Activity[]
    total: number
  }
}

async function getActivity(id: string) {
  // id: ObjectId
  return (await axios(`/v2/activities/${id}`)).data as {
    activity: Activity
    members_count: number
  }
}

const exports = {
  campus: (
    filter: { type: Activity['type'] | 'all' },
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
