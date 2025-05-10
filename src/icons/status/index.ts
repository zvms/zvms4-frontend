import { Check, Close, Edit, CaretLeft } from '@element-plus/icons-vue'
import { Loading } from '@icon-park/vue-next'
import type { MemberActivityStatus } from '@/../types'
import type { Component } from 'vue'

export const memberActivityStatuses = {
  pending: {
    icon: Loading,
    color: 'primary'
  },
  effective: {
    icon: Check,
    color: 'success'
  },
  refused: {
    icon: Close,
    color: 'danger'
  }
} as Record<
  MemberActivityStatus,
  {
    icon: Component
    color: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  }
>
