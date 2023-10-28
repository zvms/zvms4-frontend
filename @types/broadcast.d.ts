export interface Broadcast {
  _id: string
  global: boolean
  title: string
  content: string
  time: string // ISO-8601
  publisher: string
  receiver: string[] // ObjectId[]
  route: string // Route to URL
  anonymous: boolean
}

export interface BraodcastBroadcast extends Broadcast {
  global: true
}

export interface SendBroadcast extends Broadcast {
  global: false
  receiver: string[] // ObjectId[]
}

export type BroadcastInstance = BraodcastBroadcast | SendBroadcast
