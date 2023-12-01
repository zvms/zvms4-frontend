<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { Appointment, Star, Association, Vacation } from '@icon-park/vue-next'
import { ref, toRefs, type Component as VueComponent } from 'vue'
import type { ActivityType, SpecialActivityClassification } from '@/../@types/activity'
import { ZButtonTag } from '@/components'
import { ZSpecialActivityClassify } from '@/components'
import { ElButtonGroup } from 'element-plus'

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

const types = ref<
  Record<string, { color: 'primary' | 'warning' | 'success' | 'danger'; icon: VueComponent }>
>({
  specified: {
    color: 'primary',
    icon: Appointment
  },
  social: {
    color: 'success',
    icon: Association
  },
  scale: {
    color: 'warning',
    icon: Vacation
  },
  special: {
    color: 'danger',
    icon: Star
  }
})

const effective = type?.value! in types.value
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
    <ZButtonTag :size="size ?? 'small'" type="danger" :icon="Star">
      {{ t(`activity.type.special.${mode === 'full' ? 'name' : 'short'}`) }}
    </ZButtonTag>
    <ZSpecialActivityClassify :classify="special ?? 'other'" :size="size" :mode="mode" />
  </ElButtonGroup>
</template>
