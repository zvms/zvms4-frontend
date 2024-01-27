<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { toRefs } from 'vue'
import type {
  ActivityType,
  SpecialActivityClassification,
  ActivityStatus
} from '@/../@types/activity'
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
  }>(),
  {
    special: 'other',
    showSpecial: true,
    size: 'small',
    color: true,
    mode: 'auto'
  }
)

const { type, size, mode, special, status, showSpecial, force } = toRefs(props)

const types = classifications.type

const effective = type?.value! in types

console.log(type, showSpecial, force, effective)
</script>

<template>
  <ElButtonGroup>
    <ZButtonTag
      :size="size ?? 'small'"
      :type="types[type as ActivityType].color"
      :icon="types[type as ActivityType].icon"
      :unknown="!effective"
      :force="force"
    >
      {{ t(`activity.type.${type}.${mode === 'full' ? 'name' : 'short'}`) }}
    </ZButtonTag>
    <ZSpecialActivityClassify
      v-if="special && showSpecial && type === 'special'"
      :classify="special ?? 'other'"
      :size="size"
      :force="force"
      :mode="mode"
    />
    <ZActivityStatus v-if="status" :type="status" :force="force" />
  </ElButtonGroup>
</template>
