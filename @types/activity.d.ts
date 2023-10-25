export interface Activity {
  _id: string
  type: ActivityType
  name: string
  description: string
  members: ActivityMember[]
  duration: number // hours
  date: string // ISO-8601
}

export interface ActivityCreate extends Omit<Activity, 'members'> {
  members: string[]
}

export type ActivityQuery = {
  _id: string
  type: ActivityType
  name: string
  memberCounts: number
  duration: number
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
  _id: string // ObjectId
  status: MemberActivityStatus
  impression: string
  duration?: number // hours, if is undefined, use the activity's duration
  history: ActivityMemberHistory[]
}

export interface ActivityMemberHistory {
  impression: string
  duration: number // hours
  date: string // ISO-8601
  actioner: string // ObjectId
  action: MemberActivityStatus
}

export type ActivityType = 'specified' | 'special' | 'off-campus' | 'scale'

export type ActivityStatus = 'created' | 'completed' | 'pending'

export type MemberActivityStatus =
  | 'registered'
  | 'attended'
  | 'draft'
  | 'first-instance'
  | 'first-instance-rejected'
  | 'last-instance'
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
  classify: 'prize' | 'import' | 'scale' | 'club' | 'other'
}

export interface ScaleActivity extends SpecialActivity {
  subtype: 'large-scale'
  registration: Registration
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
export type ActivityCreateInstance =
  | SpecifiedActivity
  | SpecialActivityCreate
  | OffCampusActivityCreate
export type ActivityDisplayInstance = Omit<ActivityInstance, 'description'>
