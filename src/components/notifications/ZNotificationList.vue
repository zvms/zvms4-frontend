<script setup lang="ts">
import {
  ElPagination,
  ElScrollbar,
  ElNotification,
  ElRow,
  ElCol,
  ElButton,
  ElButtonGroup
} from 'element-plus'
import { onMounted, ref, toRefs, watch } from 'vue'
import type { NotificationInstance } from '@/../types'
import api from '@/api'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useWindowSize } from '@vueuse/core'
import ZNotificationCard from './ZNotificationCard.vue'
import { Refresh, Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { More, User, School } from '@icon-park/vue-next'

const { t } = useI18n()
const router = useRouter()
const user = useUserStore()
const { height } = useWindowSize()

const props = withDefaults(
  defineProps<{
    mode: 'global' | 'personal'
    less?: boolean
  }>(),
  { less: false }
)

const { mode, less } = toRefs(props)

const minHeight = ref(height.value * (less.value ? 0.2 : 0.6) + 'px')

const range = ref<'global' | 'personal'>(mode.value)

watch(height, () => (minHeight.value = height.value * (less.value ? 0.2 : 0.6) + 'px'))

const notifications = ref<NotificationInstance[]>([])
const pageIndex = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)
watch(range, () => {
  pageIndex.value = 1
  getNotifications()
})

async function getNotifications() {
  loading.value = true
  const lessLength = 3 // max length in UserHome
  try {
    if (range.value === 'personal')
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

watch(pageIndex, () => getNotifications())
watch(pageSize, () => {
  pageIndex.value = 1
  getNotifications()
})

watch(props, () => {
  pageIndex.value = 1
  getNotifications()
})

onMounted(getNotifications)

const toggleMode = () => {
  if (range.value === 'global') range.value = 'personal'
  else range.value = 'global'
  router.push({ name: 'notifications-type', params: { type: range.value } })
}
</script>

<template>
  <div class="p-5">
    <ElRow>
      <ElCol :span="12" :class="`text-${less ? 'xl' : '2xl'} mb-5 p-4`">
        {{ t('notification.home.title') }}
      </ElCol>
      <ElCol :span="12" style="text-align: right">
        <ElButtonGroup class="p-1 pr-3">
          <ElButton
            v-if="
              (user.position.includes('admin') ||
                user.position.includes('department') ||
                user.position.includes('auditor')) &&
              !less
            "
            :type="range === 'personal' ? 'primary' : 'danger'"
            text
            bg
            round
            :icon="range === 'personal' ? User : School"
            @click="
              user.position.includes('admin') ||
              user.position.includes('department') ||
              user.position.includes('auditor')
                ? toggleMode()
                : undefined
            "
          >
            {{ t('notification.home.' + range) }}
          </ElButton>
          <ElButton
            type="success"
            text
            bg
            circle
            :icon="Plus"
            @click="router.push('/notifications/create')"
            v-if="
              (user.position.includes('admin') ||
                user.position.includes('department') ||
                user.position.includes('auditor')) &&
              !less
            "
          />
        </ElButtonGroup>
        <ElButton
          @click="getNotifications"
          type="primary"
          text
          bg
          circle
          class="p-1"
          :icon="Refresh"
        />
        <ElButton
          v-if="less"
          @click="router.push('/notifications/')"
          type="info"
          text
          bg
          circle
          :icon="More"
        />
      </ElCol>
    </ElRow>
    <div class="ml-8 opacity-50" v-if="!less">{{ t('notification.home.subtitle') }}</div>
    <ElScrollbar v-loading="loading" :max-height="minHeight">
      <div v-for="(item, index) in notifications" :key="index" class="p-6px">
        <ZNotificationCard :notification="item" @refresh="getNotifications" />
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
        :pager-count="3"
        :page-sizes="[3, 5, 8, 10, 15, 20]"
        :total="total"
      />
    </div>
  </div>
</template>
