import api from '@/api'
import type { ActivityType } from '../../../types'

export async function getActivity(
  user: string,
  mode: 'mine' | 'class' | 'campus',
  page: number = 1,
  perpage: number = 10,
  query: string = '',
  classid: string = '',
  type: ActivityType | 'all' = 'all'
) {
  if (mode === 'mine') {
    const activities = await api.activity.read.mine(user, page, perpage, query)
    return activities
  } else if (mode === 'class') {
    const activities = await api.activity.read.class(page, perpage, query, classid)
    return activities
  } else if (mode === 'campus') {
    const activities = await api.activity.read.campus({ type }, page, perpage, query)
    return activities
  }
  // ...
}
