import api from '@/api'
import type { Activity } from '@/../types/v2'

export async function getActivity(
  user: string,
  mode: 'mine' | 'class' | 'campus',
  page: number = 1,
  perpage: number = 10,
  query: string = '',
  classid: string = '',
  type: string,
  sortField: string = '_id',
  ascending: boolean = false
): Promise<
  | {
      activities: Activity[]
      total: number
    }
  | undefined
> {
  if (mode === 'mine') {
    return await api.activity.read.mine(user, page, perpage, query, sortField, ascending)
  } else if (mode === 'class') {
    return await api.activity.read.class(page, perpage, query, classid, sortField, ascending)
  } else if (mode === 'campus') {
    return await api.activity.read.campus(type, page, perpage, query, sortField, ascending)
  }
  // ...
}
