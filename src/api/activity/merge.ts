import type { Activity } from '@/../types/v2'
import { temporaryToken } from '@/plugins/short-token.ts'
import axios from '@/plugins/axios'

export default async function (
  targets: Activity[],
  name: string,
  description: string,
  origin: Activity['origin'],
  mergeOptions: {
    duplicateUser: 'max' | 'sum'
    proceedPending: boolean
  },
  uid: string
) {
  // 1. Read the token from the cache
  const token = await temporaryToken(uid)
  // 2. Read the activities
  // 3. Check the result
  return await axios('/v2/activities/amalgamation', {
    data: {
      activities: targets.map((x) => x._id),
      name,
      description,
      origin,
      ...mergeOptions
    },
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
