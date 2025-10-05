export interface LongTermToken {
  _id: string
  token: string
  user: string
  expire: string // ISO-8601
}

export interface ShortTermToken { // Only 30 minutes
  _id: string
  token: string
  user: string
}
