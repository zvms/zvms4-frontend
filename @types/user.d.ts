export interface User<T = string> {
  _id: T
  id: number
  name: string
  sex: 'male' | 'female' | 'unknown'
  position: UserPosition[]
  // class: ClassType
  code: number
}

export type UserPosition = 'system' | 'admin' | 'auditor' | 'department' | 'secretary' | 'student'

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
