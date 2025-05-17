import type { ActivityInstance, ActivityMember } from '@/../types'
import { temporaryToken } from '@/plugins/short-token.ts'
import * as api from '.'
import dayjs from 'dayjs'
import createActivity from '@/api/activity/create.ts'

export default async function (
  targets: ActivityInstance[],
  name: string,
  mergeOptions: {
    duplicateUser: 'add' | 'overwrite'
  },
  uid: string
) {
  // 1. Read the token from the cache
  const token = await temporaryToken(uid)
  // 2. Read the activities
  const activities: ActivityInstance[] = (
    await Promise.all(targets.map((target) => api.read.single(target._id)))
  ).filter((x) => x !== undefined) as ActivityInstance[]
  // 3. Merge
  const merged = merge(activities, uid, mergeOptions)
  merged.creator = uid
  merged.date = dayjs().format('YYYY-MM-DD HH:mm:ss')
  merged.createdAt = dayjs().toISOString()
  merged.updatedAt = dayjs().toISOString()
  merged.name = name
  console.log(merged)
  // 4. Create the new activity
  const result = await createActivity(merged)
  // 5. Remove the old activities
  await Promise.all(targets.map((target) => api.deleteOne(target._id, uid, token)))
  return result
}

function merge(
  activities: ActivityInstance[],
  user: string,
  options: {
    duplicateUser: 'add' | 'overwrite'
  }
): ActivityInstance {
  const userList: ActivityMember[] = []
  let description = ''
  activities.forEach((activity) => {
    description += activity.description + '\n'
    activity.members.forEach((member) => {
      // Check if the user is already in the list
      const existing = userList.find((user) => user._id === member._id)
      if (existing) {
        // If the user is already in the list, check the duplicateUser option
        // And leave the most (value) of activity time.
        if (options.duplicateUser === 'add') {
          existing.duration += member.duration
        } else {
          existing.duration = Math.max(existing.duration, member.duration)
        }
      } else {
        userList.push(member)
      }
    })
  })
  return {
    ...activities[0],
    description,
    members: userList,
    approver: user
  }
}
