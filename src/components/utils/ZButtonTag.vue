<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ElButton, ElTooltip } from 'element-plus'
import { toRefs, type Component as VueComponent } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { Remove } from '@element-plus/icons-vue'

const { t } = useI18n()
const { width, height } = useWindowSize()

const props = defineProps<{
  size?: 'large' | 'default' | 'small'
  type?: 'primary' | 'warning' | 'success' | 'danger' | 'info' | ''
  icon?: VueComponent
  unknown?: boolean
  force?: 'full' | 'short'
  onlyDisplayIcon?: boolean
}>()

const { size, type, icon, unknown, force, onlyDisplayIcon } = toRefs(props)
</script>

<template>
  <ElButton
    v-if="
      ((!unknown && width > height * 1.5 && force !== 'short') || force === 'full')
    "
    :icon="icon"
    :type="type"
    :size="size ?? 'small'"
    text
    bg
    round
  >
    <slot></slot>
  </ElButton>
  <ElTooltip v-else-if="!unknown || force === 'short'" :effect="'light'">
    <template #content>
      <slot></slot>
    </template>
    <ElButton
      :icon="icon"
      :type="type"
      :size="size ?? 'small'"
      :circle="!onlyDisplayIcon"
      :round="onlyDisplayIcon"
      text
      bg
    />
  </ElTooltip>
  <ElButton
    v-else-if="!onlyDisplayIcon"
    type="danger"
    :icon="Remove"
    :size="size ?? 'small'"
    text
    bg
  >
    {{ t('activity.type.unknown') }}
  </ElButton>
  <ElButton v-else type="danger" :icon="Remove" :size="size ?? 'small'" text bg />
</template>
