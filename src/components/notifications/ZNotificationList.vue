<script setup lang="ts">
import { ElCard, ElTable, ElTableColumn } from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { ref, watch } from 'vue'
import dayjs from 'dayjs'
import { getMyNotifications } from '@/api/notifications/read'
import type { Broadcast } from '@/../@types/broadcast'
import type { Ref } from 'vue'

const loading = ref(true)

// Deal with window size
const { width, height } = useWindowSize()
const tableMaxHeight = ref(height.value * 0.56)
watch(width, () => {
  tableMaxHeight.value = height.value * 0.56
})

const notifications: Ref<Broadcast[]> = ref([])

getMyNotifications('0').then((res) => {
  loading.value = false
  notifications.value = (res as Broadcast[]) ?? []
})
</script>

<template>
  <div class="p-5" v-loading="loading">
    <div v-for="(item, index) in notifications" :key="index" class="p-2">
      <ElCard shadow="never">
        <div class="flex justify-between p-2">
          <span class="font-bold text-xl">{{ item.title }}</span>
          <span>{{ item.publisher ?? '匿名' }}</span>
        </div>
        <div>{{ item.content }}</div>
        <div class="p-3 float-right">at {{ dayjs(item.time).format('YYYY-MM-DD HH:mm:ss') }}</div>
      </ElCard>
    </div>
  </div>
</template>
