import type { Component } from 'vue'
import type {
  ActivityType,
  SpecialActivityClassification,
  ActivityMode,
  ActivityStatus,
  MemberActivityStatus, CreateActivityType
} from '@/../types'
import {
  Vacation,
  School,
  CityGate,
  Star,
  Data,
  Other,
  Merge
} from '@icon-park/vue-next'
import { memberActivityStatuses } from '@/icons/status'
import { Trophy, Upload, User } from '@element-plus/icons-vue'
import { LucideWorkflow } from '@/icons'

interface IconAndColor {
  icon: Component
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

type set = 'mode' | 'status' | 'type' | 'specials' | 'member' | 'create'
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
    effective: memberActivityStatuses.effective,
  } as Record<ActivityStatus, IconAndColor>,
  type: {
    specified: {
      color: 'primary',
      icon: School
    },
    social: {
      color: 'success',
      icon: CityGate
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
  create: {
    normal: {
      color: 'primary',
      icon: LucideWorkflow,
    },
    merge: {
      color: 'success',
      icon: Merge
    },
    upload: {
      color: 'warning',
      icon: Upload
    },
    special: {
      color: 'danger',
      icon: Star
    }
  } as Record<CreateActivityType, IconAndColor>,
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
    other: {
      color: 'info',
      icon: Other
    }
  } as Record<SpecialActivityClassification, IconAndColor>,
  member: memberActivityStatuses as Record<MemberActivityStatus, IconAndColor>
} as Record<set, Record<typing, IconAndColor>>

export { type typing as TypeSet, type set as Set }
