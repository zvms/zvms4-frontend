import { ObjectId } from 'mongodb'

export interface User<T=ObjectId> {
  _id: T
  id: number
  name: string
  sex: 'male' | 'female' | 'unknown'
  position: UserPosition[]
  class: ClassType
}

export type UserPosition = 'admin' | 'inspector' | 'auditor' | 'secretary' | 'student'

export interface WithPassword<T> extends T {
  password: string
}

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
  onCampus: number
  offCampus: number
  largeScale: number
}
