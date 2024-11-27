import type {
  Activity,
  ActivityMember,
  Registration,
  Special,
  ActivityInstance,
  Trophy,
  SpecialActivity,
  SpecifiedActivity
} from '@zvms/zvms4-types'
import dayjs from 'dayjs'
export function generateActivity(
  base: Activity,
  members: ActivityMember[],
  registration?: Registration,
  special?: Special,
) {
  if (base.type === 'specified' || base.type === 'social' || base.type === 'scale') {
    special = undefined
  }
  if (base.type === 'special' || base.type === 'scale' || base.type === 'social') {
    registration = undefined
  }
  const activity = {
    ...base,
    members,
  } as ActivityInstance
  if (registration && base.type === 'specified') {
    (activity as SpecifiedActivity).registration = registration
  }
  if (special && base.type === 'special') {
    (activity as SpecialActivity).special = special
  }
  return activity
}

export function generateAwardActivity(trophy: Trophy): SpecialActivity {
  const activity = {
    _id: '',
    name: trophy.name,
    description: '',
    date: trophy.time,
    type: 'special',
    members: [],
    special: {
      classify: 'prize',
      prize: trophy._id
    },
    creator: trophy.creator,
    createdAt: trophy.createdAt,
    updatedAt: dayjs().toISOString(),
    status: 'pending'
  } as SpecialActivity
  function getAward(name: string) {
    return trophy.awards.find((award) => award.name === name)
  }
  trophy.members.forEach((member) => {
    const award = getAward(member.award)
    const activityMember = {
      _id: member._id,
      status: 'effective',
      impression: '',
      mode: member.mode,
      duration: award ? award.duration : 0,
      history: [
        {
          impression: 'No impressions are required for award-winning volunteers.',
          duration: award ? award.duration : 0,
          time: trophy.time,
          actioner: trophy.creator,
          action: 'effective'
        }
      ],
      images: []
    } as ActivityMember
    activity.members.push(activityMember)
  })
  return activity
}
