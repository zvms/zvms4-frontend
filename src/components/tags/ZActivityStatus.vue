<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ElButton, ElTooltip } from 'element-plus'
import { toRefs } from 'vue'
import { statuses } from '@/icons/status'
import type { MemberActivityStatus } from '@/../@types/activity'
import { useWindowSize } from '@vueuse/core'

const { t } = useI18n()
const { width, height } = useWindowSize()

const props = defineProps<{
  type?: MemberActivityStatus
  size?: 'large' | 'default' | 'small'
  color?: boolean
}>()

const { type, size } = toRefs(props)

const effective = type?.value! in statuses
</script>

<template>
  <ElButton
    v-if="effective && width > height * 1.5"
    :icon="statuses[type as MemberActivityStatus].icon"
    :type="statuses[type as MemberActivityStatus].color"
    :size="size ?? 'small'"
    text
    bg
    round
  >
    {{ t('activity.status.' + type) }}
  </ElButton>
  <ElTooltip v-else-if="effective" :content="t('activity.status.' + type)" :effect="'light'">
    <ElButton
      v-if="(type?.includes('first') || type?.includes('last')) && width > height * 0.8"
      :icon="statuses[type as MemberActivityStatus].icon"
      :type="statuses[type as MemberActivityStatus].color"
      :size="size ?? 'small'"
      round
      text
      bg
      >{{
        type?.includes('first') ? t('activity.status.steps.first') : t('activity.status.steps.last')
      }}</ElButton
    >
    <ElButton
      v-else
      :icon="statuses[type as MemberActivityStatus].icon"
      :type="statuses[type as MemberActivityStatus].color"
      :size="size ?? 'small'"
      circle
      text
      bg
    />
  </ElTooltip>
  <ElButton v-else type="danger" :size="size" text>
    {{ t('activity.status.unknown') }}
  </ElButton>
</template>
