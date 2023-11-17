<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { Appointment, Star, Association, Vacation } from '@icon-park/vue-next'
import { ElButton, ElTooltip } from 'element-plus'
import { ref, toRefs, type Component as VueComponent } from 'vue'
import { useWindowSize } from '@vueuse/core'

const { t } = useI18n()
const { width, height } = useWindowSize()

type ActivityType = 'specified' | 'special' | 'off-campus' | 'scale'

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
  <ElButton
    v-if="(effective && width > height * 1.2) || mode === 'full'"
    :icon="types[type as ActivityType].icon"
    :type="types[type as ActivityType].color"
    :size="size ?? 'small'"
    text
    bg
    round
  >
    {{ t(`activity.type.${type}.short`) }}
  </ElButton>
  <ElTooltip v-else-if="effective || mode === 'icon'" :content="t(`activity.type.${type}.short`)">
    <ElButton
      :icon="types[type as ActivityType].icon"
      :type="types[type as ActivityType].color"
      :size="size ?? 'small'"
      circle
      text
      bg
    />
  </ElTooltip>
  <ElButton v-else type="danger" :size="size" text>
    {{ t('activity.type.unknown') }}
  </ElButton>
</template>
