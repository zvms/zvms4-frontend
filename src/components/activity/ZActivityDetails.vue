<script lang="ts" setup>
import type { SpecialActivity, ActivityInstance, SpecifiedActivity } from '@/../@types/activity'
import { toRefs, ref } from 'vue'
import { ElButton, ElInput, ElRow, ElCol, ElPopconfirm } from 'element-plus'
import { Calendar, Location, ArrowRight, User, Delete } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { useUserStore } from '@/stores/user'
import {
  ZActivityDuration,
  ZActivityHistory,
  ZActivityMember,
  ZActivityStatus,
  ZActivityType,
  ZButtonOrCard
} from '@/components'
import { useI18n } from 'vue-i18n'
import api from '@/api'

const props = defineProps<{
  activity: ActivityInstance
  mode: 'mine' | 'class' | 'campus' | 'register'
  perspective?: string // `mine` with other's user ObjectId
}>()

const user = useUserStore()
const { t } = useI18n()
const { activity, mode, perspective } = toRefs(props)

const hovered = ref(false)

function getDateStatusColor(date: string) {
  const now = dayjs()
  const target = dayjs(date)
  if (target.isAfter(now, 'date')) return 'success'
  if (target.isBefore(now, 'date')) return 'warning'
  return 'primary'
}

const editName = ref(false)
const name = ref(activity.value.name)
function submitName() {
  editName.value = false
  activity.value.name = name.value
}

const editDescription = ref(false)
const description = ref(activity.value.description)
function submitDescription() {
  editDescription.value = false
  activity.value.description = description.value
}

const deleteActivity = (id: string) => api.activity.deleteOne(id)
</script>

<template>
  <ZButtonOrCard mode="card" @mouseover="hovered = true" @mouseleave="hovered = false">
    <p class="text-xl pl-4">
      <span v-if="!editName" @dblclick="editName = true">{{ activity.name }}</span>
      <ElInput v-else v-model="name" style="width: 328px" @keydown.enter="submitName">
        <template #append>
          <ElButton class="px-2" type="success" :icon="ArrowRight" @click="submitName" />
        </template>
      </ElInput>
      <ZActivityType
        v-if="activity.type !== 'special'"
        class="px-2"
        :type="activity.type"
        mode="full"
        show-special
      />
      <ZActivityType
        v-else
        class="px-2"
        type="special"
        mode="full"
        show-special
        :special="(activity as SpecialActivity).special.classify"
      />
      <ZActivityStatus :type="activity.status" class="px-2" />
    </p>
    <p
      v-if="!editDescription"
      class="text-sm text-gray-500 pt-2 pl-4"
      @dblclick="editDescription = true"
    >
      {{ activity.description }}
    </p>
    <div v-else class="pt-2 pl-4">
      <ElInput
        v-model="description"
        type="textarea"
        :autosize="{ minRows: 2 }"
        @keydown.enter="submitDescription"
      />
      <div style="text-align: right" class="py-2">
        <ElButton
          text
          bg
          circle
          class="px-2"
          type="success"
          :icon="ArrowRight"
          @click="submitDescription"
        />
      </div>
    </div>
    <div class="py-2 pl-4">
      <ElButton
        size="small"
        text
        bg
        round
        :type="getDateStatusColor(activity.date)"
        class="py-2"
        :icon="Calendar"
      >
        {{ dayjs(activity.date).format('YYYY-MM-DD') }}
      </ElButton>
      <ElButton
        v-if="activity.type === 'specified'"
        size="small"
        text
        bg
        round
        type="info"
        class="py-2"
        :icon="Location"
      >
        {{ (activity as SpecifiedActivity).registration.place }}
      </ElButton>
      <ZActivityDuration
        class="px-2"
        v-if="mode === 'mine'"
        :mode="activity.members.find((x) => x._id === perspective ?? user._id)?.mode"
        :duration="activity.members.find((x) => x._id === perspective ?? user._id)?.duration ?? 0"
        :status="activity.members.find((x) => x._id === perspective ?? user._id)?.status"
        force="full"
      />
      <ZActivityHistory
        class="px-2"
        v-if="mode === 'mine'"
        :mode="activity.members.find((x) => x._id === perspective ?? user._id)?.mode"
        :history="activity.members.find((x) => x._id === perspective ?? user._id)?.history"
      />
    </div>
    <ElRow>
      <ElCol :span="6">
        <div class="pl-4 py-2">
          <ZActivityMember :id="activity.creator" :icon="User" />
        </div>
      </ElCol>
      <ElCol :span="18">
        <div class="pl-4 py-2" style="text-align: right">
          <ElPopconfirm
            v-if="
              mode !== 'mine' &&
              mode !== 'register' &&
              (user._id === activity.creator ||
                user.position.includes('admin') ||
                user.position.includes('system'))
            "
            :title="t('activity.form.actions.delete.confirm')"
            width="328px"
            @confirm="deleteActivity(activity._id)"
          >
            <template #reference>
              <ElButton :icon="Delete" type="danger" size="small" text bg round>
                {{ t('activity.form.actions.delete.name') }}
              </ElButton>
            </template>
          </ElPopconfirm>
        </div>
      </ElCol>
    </ElRow>
  </ZButtonOrCard>
</template>
