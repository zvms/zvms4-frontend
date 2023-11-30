import { getAllActivities, getUserActivities } from "@/api/activity/read";

export async function getActivity(user: string, mode: 'mine' | 'class' | 'campus') {
  if (mode === 'mine') {
    const activities = await getUserActivities(user)
    console.log(activities)
    return activities
  } else {
    const activities = await getAllActivities(mode, {
      type: 'all'
    })
    return activities
  }
  // ...
}
