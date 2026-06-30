<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ref, toRefs } from 'vue'
import { ZButtonTag } from '@/components'
import classifications from './classifications'
import type { TypeSet, Set } from './classifications'

const { t } = useI18n()

const props = defineProps<{
  type?: TypeSet
  set: Set
  size?: 'large' | 'default' | 'small'
  color?: boolean
  i18n: string
}>()

const { type, size, set } = toRefs(props)

const type_ = ref(type.value as TypeSet)

const effective = type?.value && type?.value in classifications[set.value]
</script>

<template>
  <ZButtonTag
    :size="size ?? 'small'"
    :type="classifications[set][type_].color"
    :icon="classifications[set][type_].icon"
    :unknown="!effective"
  >
    {{ t(i18n.replace('{type}', type ?? '')) }}
  </ZButtonTag>
</template>
