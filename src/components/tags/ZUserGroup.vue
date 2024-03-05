<script setup lang="ts">
import { ref, toRefs } from 'vue'
import api from '@/api'
import { ZUserPosition } from '.'
import { ElSkeletonItem } from 'element-plus'
import type { Group } from '@zvms/zvms4-types'
const props = withDefaults(defineProps<{
  group: string
  grouping?: boolean
}>(), {
  grouping: true
})

const { group, grouping } = toRefs(props)
const groupData = ref<Group>()
const error = ref(false)
const loading = ref(true)

api.group.readOne(group.value).then((result) => {
  if (!result) {
    error.value = true
  } else {
    groupData.value = result
  }
  loading.value = false
})
</script>

<template>
  <ZUserPosition v-if="!loading && !error" :position="groupData?.permissions ?? []" :group="grouping" :text="groupData?.name" />
  <ElSkeletonItem variant="text" style="width: 72px" v-else />
</template>
