import MaterialSymbolsBoxEdit from './MaterialSymbolsBoxEdit.vue'
import { Check, Close, Edit, CaretLeft } from '@element-plus/icons-vue'
import { Loading } from '@icon-park/vue-next'
import type { MemberActivityStatus } from '@/../@types/activity'
import type { Component } from 'vue'

export const statuses = {
  draft: {
    icon: Edit,
    color: 'info'
  },
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
  },
  rejected: {
    icon: CaretLeft,
    color: 'warning'
  }
} as Record<
  MemberActivityStatus,
  {
    icon: Component
    color: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
  }
>
