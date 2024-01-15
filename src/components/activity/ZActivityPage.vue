<script setup lang="ts">
import type { ActivityInstance } from '@/../@types/activity'
import { ZActivityCard, ZActivityHistory, ZActivityMemberList, ZActivityMember } from '.'
import { ref, withDefaults } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { ElPageHeader, ElButton, ElSpace } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite } from '@/icons'
import dayjs from 'dayjs'
import { Clock, Calendar } from '@element-plus/icons-vue'

const user = useUserStore()

const props = withDefaults(
  defineProps<{
    activity: ActivityInstance
  }>(),
  {}
)

const { activity } = props
</script>

<template>
  <div>
    <ElPageHeader v-if="activity._id" :icon="ArrowLeft" @back="() => $router.back()" class="py-4">
      <template #content>
        {{ activity.name }}
      </template>
      <template #extra>
        <ElSpace>
          <ZActivityMember
            :id="activity.creator"
            :icon="
              StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite
            "
          />
          <ElButton
            text
            bg
            round
            size="small"
            type="info"
            :icon="activity.type === 'specified' ? Calendar : Clock"
          >
            {{ dayjs(activity.createdAt).format('YYYY-MM-DD') }}
          </ElButton>
        </ElSpace>
      </template>
    </ElPageHeader>
    <p class="text-gray-500 dark:text-gray-400 px-4">
      {{ activity.description }}
    </p>
  </div>
</template>
