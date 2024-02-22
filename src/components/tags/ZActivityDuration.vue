<script setup lang="ts">
import type { ActivityMode, MemberActivityStatus } from '@zvms/zvms4-types'
import { toRefs } from 'vue'
import { ZActivityMode, ZActivityStatus } from '@/components'
import { ElButton, ElButtonGroup } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'

const props = defineProps<{
  mode?: ActivityMode
  duration: number
  force?: 'short' | 'full'
  status?: MemberActivityStatus
}>()

const { mode, duration, force, status } = toRefs(props)
</script>

<template>
  <ElButtonGroup>
    <ZActivityMode :force="force" :mode="mode" />
    <ElButton text :icon="force === 'full' ? Timer : undefined" bg round size="small" type="info">
      {{ duration }} h
    </ElButton>
    <ZActivityStatus :force="force" v-if="status" :type="status" />
  </ElButtonGroup>
</template>
