import { getAllActivities, getUserActivities } from "@/api/activity/read";

export async function getActivity(user: string, mode: 'student' | 'secretary' | 'auditor') {
  if (mode === 'student') {
    const activities = await getUserActivities(user)
    console.log(activities)
    return activities
  } else {
    const activities = await getAllActivities(mode === 'auditor' ? 'campus' : 'in-class', {
      type: 'all'
    })
    return activities
  }
  // ...
}
