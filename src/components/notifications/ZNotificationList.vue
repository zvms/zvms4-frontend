<script setup lang="ts">
import { ElCard, ElButton, ElPagination, ElScrollbar, ElNotification } from 'element-plus'
import { Delete, ArrowRight } from '@element-plus/icons-vue'
import { onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs'
import type { NotificationInstance } from '@zvms/zvms4-types'
import api from '@/api'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import ZActivityMember from '@/components/activity/ZActivityMember.vue'
import ZNotificationContentDisplayer from './ZNotificationContentDisplayer.vue'
import { useWindowSize } from '@vueuse/core'
import { OouiUserAnonymous } from '@/icons'
import ZNotificationCard from './ZNotificationCard.vue'

const { t } = useI18n()
const user = useUserStore()
const { height } = useWindowSize()

const props = defineProps<{
  refresh: number
  mode: 'global' | 'personal'
  less: boolean
}>()

const minHeight = ref(height.value * 0.68 + 'px')
watch(height, () => (minHeight.value = height.value * 0.68 + 'px'))

const notifications = ref<NotificationInstance[]>([])
const pageIndex = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)

async function getNotifications(mode: 'global' | 'personal') {
  loading.value = true
  const lessLength = 3 // max length in UserHome
  try {
    if (mode === 'personal')
      await api.notification.read
        .mine(user._id, props.less ? 1 : pageIndex.value, props.less ? lessLength : pageSize.value)
        .then((res) => {
          notifications.value = res ? res.data : []
          total.value = res?.total || 0
        })
    else
      await api.notification.read
        .global(props.less ? 1 : pageIndex.value, props.less ? lessLength : pageSize.value)
        .then((res) => {
          notifications.value = res ? res.data : []
          total.value = res?.total || 0
        })
    loading.value = false
  } catch (e) {
    ElNotification({
      title: t('notification.home.error'),
      message: (e as Error).message,
      type: 'error'
    })
    loading.value = false
  }
}

watch(pageIndex, () => getNotifications(props.mode))
watch(pageSize, () => {
  pageIndex.value = 1
  getNotifications(props.mode)
})

watch(props, () => {
  pageIndex.value = 1
  getNotifications(props.mode)
})

onMounted(() => getNotifications(props.mode))

</script>

<template>
  <div class="p-5">
    <ElScrollbar :height="minHeight" v-loading="loading">
      <div v-for="(item, index) in notifications" :key="index" class="p-6px">
        <ZNotificationCard
          :notification="item"
          @refresh="getNotifications(props.mode)"
        />
      </div>
      <div class="text-center my-10 text-lg op-70" v-if="notifications.length == 0">
        <ElEmpty />
      </div>
    </ElScrollbar>
    <div class="flex justify-center mt-10" v-if="notifications.length !== 0 && !props.less">
      <ElPagination
        background
        layout="total, prev, pager, next, sizes, jumper"
        v-model:current-page="pageIndex"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 8, 10, 15, 20]"
        :total="total"
      />
    </div>
  </div>
</template>
