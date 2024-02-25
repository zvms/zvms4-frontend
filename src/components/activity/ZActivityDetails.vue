<script lang="ts" setup>
import type { ActivityInstance, SpecifiedActivity } from '@zvms/zvms4-types'
import { toRefs, ref } from 'vue'
import { ElButton, ElInput, ElRow, ElCol, ElPopconfirm, ElButtonGroup } from 'element-plus'
import { Calendar, Location, ArrowRight, Delete, Plus } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { useUserStore } from '@/stores/user'
import {
  ZActivityDuration,
  ZActivityHistory,
  ZActivityMember,
  ZActivityType,
  ZButtonOrCard,
  ZActivityMemberList
} from '@/components'
import { useI18n } from 'vue-i18n'
import api from '@/api'
import { StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite } from '@/icons'

const props = withDefaults(
  defineProps<{
    activity: ActivityInstance
    mode?: 'mine' | 'class' | 'campus' | 'register'
    perspective?: string // `mine` with other's user ObjectId
    showDetails?: boolean
  }>(),
  {
    mode: 'mine',
    perspective: 'mine',
    showDetails: false
  }
)
const emits = defineEmits<{
  refresh: []
}>()

const user = useUserStore()
const { t } = useI18n()
const { activity, mode, perspective, showDetails } = toRefs(props)

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
async function submitName() {
  editName.value = false
  activity.value.name = name.value
  await api.activity.update.title(activity.value._id, name.value)
  emits('refresh')
}

const editDescription = ref(false)
const description = ref(activity.value.description)
async function submitDescription() {
  editDescription.value = false
  activity.value.description = description.value
  await api.activity.update.description(activity.value._id, description.value)
  emits('refresh')
}

async function deleteActivity(id: string) {
  await api.activity.deleteOne(id, user._id)
  emits('refresh')
}

const refresh = () => emits('refresh')
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
      <ElButtonGroup>
        <ZActivityType
          class="px-2"
          :type="activity.type"
          mode="full"
          show-special
          force="full"
          :status="activity.status"
          :special="activity.type === 'special' ? activity.special.classify : undefined"
        />
      </ElButtonGroup>
    </p>
    <div
      v-if="!editDescription"
      class="text-sm text-gray-500 pt-2 pl-4"
      @dblclick="editDescription = true"
    >
      <p v-for="desc in activity.description.split('\n')" :key="desc">{{ desc }}</p>
    </div>
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
        {{
          dayjs(activity.date).format(
            activity.type === 'specified' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
          )
        }}
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
      <ZActivityMemberList class="px-2" :activity="activity" @refresh="refresh" />
    </div>
    <ElRow>
      <ElCol :span="6">
        <div class="pl-4 py-2">
          <ZActivityMember
            :id="activity.creator"
            :icon="
              StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite
            "
          />
        </div>
      </ElCol>
      <ElCol :span="18">
        <div class="pl-4 py-2" style="text-align: right">
          <ElButton
            v-if="showDetails"
            type="info"
            :icon="Plus"
            text
            bg
            round
            size="small"
            @click="$router.push('/activity/' + activity._id)"
          >
            {{ t('activity.form.detail') }}
          </ElButton>
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
