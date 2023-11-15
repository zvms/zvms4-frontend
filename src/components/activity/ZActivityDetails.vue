<script lang="ts" setup>
import type { ActivityInstance } from '@/../@types/activity'
import { ElCard } from 'element-plus'
import { toRefs } from 'vue'

const props = defineProps<{
  activity: ActivityInstance
}>()

const { activity } = toRefs(props)
</script>

<template>
  <ElCard shadow="hover"> </ElCard>
</template>
