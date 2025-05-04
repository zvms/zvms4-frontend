import { default as StudentIcon } from './PhStudent.vue'
import { default as SecretaryIcon } from './IcBaselineClass.vue'
import { default as DepartmentIcon } from './MingcuteDepartmentFill.vue'
import { default as AdminIcon } from './MaterialSymbolsAdminPanelSettings.vue'
import type { UserPosition } from '@/../types'
import type { Component } from 'vue'

export const positions = {
  student: {
    icon: StudentIcon,
    color: 'primary'
  },
  secretary: {
    icon: SecretaryIcon,
    color: 'info'
  },
  department: {
    icon: DepartmentIcon,
    color: 'warning'
  },
  admin: {
    icon: AdminIcon,
    color: 'danger'
  }
} as Record<
  UserPosition,
  {
    icon: Component
    color: 'primary' | 'info' | 'warning' | 'success' | 'danger'
  }
>
