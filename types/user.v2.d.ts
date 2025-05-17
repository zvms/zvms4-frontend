export interface User {
  _id: string // ObjectId
  id: number
  name: string
  groups: string[]
  past: string[]
}

export type UserPosition = 'admin' | 'volunteer' | 'club' | 'monitor' | 'student'

export type WithPassword<T> = {
  password: string
} & T

export interface UserLogin {
  id: number
  password: string
}

export interface UserActivityTimeSums {
  onCampus: number
  offCampus: number
  socialPractice: number
}
