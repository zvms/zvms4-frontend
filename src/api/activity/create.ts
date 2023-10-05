import axios from '@/plugins/axios'
import type { Response } from '@/../@types/response'
import type {
  OffCampusActivityCreate,
  SpecialActivityCreate,
  SpecifiedActivity
} from '@/../@types/activity'
import dayjs from 'dayjs'

export async function createSpecialActivity(activity: SpecialActivityCreate) {
  const types = {
    'on-campus': 1,
    'off-campus': 2,
    'large-scale': 3
  }
  const handled = {
    name: activity.name,
    type: types[activity.subtype],
    participants: activity.members.map((x) => x.toString()),
    reward: activity.duration
  }
  console.log(handled)
  const req = (await fetch('http://172.31.2.4:4000/api/volunteer/create/special', {
    method: 'post',
    body: JSON.stringify(handled),
    credentials: 'include',
  }))
  const result = (await req.json()) as Response<number>
  return result
}

export async function createOffCampusActivity(activity: OffCampusActivityCreate) {
  const handled = {
    name: activity.name,
    description: activity.description,
    type: 1,
    reward: activity.duration,
    participants: activity.members.map((x) => x.toString())
  }
  return (await axios('/volunteer/create/appointed', {
    method: 'post',
    data: handled,
    withCredentials: true
  })) as Response<number>
}

export async function createSpecifiedActivity(activity: SpecifiedActivity) {
  const handled = {
    name: activity.name,
    description: activity.description,
    time: dayjs(activity.registration.deadline).toISOString(),
    reward: activity.duration,
    classes: activity.registration.classes.map((x) => ({
      id: x.class.toString(),
      max: x.max
    }))
  }
  return (await axios('/volunteer/create/appointed', {
    method: 'post',
    data: handled,
    withCredentials: true
  })) as Response<number>
}
