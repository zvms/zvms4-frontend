import type { Component } from 'vue'
import type {
  ActivityType,
  SpecialActivityClassification,
  ActivityMode,
  ActivityStatus,
  MemberActivityStatus
} from '@zvms/zvms4-types'
import {
  Vacation,
  School,
  CityGate,
  Appointment,
  Star,
  Association,
  Data,
  Other
} from '@icon-park/vue-next'
import { memberActivityStatuses } from '@/icons/status'
import { Minus, Trophy, User } from '@element-plus/icons-vue'

interface IconAndColor {
  icon: Component
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

type set = 'mode' | 'status' | 'type' | 'specials' | 'member'
type typing =
  | ActivityMode
  | ActivityStatus
  | ActivityType
  | SpecialActivityClassification
  | MemberActivityStatus

export default {
  mode: {
    'on-campus': {
      icon: School,
      color: 'primary'
    },
    'off-campus': {
      icon: CityGate,
      color: 'success'
    },
    'social-practice': {
      icon: Vacation,
      color: 'warning'
    }
  } as Record<ActivityMode, IconAndColor>,
  status: {
    pending: memberActivityStatuses.pending,
    effective: memberActivityStatuses.effective,
    refused: memberActivityStatuses.refused
  } as Record<ActivityStatus, IconAndColor>,
  type: {
    specified: {
      color: 'primary',
      icon: Appointment
    },
    social: {
      color: 'success',
      icon: Association
    },
    scale: {
      color: 'warning',
      icon: Vacation
    },
    special: {
      color: 'danger',
      icon: Star
    }
  } as Record<ActivityType, IconAndColor>,
  specials: {
    prize: {
      color: 'success',
      icon: Trophy
    },
    import: {
      color: 'warning',
      icon: Data
    },
    club: {
      color: 'primary',
      icon: User
    },
    deduction: {
      color: 'danger',
      icon: Minus
    },
    other: {
      color: 'info',
      icon: Other
    }
  } as Record<SpecialActivityClassification, IconAndColor>,
  member: memberActivityStatuses as Record<MemberActivityStatus, IconAndColor>
} as Record<set, Record<typing, IconAndColor>>

export { type typing as TypeSet, type set as Set }
