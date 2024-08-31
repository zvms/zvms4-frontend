<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { toRefs } from 'vue'
import { ZButtonTag } from '@/components'
import classifications from './classifications'
import type { TypeSet, Set } from './classifications'

const { t } = useI18n()

const props = defineProps<{
  type?: TypeSet,
  set: Set,
  size?: 'large' | 'default' | 'small'
  color?: boolean
  i18n: string
}>()

const { type, size, set } = toRefs(props)

const effective = type?.value && type?.value in classifications[set.value]
</script>

<template>
  <ZButtonTag
    :size="size ?? 'small'"
    :type="classifications[set][type as TypeSet].color"
    :icon="classifications[set][type as TypeSet].icon"
    :unknown="!effective"
  >
    {{ t(i18n.replace('{type}', type ?? '')) }}
  </ZButtonTag>
</template>
