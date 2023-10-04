import { ObjectId } from "mongodb"

declare interface Broadcast {
  _id: ObjectId
  title: string
  content: string
  time: string // ISO-8601
  publisher: ObjectId
}
