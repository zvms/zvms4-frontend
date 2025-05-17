export interface Activity {
  _id: string
  type: 'on-campus' | 'off-campus' | 'social-practice' | 'hybrid'
  name: string
  description: string
  date: string
  createdAt: string
  updatedAt: string
  /**
   * @description The ID of the user who is responsible to the activity
   */
  appointee: string
  /**
   * @description Either the ID of the user who approved the activity or explicitly stated as school "authority."
   */
  approver: string | 'authority' | 'member'
  creator: string
  status: 'pending' | 'effective' | 'refused'
  place: string
  origin: 'prize' | 'labor' | 'club' | 'organization' | 'activity' | 'import' | 'other'
}

/**
 * @description From V2, the activity member will separate from the activity.
 */
export interface ActivityMember {
  _id: string
  member: string
  activity: string
  status: 'effective' | 'refused' | 'pending'
  mode: 'on-campus' | 'off-campus' | 'social-practice'
  duration: number
}
