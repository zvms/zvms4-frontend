<script setup lang="ts">
import { ElCard, ElButton, ElPagination, ElRow, ElCol, ElScrollbar } from 'element-plus'
import { Clock, Delete, EditPen, ArrowRight, Close } from '@element-plus/icons-vue'
import { onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs'
import type { NotificationInstance } from '@zvms/zvms4-types'
import api from '@/api'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import ZActivityMember from '@/components/activity/ZActivityMember.vue'
import { useWindowSize } from '@vueuse/core'
import {
  OouiUserAnonymous,
  StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite
} from '@/icons'

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
})

onMounted(() => getNotifications(props.mode))

const deleteNotification = (id: string) => {
  api.notification.delete(id)
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
const modify = () => {
  const id = editTitle.value.editing ? editTitle.value.id : editContent.value.id
  const modified = notifications.value.flat().find((i) => i._id === id) as NotificationInstance
  editTitle.value = { editing: false, id: '' }
  editContent.value = { editing: false, id: '' }
  api.notification.modify(modified, id)
}
</script>

<template>
  <div class="p-5">
    <ElScrollbar :height="minHeight">
      <div v-for="(item, index) in notifications[pageIndex - 1]" :key="index" class="p-6px">
        <ElCard shadow="hover" class="py-6px">
          <div class="flex p-2 pl-0 items-center">
            <!-- TODO: refactor this to ZEditable.vue -->
            <span
              class="font-bold text-xl"
              @dblclick="toggleEditTitle(item._id)"
              v-if="!editTitle.editing || item._id !== editTitle.id"
            >
              {{ item.title }}
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
            <ZActivityMember v-if="!item.anonymous" :id="item.publisher" />
            <ZActivityMember
              v-else-if="user.position.includes('admin')"
              :icon="OouiUserAnonymous"
              type="info"
              :id="item.publisher"
            />
            <ElButton v-else type="info" text bg size="small" :icon="OouiUserAnonymous" circle />
            <ElButton
              :icon="Delete"
              @click="deleteNotification(item._id)"
              circle
              type="danger"
              plain
              size="small"
            ></ElButton>
          </div>
          <span
            class="font-bold text-xl"
            @dblclick="toggleEditContent(item._id)"
            v-if="!editContent.editing || editContent.id !== item._id"
          >
            {{ item.content }}
          </span>
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
            <span class="float-right">
              <span :icon="Clock"></span>
              {{ dayjs(item.time).format('YYYY-MM-DD HH:mm:ss') }}
            </span>
          </div>
        </ElCard>
      </div>
      <div v-if="notifications.flat.length === 0" class="text-center my-10 text-lg op-70">
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
