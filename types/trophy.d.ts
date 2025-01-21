export interface Trophy {
  _id: string // ObjectId
  name: string
  type: 'academic' | 'art' | 'sports' | 'others'
  level: 'district' | 'city' | 'province' | 'national' | 'international'
  awards: TrophyAward[]
  team: boolean
  status: 'pending' | 'effective' | 'refused'
  members: TrophyMember[]
  creator: string // ObjectId
  instructor: string // Leading Teacher
  deadline: string // ISO 8601
  time: string // ISO 8601
  createdAt: string // ISO 8601
}

export type TrophyStatus = Trophy['status']
export type TrophyType = Trophy['type']
export type TrophyLevel = Trophy['level']

export interface TrophyAward {
  name: string
  duration: number
}

export interface TrophyMember {
  _id: string // ObjectId
  award: string // Bind the `trophy.awards'
  mode: 'on-campus' | 'off-campus'
  status: 'pending' | 'effective' | 'refused'
}
