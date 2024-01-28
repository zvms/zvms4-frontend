export interface Trophy {
  name: string
  type: 'academic' | 'art' | 'sports' | 'others'
  level: 'district' | 'city' | 'province' | 'national' | 'international'
  awards: TrophyAward[]
  team: boolean
  status: 'pending' | 'effective' | 'refused'
  members: TrophyMember[]
  creator: string // ObjectId
}

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
