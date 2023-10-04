import { ObjectId } from 'mongodb'

declare interface User {
  _id: ObjectId
  id: number
  name: string
  sex: 'male' | 'female'
  position: 'admin' | 'minister' | 'secretary' | 'student' | 'inspector'
  password: string
}

declare interface UserLogin {
  id: number
  password: string
}
