import { ObjectId } from 'mongodb'

export interface Activity {
  _id: ObjectId
  type: ActivityType
  name: string
  description: string
  members: ActivityMember[]
  duration: number // hours
  impression: string
}

export interface Registration {
  deadline: string // ISO-8601
  place: string
  classes: ClassRegistration[]
}

export interface ClassRegistration {
  class: number
  min?: number
  max: number
}

export interface ActivityMember {
  _id: ObjectId
  status: MemberActivityStatus
}

export type ActivityType = 'specified' | 'special' | 'off-campus'

export type ActivityStatus = 'created' | 'canceled' | 'completed'

export type MemberActivityStatus =
  | 'registered'
  | 'attended'
  | 'first-instance-rejected'
  | 'first-instance-approved'
  | 'last-instance-rejected'
  | 'effective'
  | 'rejected'

export interface SpecifiedActivity extends Activity {
  type: 'specified'
  time: string // ISO-8601
  registration: Registration
}

export interface SpecialActivity extends Activity {
  type: 'special'
  subtype: 'on-campus' | 'off-campus' | 'large-scale-activity'
}

export interface OffCampusActivity extends Activity {
  type: 'off-campus'
  timeRange: [string, string] // ISO-8601
}

export type ActivityInstance = SpecifiedActivity | SpecialActivity | OffCampusActivity
