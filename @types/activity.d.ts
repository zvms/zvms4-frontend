export interface Activity {
  _id: string
  type: ActivityType
  name: string
  description: string
  members: ActivityMember[]
  duration: number // hours
  time: string // ISO-8601
}

export interface ActivityCreate extends Omit<Activity, 'members'> {
  members: string[]
}

export type ActivityQuery = {
  _id: string;
  type: ActivityType;
  name: string;
  memberCounts: number;
  duration: number;
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
  _id: string
  status: MemberActivityStatus
  impression: string
  duration?: number // hours, if is undefined, use the activity's duration
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
  registration: Registration
}

export interface SpecialActivity extends Activity {
  type: 'special'
  subtype: 'on-campus' | 'off-campus' | 'large-scale'
}

export interface SpecialActivityCreate extends Omit<SpecialActivity, 'members'> {
  members: string[]
}

export interface OffCampusActivity extends Activity {
  type: 'off-campus'
}

export interface OffCampusActivityCreate extends Omit<OffCampusActivity, 'members'> {
  members: string[]
}

export type ActivityInstance = SpecifiedActivity | SpecialActivity | OffCampusActivity
export type ActivityCreateInstance = SpecifiedActivity | SpecialActivityCreate | OffCampusActivityCreate
export type ActivityDisplayInstance = Omit<ActivityInstance, 'description'>
