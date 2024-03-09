<script setup lang="ts">
import {
  ElCard,
  ElButton,
  ElPagination,
  ElScrollbar,
  ElNotification,
  ElEmpty,
  ElRow,
  ElCol
} from 'element-plus'
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

const notifications = ref<NotificationInstance[]>([])
const pageIndex = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)

async function getNotifications(mode: 'global' | 'personal') {
  loading.value = true
  try {
    if (mode === 'personal')
      await api.notification.read.mine(user._id, pageIndex.value, pageSize.value).then((res) => {
        notifications.value = res ? res.data : []
        total.value = res?.total || 0
      })
    else
      await api.notification.read.global(pageIndex.value, pageSize.value).then((res) => {
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
watch(pageSize, () => getNotifications(props.mode))

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
    <ElScrollbar :height="minHeight" v-loading="loading">
      <div v-for="(item, index) in notifications" :key="index" class="p-2 px-4">
        <ElCard shadow="hover" class="p-1">
          <div class="p-2 pl-0">
            <ElRow>
              <ElCol :span="18">
                <span class="font-bold text-xl">{{ item.title }}</span>
              </ElCol>
              <ElCol :span="6" class="text-right">
                <ZActivityMember v-if="!item.anonymous" :id="item.publisher" />
                <ZActivityMember
                  v-else-if="user.position.includes('admin')"
                  :icon="OouiUserAnonymous"
                  type="info"
                  :id="item.publisher"
                />
                <ElButton
                  v-else
                  type="info"
                  text
                  bg
                  size="small"
                  :icon="OouiUserAnonymous"
                  circle
                />
              </ElCol>
            </ElRow>
          </div>
          <div>{{ item.content }}</div>
          <div class="p-3 float-right pb-4">
            <ElButton :icon="Clock" text bg type="info" size="small" round>
              {{ dayjs(item.time).format('YYYY-MM-DD HH:mm:ss') }}
            </ElButton>
          </div>
        </ElCard>
      </div>
      <div v-if="notifications.length == 0" class="text-center my-10 text-lg op-70">
        <ElEmpty />
      </div>
    </ElScrollbar>
    <div class="flex justify-center mt-3">
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
