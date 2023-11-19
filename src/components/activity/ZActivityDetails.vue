<script lang="ts" setup>
import type { ActivityInstance, SpecifiedActivity } from '@/../@types/activity'
import { toRefs, ref } from 'vue'
import ZButtonOrCard from '@/components/utils/ZButtonOrCard.vue'
import { ElButton, ElInput, ElButtonGroup, ElRow, ElCol } from 'element-plus'
import ZActivityType from '@/components/tags/ZActivityType.vue'
import { Timer, Calendar, Location, ArrowRight, Plus, Edit } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite from '@/icons/StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite.vue'
import ZActivityMember from './ZActivityMember.vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  activity: ActivityInstance
  mode: 'student' | 'secretary' | 'auditor'
}>()

const user = useUserStore()
const { t } = useI18n()
const { activity, mode } = toRefs(props)

const hovered = ref(false)

function getDateStatusColor(date: string) {
  /**
   * After: success
   * Before: warning
   * Today: primary
   */
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
      <ZActivityType class="px-2" :type="activity.type" mode="full" />
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <ElButton v-if="hovered" size="small" class="px-2" type="info" text bg round>
          {{ activity._id }}
        </ElButton>
      </Transition>
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
      <ElButton
        v-if="mode === 'student'"
        size="small"
        text
        bg
        round
        type="info"
        class="py-2"
        :icon="Timer"
      >
        {{ activity.members.find(x => x._id === user._id)?.duration }} h
      </ElButton>
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
          <ElButtonGroup>
            <ElButton
              class="px-2"
              :icon="Plus"
              type="success"
              text
              :bg="hovered"
              :round="hovered"
              :circle="!hovered"
              size="small"
            >
              {{ hovered ? dayjs(activity.createdAt).format('YYYY-MM-DD HH:mm:ss') : '' }}
            </ElButton>
            <ElButton
              class="px-2"
              :icon="Edit"
              type="warning"
              text
              :bg="hovered"
              :round="hovered"
              :circle="!hovered"
              size="small"
            >
              {{ hovered ? dayjs(activity.updatedAt).format('YYYY-MM-DD HH:mm:ss') : '' }}
            </ElButton>
          </ElButtonGroup>
        </div>
      </ElCol>
    </ElRow>
  </ZButtonOrCard>
</template>
