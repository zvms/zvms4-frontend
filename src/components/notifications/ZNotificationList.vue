<script setup lang="ts">
import { ElCard } from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { ref, watch } from 'vue'
import dayjs from 'dayjs'
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
