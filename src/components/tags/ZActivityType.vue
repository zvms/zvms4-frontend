<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { toRefs } from 'vue'
import type { ActivityType, SpecialActivityClassification, ActivityStatus } from '@zvms/zvms4-types'
import { ZButtonTag } from '@/components'
import { ZSpecialActivityClassify, ZActivityStatus } from '@/components'
import { ElButtonGroup } from 'element-plus'
import classifications from './classifications'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    type: ActivityType
    special?: SpecialActivityClassification
    showSpecial?: boolean
    size?: 'large' | 'default' | 'small'
    color?: boolean
    mode?: 'auto' | 'full' | 'icon'
    force?: 'full' | 'short'
    status?: ActivityStatus
    bg?: boolean
  }>(),
  {
    special: 'other',
    showSpecial: true,
    size: 'small',
    color: true,
    mode: 'auto',
    bg: true
  }
)

const { type, size, mode, special, status, showSpecial, force, bg } = toRefs(props)

const types = classifications.type

const effective = type?.value! in types
</script>

<template>
  <ElButtonGroup>
    <ZButtonTag
      :size="size ?? 'small'"
      :type="types[type as ActivityType].color"
      :icon="types[type as ActivityType].icon"
      :unknown="!effective"
      :force="force"
      :bg="bg"
    >
      {{ t(`activity.type.${type}.${mode === 'full' ? 'name' : 'short'}`) }}
    </ZButtonTag>
    <ZSpecialActivityClassify
      v-if="special && showSpecial && type === 'special'"
      :classify="special ?? 'other'"
      :size="size"
      :force="force"
      :mode="mode"
      :bg="bg"
    />
    <ZActivityStatus v-if="status" :type="status" :force="force" />
  </ElButtonGroup>
</template>
