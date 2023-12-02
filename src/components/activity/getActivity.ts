import api from '@/api'

export async function getActivity(user: string, mode: 'mine' | 'class' | 'campus') {
  if (mode === 'mine') {
    const activities = await api.user.activity.read(user)
    return activities
  } else {
    const activities = await api.activity.read(mode, {
      type: 'all'
    })
    return activities
  }
  // ...
}
