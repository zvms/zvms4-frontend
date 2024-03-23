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
  emptyEditingStatus()
  const lessLength = 3 // max length in UserHome
  console.log(props.less, mode)
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
watch(pageSize, () => getNotifications(props.mode))

watch(props, () => {
  getNotifications(props.mode)
})

onMounted(() => getNotifications(props.mode))

const deleteNotification = async (id: string) => {
  await api.notification.delete(id, user._id)
  await getNotifications(props.mode)
}

// edit the title / content of any notification
const editTitle = ref({
  id: '',
  editing: false
})
const editContent = ref({
  id: '',
  editing: false
})
const toggleEditTitle = (id: string) => {
  editContent.value = { editing: false, id: '' }
  editTitle.value = {
    editing: !editTitle.value.editing,
    id
  }
}
const toggleEditContent = (id: string) => {
  editTitle.value = { editing: false, id: '' }
  editContent.value = {
    editing: !editContent.value.editing,
    id
  }
}
const emptyEditingStatus = () => {
  editTitle.value = { editing: false, id: '' }
  editContent.value = { editing: false, id: '' }
}
const modify = () => {
  const id = editTitle.value.editing ? editTitle.value.id : editContent.value.id
  const modified = notifications.value.flat().find((i) => i._id === id) as NotificationInstance
  emptyEditingStatus()
  api.notification.modify(modified, id)
}
</script>

<template>
  <div class="p-5">
    <ElScrollbar :height="minHeight" v-loading="loading">
      <div v-for="(item, index) in notifications" :key="index" class="p-6px">
        <ElCard shadow="hover" class="py-6px">
          <div class="flex items-center">
            <span
              class="text-xl"
              :class="item.title.length !== 0 ? 'font-bold' : 'op-65'"
              @dblclick="toggleEditTitle(item._id)"
              v-if="!editTitle.editing || item._id !== editTitle.id"
            >
              {{
                item.title.length === 0 &&
                (user.position.includes('admin') ||
                  user.position.includes('department') ||
                  user.position.includes('auditor'))
                  ? t('notification.editable')
                  : item.title
              }}
            </span>
            <ElInput
              v-model="item.title"
              @keydown.enter="modify"
              v-else
              style="width: 60%; padding-bottom: 0.5rem; padding-top: 0.5rem"
            >
              <template #append>
                <ElButton :icon="ArrowRight" type="primary" plain @click="modify"></ElButton>
              </template>
            </ElInput>
            <div class="ma"></div>
            <div class="w-74px">
              <ZActivityMember v-if="!item.anonymous" :id="item.publisher" />
              <ZActivityMember
                v-else-if="user.position.includes('admin')"
                :icon="OouiUserAnonymous"
                type="info"
                :id="item.publisher"
              />
              <ElButton v-else type="info" text bg size="small" :icon="OouiUserAnonymous" circle />
            </div>
            <ElButton
              v-if="
                user.position.includes('admin') ||
                user.position.includes('department') ||
                user.position.includes('auditor')
              "
              :icon="Delete"
              @click="deleteNotification(item._id)"
              circle
              text
              bg
              type="danger"
              size="small"
              class="ml-0.5rem"
            ></ElButton>
          </div>
          <div
            class="text-sm py-6px"
            :class="item.content.length === 0 ? 'op-65' : ''"
            @dblclick="toggleEditContent(item._id)"
            v-if="!editContent.editing || editContent.id !== item._id"
          >
            <ZNotificationContentDisplayer
              :content="
                item.content.length === 0 &&
                (user.position.includes('admin') ||
                  user.position.includes('department') ||
                  user.position.includes('auditor'))
                  ? t('notification.editable')
                  : item.content
              "
            />
          </div>
          <ElInput
            v-model="item.content"
            @keydown.enter="modify"
            v-else
            style="width: 85%; padding-top: 0.5rem; padding-bottom: 0.5rem"
          >
            <template #append>
              <ElButton :icon="ArrowRight" @click="modify"></ElButton>
            </template>
          </ElInput>
          <div class="ma"></div>
          <div class="w-full py-3">
            <span class="float-right op-65 text-sm">
              {{ dayjs(item.time).format('YYYY-MM-DD HH:mm:ss') }}
            </span>
          </div>
        </ElCard>
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
