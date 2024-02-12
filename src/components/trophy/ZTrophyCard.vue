<script setup lang="ts">
import type { Trophy } from '@zvms/zvms4-types'
import { toRefs } from 'vue'
import { ZButtonOrCard } from '..'
import { Trophy as TrophyIcon } from '@icon-park/vue-next'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

const props = withDefaults(
  defineProps<{
    trophy: Trophy
    mode?: 'card' | 'button'
  }>(),
  {
    mode: 'card'
  }
)
const { trophy, mode } = toRefs(props)
</script>

<template>
  <ZButtonOrCard size="small" :mode="mode" :icon="TrophyIcon" type="danger">
    <template #text>
      {{ trophy.name }}
    </template>
    <p class="text-lg">{{ trophy.name }}</p>
  </ZButtonOrCard>
</template>
