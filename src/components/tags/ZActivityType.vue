<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { toRefs } from 'vue'
import type { ActivityType, SpecialActivityClassification } from '@/../@types/activity'
import { ZButtonTag } from '@/components'
import { ZSpecialActivityClassify } from '@/components'
import { ElButtonGroup } from 'element-plus'
import classifications from './classifications'

const { t } = useI18n()

const props = defineProps<{
  type: ActivityType
  special?: SpecialActivityClassification
  showSpecial?: boolean
  size?: 'large' | 'default' | 'small'
  color?: boolean
  mode?: 'auto' | 'full' | 'icon'
}>()

const { type, size, mode, special } = toRefs(props)

const types = classifications.type

const effective = type?.value! in types
</script>

<template>
  <ZButtonTag
    v-if="type !== 'special' || !showSpecial"
    :size="size ?? 'small'"
    :type="types[type as ActivityType].color"
    :icon="types[type as ActivityType].icon"
    :unknown="!effective"
  >
    {{ t(`activity.type.${type}.${mode === 'full' ? 'name' : 'short'}`) }}
  </ZButtonTag>
  <ElButtonGroup v-else>
    <ZButtonTag :size="size ?? 'small'" type="danger" :icon="classifications.type.special.icon">
      {{ t(`activity.type.special.${mode === 'full' ? 'name' : 'short'}`) }}
    </ZButtonTag>
    <ZSpecialActivityClassify :classify="special ?? 'other'" :size="size" :mode="mode" />
  </ElButtonGroup>
</template>
