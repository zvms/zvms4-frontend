export interface Competition {
  name: string
  description: string
  date: string // ISO 8601
  type: 'sports' | 'academy' | 'art' | 'other'
  team: boolean
  level: 'district' | 'city' | 'province' | 'national' | 'international'
  members: CompetitionMember[]
  prizes: PrizeType[]
}

export interface CompetitionMember {
  _id: string
  type: string
  status: 'pending' | 'effective'
  mode: 'on-campus' | 'off-campus'
}

export interface PrizeType {
  name: string
  duration: number
}
