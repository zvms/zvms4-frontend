<script setup lang="ts">
import { ElCard, ElButton } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { useWindowSize } from '@vueuse/core'
import { ref, watch } from 'vue'
import dayjs from 'dayjs'
import type { BroadcastInstance } from '@/../@types/broadcast'
import api from '@/api'
import { useUserStore } from '@/stores/user'
import ZActivityMember from '@/components/activity/ZActivityMember.vue'

const loading = ref(true)

const user = useUserStore()

// Deal with window size
const { width, height } = useWindowSize()
const tableMaxHeight = ref(height.value * 0.56)
watch(width, () => {
  tableMaxHeight.value = height.value * 0.56
})

const notifications = ref<BroadcastInstance[]>([])

const getNotifications = () => {
  loading.value = true
  api.notification.read.mine(user._id).then((res) => {
    loading.value = false
    notifications.value = res ?? []
  })
}

const refresh = () => {
  getNotifications()
}

getNotifications()
</script>

<template>
  <div class="p-5">
    <div class="flex justify-end">
      <ElButton @click="refresh" circle class="p-1" :icon="Refresh" />
    </div>
    <div v-loading="loading">
      <div v-for="(item, index) in notifications" :key="index" class="p-2">
        <ElCard shadow="hover" class="p-2">
          <div class="flex justify-between p-2 pl-0">
            <span class="font-bold text-xl">{{ item.title }}</span>
            <ZActivityMember v-if="item.publisher" id="item.publisher" />
            <span v-if="!item.publisher">匿名</span>
          </div>
          <div>{{ item.content }}</div>
          <div class="p-3 float-right">at {{ dayjs(item.time).format('YYYY-MM-DD HH:mm:ss') }}</div>
        </ElCard>
      </div>
    </div>
  </div>
</template>
