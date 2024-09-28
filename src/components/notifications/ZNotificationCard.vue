<script lang="ts" setup>
import { ElCard, ElInput, ElButton } from 'element-plus'
import { ZActivityMember } from '@/components'
import { useUserStore } from '@/stores/user'
import ZNotificationContentDisplayer from './ZNotificationContentDisplayer.vue'
import { useI18n } from 'vue-i18n'
import type { NotificationInstance } from '@zvms/zvms4-types'
import api from '@/api'
import { toRefs, ref, watch } from 'vue'
import { ArrowRight, Delete } from '@element-plus/icons-vue'
import { OouiUserAnonymous } from '@/icons'
import dayjs from 'dayjs'

const user = useUserStore()
const { t } = useI18n()

const props = withDefaults(defineProps<{ notification: NotificationInstance }>(), {})
const emits = defineEmits(['refresh'])

const { notification } = toRefs(props)

const payload = ref<NotificationInstance>(notification.value)

const title = ref(payload.value.title)
const content = ref(payload.value.content)

const editing = ref<false | 'title' | 'content'>(false)

watch(
  notification,
  (newVal) => {
    editing.value = false
    payload.value = newVal
    title.value = newVal.title
    content.value = newVal.content
  },
  { immediate: true, deep: true }
)

async function modifyTitle() {
  await api.notification.modify.title(notification.value._id, title.value)
  editing.value = false
  notification.value.title = title.value
  emits('refresh')
}

async function modifyContent() {
  await api.notification.modify.content(notification.value._id, content.value)
  editing.value = false
  notification.value.content = content.value
  emits('refresh')
}

async function deleteNotification(id: string) {
  await api.notification.delete(id, user._id)
  emits('refresh')
}

function confirmAccess() {
  return user.position.includes('admin') ||
            user.position.includes('department') ||
            user.position.includes('auditor')
}
</script>

<template>
  <ElCard shadow="hover" class="py-6px">
    <div class="flex notifications-center">
      <span
        class="text-xl"
        :class="notification.title.length !== 0 ? 'font-bold' : 'op-65'"
        @dblclick="confirmAccess() && (editing = 'title')"
        v-if="editing !== 'title'"
      >
        {{
          notification.title.length === 0 &&
          confirmAccess()
            ? t('notification.editable')
            : notification.title
        }}
      </span>
      <ElInput
        v-model="title"
        @keydown.enter="modifyTitle"
        v-else
        style="width: 60%; padding-bottom: 0.5rem; padding-top: 0.5rem"
      >
        <template #append>
          <ElButton :icon="ArrowRight" type="success" plain @click="modifyTitle"></ElButton>
        </template>
      </ElInput>
      <div class="ma"></div>
      <div class="w-74px">
        <ZActivityMember v-if="!notification.anonymous" :id="notification.publisher" />
        <ZActivityMember
          v-else-if="user.position.includes('admin')"
          :icon="OouiUserAnonymous"
          type="info"
          :id="notification.publisher"
        />
        <ElButton v-else type="info" text bg size="small" :icon="OouiUserAnonymous">
          Anonymous
        </ElButton>
      </div>
      <ElButton
        v-if="
          confirmAccess()
        "
        :icon="Delete"
        @click="deleteNotification(notification._id)"
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
      :class="notification.content.length === 0 ? 'op-65' : ''"
      @dblclick="confirmAccess() && (editing = 'content')"
      v-if="editing !== 'content'"
    >
      <ZNotificationContentDisplayer
        :content="
          notification.content.length === 0 &&
          confirmAccess()
            ? t('notification.editable')
            : notification.content
        "
      />
    </div>
    <div v-else>
      <ElInput
        v-model="content"
        @keydown.enter="modifyContent"
        type="textarea"
        autosize
        class="w-full"
        style="padding-top: 0.5rem; padding-bottom: 0.5rem"
      >
      </ElInput>
      <div style="text-align: right">
        <ElButton text bg circle :icon="ArrowRight" @click="modifyContent"></ElButton>
      </div>
    </div>
    <div class="ma"></div>
    <div class="w-full py-3">
      <span class="float-right op-65 text-sm">
        {{ dayjs(notification.time).format('YYYY-MM-DD HH:mm:ss') }}
      </span>
    </div>
  </ElCard>
</template>
