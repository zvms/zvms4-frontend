<script setup lang="ts">
import { ElCard, ElButton, ElPagination, ElRow, ElCol, ElScrollbar } from 'element-plus'
import { Clock } from '@element-plus/icons-vue'
import { onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs'
import type { NotificationInstance } from '@zvms/zvms4-types'
import api from '@/api'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import ZActivityMember from '@/components/activity/ZActivityMember.vue'
import { useWindowSize } from '@vueuse/core'
import { OouiUserAnonymous } from '@/icons'

const { t } = useI18n()

const user = useUserStore()
const { height } = useWindowSize()

const minHeight = ref(height.value * 0.68 + 'px')

watch(height, () => (minHeight.value = height.value * 0.68 + 'px'))

const sliceLength = 8
const sliceNotification = (unsliced: NotificationInstance[]) => {
  if (unsliced.length <= sliceLength) return [unsliced]
  const res = []
  for (let i = 0; i <= unsliced.length - sliceLength; i += 10) res.push(unsliced.slice(i, i + 10))
  return res
}

const notifications = ref<Array<NotificationInstance[]>>([])
const pageIndex = ref(1) // Start from 1

const getNotifications = (mode: 'global' | 'personal') => {
  if (mode === 'personal')
    api.notification.read.mine(user._id).then((res) => {
      notifications.value = sliceNotification(res ?? [])
    })
  else
    api.notification.read.global().then((res) => {
      notifications.value = sliceNotification(res ?? [])
    })
}

const props = defineProps<{
  refresh: number
  mode: 'global' | 'personal'
}>()
watch(props, () => {
  getNotifications(props.mode)
  console.log(notifications.value, 'notifications')
})

onMounted(() => getNotifications(props.mode))
</script>

<template>
  <div class="p-5">
    <ElScrollbar :height="minHeight">
      <div v-for="(item, index) in notifications[pageIndex - 1]" :key="index" class="p-2">
        <ElCard shadow="hover" class="p-1">
          <div class="flex justify-between p-2 pl-0">
            <span class="font-bold text-xl">{{ item.title }}</span>
            <ZActivityMember v-if="!item.anonymous" :id="item.publisher" />
            <ZActivityMember
              v-else-if="user.position.includes('admin')"
              :icon="OouiUserAnonymous"
              type="info"
              :id="item.publisher"
            />
            <ElButton v-else type="info" text bg size="small" :icon="OouiUserAnonymous" circle />
          </div>
          <div>{{ item.content }}</div>
          <div class="p-3 float-right">
            <span :icon="Clock"></span> {{ dayjs(item.time).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
        </ElCard>
      </div>
      <div v-if="notifications.length == 0" class="text-center my-10 text-lg op-70">
        {{ t('notification.home.empty') }}
      </div>
    </ElScrollbar>
    <div class="flex justify-center mt-3">
      <ElPagination
        background
        hide-on-single-page
        layout="total, prev, pager, next, jumper"
        v-model:current-page="pageIndex"
        :total="notifications.length * 10"
      />
    </div>
  </div>
</template>
