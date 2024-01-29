<script lang="ts" setup>
import type { ActivityMode } from '@zvms/zvms4-types'
import { Vacation, School, CityGate } from '@icon-park/vue-next'
import type { Component as VueComponent } from 'vue'
import { ZButtonTag } from '@/components'
import { useI18n } from 'vue-i18n'
import { toRefs } from 'vue'

const { t } = useI18n()

const props = defineProps<{
  mode?: ActivityMode
  size?: 'large' | 'default' | 'small'
  force?: 'full' | 'short'
}>()

const { mode, size, force } = toRefs(props)

const modes: Record<
  ActivityMode,
  {
    icon: VueComponent
    color: 'primary' | 'warning' | 'success'
  }
> = {
  'on-campus': {
    icon: School,
    color: 'primary'
  },
  'off-campus': {
    icon: CityGate,
    color: 'success'
  },
  'large-scale': {
    icon: Vacation,
    color: 'warning'
  }
}
</script>

<template>
  <ZButtonTag
    :size="size ?? 'small'"
    :type="modes[mode as ActivityMode].color"
    :icon="modes[mode as ActivityMode].icon"
    :unknown="!mode || !(mode in modes)"
    :force="force"
  >
    {{ t(`activity.mode.${mode}.short`) }}
  </ZButtonTag>
</template>
