<script setup lang="ts">
import { ElCard, ElButton, ElPagination } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { ref } from 'vue'
import dayjs from 'dayjs'
import type { BroadcastInstance } from '@/../@types/broadcast'
import api from '@/api'
import { useUserStore } from '@/stores/user'
import ZActivityMember from '@/components/activity/ZActivityMember.vue'

const user = useUserStore()

const sliceLength = 8
const sliceNotification = (unsliced: BroadcastInstance[]) => {
  if (unsliced.length <= sliceLength) return [unsliced]
  const res = []
  for (let i = 0; i <= unsliced.length - sliceLength; i += 10) res.push(unsliced.slice(i, i + 10))
  return res
}

const notifications = ref<Array<BroadcastInstance[]>>([])
const pageIndex = ref(1) // Start from 1

const getNotifications = () => {
  api.notification.read.mine(user._id).then((res) => {
    notifications.value = sliceNotification(res ?? [])
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
    <div>
      <div v-for="(item, index) in notifications[pageIndex - 1]" :key="index" class="p-2">
        <ElCard shadow="hover" class="p-1">
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
    <div class="flex justify-center mt-3">
      <ElPagination
        background
        hide-on-single-page
        layout="prev, pager, next"
        v-model:current-page="pageIndex"
        :total="notifications.length * 10"
      />
    </div>
  </div>
</template>
