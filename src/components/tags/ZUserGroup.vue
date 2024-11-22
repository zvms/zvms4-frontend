<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useGroupsStore } from '@/stores/groups'
import { ZUserPosition } from '.'
import { ElButton } from 'element-plus'
import type { Group } from '@zvms/zvms4-types'
import { useRouter } from 'vue-router'

const props = withDefaults(
  defineProps<{
    group: string
    grouping?: boolean
  }>(),
  {
    grouping: true
  }
)
const groups = useGroupsStore()
const router = useRouter()
const { group, grouping } = toRefs(props)
const groupData = ref<Group>()
const error = ref(false)
const loading = ref(true)

groups.fetchGroup(group.value).then((result) => {
  if (!result) {
    error.value = true
  } else {
    groupData.value = result
  }
  loading.value = false
})

function openGroup() {
  router.push(`/group/${groupData.value?._id}`)
}
</script>

<template>
  <ZUserPosition
    v-if="!loading && !error"
    :position="groupData?.permissions ?? []"
    :group="grouping"
    :text="groupData?.name"
    @dblclick="openGroup"
  />
  <ElButton v-else loading text bg round size="small" type="info">Loading...</ElButton>
</template>
