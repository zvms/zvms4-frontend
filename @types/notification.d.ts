export interface Notification {
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

export interface BraodcastNotification extends Notification {
  global: true
}

export interface SendNotification extends Notification {
  global: false
  receivers: string[] // ObjectId[]
}

export type NotificationInstance = BraodcastNotification | SendNotification
