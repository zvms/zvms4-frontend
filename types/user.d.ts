export interface User {
  _id: string // ObjectId
  id: number
  name: string
  sex: 'male' | 'female' | 'unknown'
  group: string[]
  past: string[]
}

export type UserPosition = 'system' | 'admin' | 'auditor' | 'department' | 'secretary' | 'student'

export type WithPassword<T> = {
  password: string
} & T

export interface UserLogin {
  id: number
  password: string
}

export interface ClassType {
  type: 'Z' | 'J'
  grade: number
  year: number
  class: number
  number: number
}

export interface UserActivityTimeSums {
  'on-campus': number
  'off-campus': number
  'social-practice': number
}
