<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { Appointment, Star, Association, Vacation } from '@icon-park/vue-next'
import { ElButton } from 'element-plus'
import { ref, toRefs, type Component as VueComponent } from 'vue'

const { t } = useI18n()

type ActivityType = 'specified' | 'special' | 'off-campus' | 'scale'

const props = defineProps<{
  type?: ActivityType
  size?: 'large' | 'default' | 'small'
  color?: boolean
}>()

const { type, size } = toRefs(props)

const types = ref<
  Record<string, { color: 'primary' | 'warning' | 'success' | 'danger'; icon: VueComponent }>
>({
  specified: {
    color: 'primary',
    icon: Appointment
  },
  special: {
    color: 'warning',
    icon: Star
  },
  'off-campus': {
    color: 'success',
    icon: Association
  },
  scale: {
    color: 'danger',
    icon: Vacation
  }
})

const effective = type?.value! in types.value
</script>

<template>
  <ElButton
    v-if="effective"
    :icon="types[type as ActivityType].icon"
    :type="types[type as ActivityType].color"
    :size="size ?? 'small'"
    text
    bg
  >
    {{ t('activity.columns.shorts.' + type) }}
  </ElButton>
  <ElButton v-else type="danger" :size="size" text bg>
    {{ t('activity.columns.shorts.unknown') }}
  </ElButton>
</template>
