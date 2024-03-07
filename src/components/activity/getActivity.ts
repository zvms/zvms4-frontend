import api from '@/api'

export async function getActivity(user: string, mode: 'mine' | 'class' | 'campus', page: number = 1, perpage: number = 10, query: string = '') {
  if (mode === 'mine') {
    const activities = await api.activity.read.mine(user, page, perpage)
    return activities
  } else {
    const activities = await api.activity.read[mode]({
      type: 'all'
    }, page, perpage, query)
    return activities
  }
  // ...
}
