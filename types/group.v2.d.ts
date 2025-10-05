import { UserPosition } from './user.v2'

export interface Group {
  _id: string // ObjectId
  name: string
  type: 'class' | 'permission' | 'group' | 'club'
  description: string
  /**
   * @description The ID of the person in charge of the group
   */
  charge: string
  /**
   * @description The ID of the person who is responsible to contact with the group
   */
  contact: string
  permissions: UserPosition[]
  categories: string[]
}

/**
 * @description Only used for statistical analysis
 */
export interface Category {
  _id: string
  type: 'grade' | 'class' | 'organization'
  name: string
  description: string
}
