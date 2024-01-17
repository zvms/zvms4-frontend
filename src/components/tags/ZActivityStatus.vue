<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { toRefs } from 'vue'
import type { MemberActivityStatus } from '@/../@types/activity'
import { ZButtonTag } from '@/components'
import classifications from './classifications'
import { ElPopover, ElButton } from 'element-plus'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    type?: MemberActivityStatus
    size?: 'large' | 'default' | 'small'
    color?: boolean
    force?: 'full' | 'short'
    modifiable?: boolean
  }>(),
  {
    type: 'effective',
    size: 'small',
    color: true,
    modifiable: false
  }
)

const { type, size } = toRefs(props)

const effective = type?.value! in classifications.member
</script>

<template>
  <ZButtonTag
    v-if="!modifiable || type !== 'pending'"
    :size="size ?? 'small'"
    :type="classifications.member[type].color"
    :icon="classifications.member[type].icon"
    :unknown="!effective"
    :force="force"
  >
    {{ t('activity.status.' + type) }}
  </ZButtonTag>
  <ElPopover v-else></ElPopover>
</template>
