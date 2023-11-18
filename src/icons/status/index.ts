import MaterialSymbolsAppRegistration from './MaterialSymbolsAppRegistration.vue'
import MaterialSymbolsBoxEdit from './MaterialSymbolsBoxEdit.vue'
import { Check, Close, Edit } from '@element-plus/icons-vue'
import { Loading } from '@icon-park/vue-next'
import type { MemberActivityStatus } from '@/../@types/activity'
import type { Component } from 'vue'

export const statuses = {
  registered: {
    icon: MaterialSymbolsAppRegistration,
    color: 'success'
  },
  draft: {
    icon: Edit,
    color: 'info'
  },
  'first-instance': {
    icon: Loading,
    color: 'primary'
  },
  'first-instance-rejected': {
    icon: MaterialSymbolsBoxEdit,
    color: 'warning'
  },
  'last-instance': {
    icon: Loading,
    color: 'primary'
  },
  effective: {
    icon: Check,
    color: 'success'
  },
  rejected: {
    icon: Close,
    color: 'danger'
  },
  'last-instance-rejected': {
    icon: MaterialSymbolsBoxEdit,
    color: 'warning'
  }
} as Record<
  MemberActivityStatus,
  {
    icon: Component
    color: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
  }
>
