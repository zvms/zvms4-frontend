<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { toRefs } from 'vue'
import { memberActivityStatuses } from '@/icons/status'
import type { MemberActivityStatus } from '@/../@types/activity'
import { ZButtonTag } from '@/components'

const { t } = useI18n()

const props = defineProps<{
  type?: MemberActivityStatus
  size?: 'large' | 'default' | 'small'
  color?: boolean
}>()

const { type, size } = toRefs(props)

const effective = type?.value! in memberActivityStatuses
</script>

<template>
  <ZButtonTag
    :size="size ?? 'small'"
    :type="memberActivityStatuses[type as MemberActivityStatus].color"
    :icon="memberActivityStatuses[type as MemberActivityStatus].icon"
    :unknown="!effective"
  >
    {{ t('activity.status.' + type) }}
  </ZButtonTag>
</template>
