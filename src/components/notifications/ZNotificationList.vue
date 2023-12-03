<script setup lang="ts">
import { ElCard, ElTable, ElTableColumn } from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { ref, watch } from 'vue'
import type { BroadcastInstance } from '@/../@types/broadcast'
import api from '@/api'
import { useUserStore } from '@/stores/user'

const loading = ref(true)

const user = useUserStore()

// Deal with window size
const { width, height } = useWindowSize()
const tableMaxHeight = ref(height.value * 0.56)
watch(width, () => {
  tableMaxHeight.value = height.value * 0.56
})

const notifications = ref<BroadcastInstance[]>([])

console.log(api.notification)

api.notification.read.mine(user._id).then((res: BroadcastInstance[]) => {
  loading.value = false
  notifications.value = res ?? []
})
</script>

<template>
  <div :class="['card', 'pr-8', width < height ? 'pl-6' : '']" v-loading="loading">
    <ElCard shadow="never" :data="notifications">
      <ElTable>
        <ElTableColumn type="expand" label="Title">
          <template #default="{ row }">
            <strong>{{ row.title }}</strong>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>
