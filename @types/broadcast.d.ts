// TODO: Refactor to the name Notification

export interface Broadcast {
  _id: string
  global: boolean
  title: string
  content: string
  time: string // ISO-8601
  publisher: string
  receivers: string[] // ObjectId[]
  route?: string // Route to URL
  anonymous: boolean
  expire: string // ISO-8601
  type: 'pin' | 'important' | 'normal'
}

export interface BraodcastBroadcast extends Broadcast {
  global: true
}

export interface SendBroadcast extends Broadcast {
  global: false
  receivers: string[] // ObjectId[]
}

export type BroadcastInstance = BraodcastBroadcast | SendBroadcast
