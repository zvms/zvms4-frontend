export interface Activity {
  _id: string
  type: 'specified' | 'special' | 'social' | 'scale'
  name: string
  description: string
  members: ActivityMember[]
  date: string // ISO-8601
  createdAt: string // ISO-8601
  updatedAt: string // ISO-8601
  creator: string // ObjectId
  status: 'pending' | 'effective' | 'refused'
  special?: SpecialInstance
  registration?: Registration
  approver: 'authority' | 'member' | 'unknown' | string
}

export interface Registration {
  place: string
}

export interface ActivityMember {
  _id: string // ObjectId
  status: 'effective'
  mode: 'on-campus' | 'off-campus' | 'social-practice'
  duration: number
}

export type ActivityType = Activity['type']

export type CreateActivityType = 'normal' | 'special' | 'merge' | 'upload'

export type MemberActivityStatus = ActivityMember['status']

export type ActivityStatus = Activity['status']

export type ActivityMode = ActivityMember['mode']

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

export interface Special {
  classify: 'prize' | 'import' | 'club' | 'deduction' | 'other'
  prize?: string // ObjectId
  origin?: string // Path to the file.
  reason?: string
}

export type SpecialActivityClassification = Special['classify']

export interface PrizeSpecial extends Special {
  classify: 'prize'
  prize: string // ObjectId
}

export interface ImportSpecial extends Special {
  classify: 'import'
  origin: string // Path to the file.
}

export interface ClubSpecial extends Special {
  classify: 'club'
}

export interface DeductionSpecial extends Special {
  classify: 'deduction'
  reason: string
}

export type SpecialInstance =
  | PrizeSpecial
  | ImportSpecial
  | ClubSpecial
  | DeductionSpecial
  | Special

export interface SpecialActivity extends Activity {
  type: 'special'
  special: SpecialInstance
}

export type ActivityInstance = SpecifiedActivity | SocialActivity | ScaleActivity | SpecialActivity
