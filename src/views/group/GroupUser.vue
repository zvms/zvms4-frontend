<script lang="ts" setup>
import ZGroupUserList from '@/components/group/ZGroupUserList.vue'
import { useRoute } from 'vue-router'
import { ElPageHeader, ElSegmented } from 'element-plus'
import { ref, onMounted, watch } from 'vue'
import api from '@/api'
import type { Group } from '@zvms/zvms4-types'
import { useWindowSize } from '@vueuse/core'
import { ArrowLeft } from '@element-plus/icons-vue'
import { ZActivityList } from '@/components'
import ZGroupUserTimeList from '@/components/group/ZGroupUserTimeList.vue'

const { height } = useWindowSize()

const group = ref<Group>()

const tableHeight = ref(height.value * 0.6)

const id = ref<string>('')

watch(height, () => {
  tableHeight.value = height.value * 0.6
})

onMounted(() => {
  api.group.readOne(id.value).then((res) => {
    group.value = res
  })
})

watch(id, () => {
  api.group.readOne(id.value).then((res) => {
    group.value = res
  })
})

const route = useRoute()

watch(() => route.params.id, (value) => {
  id.value = value as string
})

id.value = route.params.id as string

const tabs = ref([
  {
    label: 'Users',
    value: 'users',
  },
  {
    label: 'Activities',
    value: 'activities',
  },
  {
    label: 'Time',
    value: 'time',
  }
])
const tab = ref('users')
</script>

<template>
  <div class="px-16 py-8">

    <ElPageHeader v-if="group?._id" :icon="ArrowLeft" @back="() => $router.back()" class="py-4">
      <template #content>
        {{ group?.name }}
      </template>
      <template #extra>
        <ElSegmented v-model="tab" :options="tabs" />
      </template>
    </ElPageHeader>
    <ZGroupUserList v-if="tab === 'users'" :id="id" />
    <ZActivityList v-else-if="tab === 'activities'" :class-target="id" role="class" />
    <ZGroupUserTimeList v-else-if="tab === 'time'" :id="id" />
  </div>
</template>
