<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ElButton } from 'element-plus'
import { toRefs } from 'vue'
import { statuses } from '@/icons/status'
import type { MemberActivityStatus } from '@/../@types/activity'

const { t } = useI18n()

const props = defineProps<{
  type?: MemberActivityStatus
  size?: 'large' | 'default' | 'small'
  color?: boolean
}>()

const { type, size } = toRefs(props)

console.log(type)

const effective = type?.value! in statuses
</script>

<template>
  <ElButton
    v-if="effective"
    :icon="statuses[type as MemberActivityStatus].icon"
    :type="statuses[type as MemberActivityStatus].color"
    :size="size ?? 'small'"
    text
    bg
  >
    {{ t('activity.status.' + type) }}
  </ElButton>
  <ElButton v-else type="danger" :size="size" text>
    {{ t('activity.status.unknown') }}
  </ElButton>
</template>
