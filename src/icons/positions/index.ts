import { default as StudentIcon } from './PhStudent.vue'
import { default as SecretaryIcon } from './IcBaselineClass.vue'
import { default as DepartmentIcon } from './MingcuteDepartmentFill.vue'
import { default as AuditorIcon } from './GuidanceAuditorium.vue'
import { default as InspectorIcon } from './MaterialSymbolsFrameInspect.vue'
import { default as AdminIcon } from './MaterialSymbolsAdminPanelSettings.vue'
import { default as SystemIcon } from './MaterialSymbolsLightSettings.vue'
import type { UserPosition } from '@zvms/zvms4-types'
import type { Component } from 'vue'

export const positions = {
  student: {
    icon: StudentIcon,
    value: 0,
    color: 'primary'
  },
  secretary: {
    icon: SecretaryIcon,
    value: 1,
    color: 'info'
  },
  department: {
    icon: DepartmentIcon,
    value: 2,
    color: 'warning'
  },
  auditor: {
    icon: AuditorIcon,
    value: 4,
    color: 'warning'
  },
  inspector: {
    icon: InspectorIcon,
    value: 8,
    color: 'success'
  },
  admin: {
    icon: AdminIcon,
    value: 16,
    color: 'danger'
  },
  system: {
    icon: SystemIcon,
    value: 32,
    color: 'danger'
  }
} as Record<
  UserPosition,
  {
    icon: Component
    value: number
    color: 'primary' | 'info' | 'warning' | 'success' | 'danger'
  }
>
