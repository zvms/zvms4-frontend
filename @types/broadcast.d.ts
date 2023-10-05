export interface Broadcast {
  _id: string
  type: 'broadcast' | 'send'
  title: string
  content: string
  time: string // ISO-8601
  publisher: string
}

export interface BraodcastBroadcast extends Broadcast {
  type: 'broadcast'
}

export interface SendBroadcast extends Broadcast {
  type: 'send'
  receiver: string[] // ObjectId[]
}
