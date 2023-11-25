export interface Activity {
  _id: string
  type: ActivityType
  name: string
  description: string
  members: ActivityMember[]
  duration: number // Not higher than this value in members' field, hours.
  date: string // ISO-8601
  createdAt: string // ISO-8601
  updatedAt: string // ISO-8601
  creator: string // ObjectId
  status: ActivityStatus
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
  mode: ActivityMode
  duration: number
  history: ActivityMemberHistory[]
  images: string[]
}

export interface ActivityMemberHistory {
  impression: string
  duration: number // hours
  time: string // ISO-8601
  actioner: string // ObjectId
  action: MemberActivityStatus
}

export type ActivityType = 'specified' | 'special' | 'social' | 'scale'

export type MemberActivityStatus = 'draft' | 'pending' | 'effective' | 'refused' | 'rejected'

export type ActivityStatus = 'pending' | 'effective' | 'refused'

export type ActivityMode = 'on-campus' | 'off-campus' | 'large-scale'

export interface SpecifiedActivity extends Activity {
  type: 'specified'
  registration: Registration
}

export interface SocialActivity extends Activity {
  type: 'social'
}

export interface ScaleActivity extends Activity {
  type: 'scale'
  url: string // FTP Social Practice Report Location.
}

export type SpecialActivityClassification = 'prize' | 'import' | 'club' | 'deduction' | 'other'

export interface SpecialActivity extends Activity {
  type: 'special'
  mode: 'on-campus' | 'off-campus' | 'large-scale'
  classify: SpecialActivityClassification
}

export type PrizeLevel = 'district' | 'city' | 'province' | 'national' | 'international'

export type PrizeType = 'personal' | 'team'

export type PrizeClassify = 'sports' | 'academy' | 'art' | 'other'

export interface Prize {
  level: PrizeLevel
  type: PrizeType
  classify: PrizeClassify
}

export interface PrizeSpecialActivity extends SpecialActivity {
  classify: 'prize'
  mode: 'on-campus' | 'off-campus' // It can be edited manually, according the latest rule.
  prize: Prize
}

export interface ImportSpecialActivity extends SpecialActivity {
  classify: 'import'
  mode: 'on-campus' | 'off-campus' | 'large-scale'
}

export interface ClubSpecialActivity extends SpecialActivity {
  classify: 'club'
  mode: 'on-campus' | 'off-campus'
  club: string
}

export interface DeductionSpecialActivity extends SpecialActivity {
  classify: 'deduction'
  mode: 'on-campus' | 'off-campus' | 'large-scale'
  reason: string
}

export type OtherSpecialActivity = SpecialActivity

export type SpecialActivityInstance =
  | PrizeSpecialActivity
  | ImportSpecialActivity
  | ClubSpecialActivity
  | DeductionSpecialActivity
  | OtherSpecialActivity

export type ActivityInstance =
  | Activity
  | SpecifiedActivity
  | SocialActivity
  | ScaleActivity
  | SpecialActivityInstance
