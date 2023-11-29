<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { Appointment, Star, Association, Vacation } from '@icon-park/vue-next'
import { ref, toRefs, type Component as VueComponent } from 'vue'
import type { ActivityType } from '@/../@types/activity'
import { ZButtonTag } from '@/components'

const { t } = useI18n()

const props = defineProps<{
  type: ActivityType
  size?: 'large' | 'default' | 'small'
  color?: boolean
  mode?: 'auto' | 'full' | 'icon'
}>()

const { type, size, mode } = toRefs(props)

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
    :size="size ?? 'small'"
    :type="types[type as ActivityType].color"
    :icon="types[type as ActivityType].icon"
    :unknown="!effective"
  >
    {{ t(`activity.type.${type}.${mode === 'full' ? 'name' : 'short'}`) }}
  </ZButtonTag>
</template>
