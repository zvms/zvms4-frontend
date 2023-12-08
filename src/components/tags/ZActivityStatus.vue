<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { toRefs } from 'vue'
import type { MemberActivityStatus } from '@/../@types/activity'
import { ZButtonTag } from '@/components'
import classifications from './classifications'

const { t } = useI18n()

const props = defineProps<{
  type?: MemberActivityStatus
  size?: 'large' | 'default' | 'small'
  color?: boolean
  force?: 'full' | 'short'
}>()

const { type, size } = toRefs(props)

const effective = type?.value! in classifications.member
</script>

<template>
  <ZButtonTag
    :size="size ?? 'small'"
    :type="classifications.member[type as MemberActivityStatus].color"
    :icon="classifications.member[type as MemberActivityStatus].icon"
    :unknown="!effective"
    :force="force"
  >
    {{ t('activity.status.' + type) }}
  </ZButtonTag>
</template>
