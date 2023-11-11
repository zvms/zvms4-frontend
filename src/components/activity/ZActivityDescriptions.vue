<script lang="ts" setup>
import { ElDescriptions, ElDescriptionsItem, ElButton } from 'element-plus'
import dayjs from 'dayjs'
import type {
  ActivityInstance,
  ActivityMember
} from '@/../@types/activity'
import { toRefs } from 'vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import ZActivityStatus from '@/components/tags/ZActivityStatus.vue'
import ZActivityType from '@/components/tags/ZActivityType.vue'

const props = defineProps<{
  activity: ActivityInstance
  role: 'auditor' | 'secretary' | 'student'
}>()
const user = useUserStore()
const { t } = useI18n()

const { activity, role } = toRefs(props)

const activityTypes = [
  {
    value: 'specified'
  },
  {
    value: 'special'
  },
  {
    value: 'off-campus'
  },
  {
    value: 'scale'
  }
] as { value: 'specified' | 'special' | 'off-campus' | 'scale' }[]
</script>

<template>
  <ElDescriptions class="px-8" border>
    <template #title>
      <span class="code"
        >Activity Id <ElButton text bg size="small" class="code">{{ activity._id }}</ElButton></span
      >
    </template>
    <ElDescriptionsItem :label="t('activity.columns.name')">{{ activity.name }}</ElDescriptionsItem>
    <ElDescriptionsItem :label="t('activity.columns.date')">{{
      dayjs(activity.date).format('YYYY-MM-DD')
    }}</ElDescriptionsItem>
    <ElDescriptionsItem :label="t('activity.columns.type')">
      <ZActivityType
        :type="activityTypes.find((x) => x.value === activity.type)?.value"
        size="small"
      />
    </ElDescriptionsItem>
    <ElDescriptionsItem :label="t('activity.columns.status.title')" v-if="role === 'student'">
      <ZActivityStatus
        :type="
          (activity as ActivityInstance).members.find(
            (x: ActivityMember) => x._id === user._id
          )?.status
        "
      />
    </ElDescriptionsItem>
    <ElDescriptionsItem :label="t('activity.columns.duration')">
      {{ activity.duration }}
      <span style="font-size: 12px; color: --el-text-color-secondary">{{
        t('activity.columns.units.hour', activity.duration)
      }}</span>
    </ElDescriptionsItem>
    <ElDescriptionsItem :label="t('activity.columns.impression')">
      {{ activity.members.find((x: ActivityMember) => x._id === user._id)?.impression.length }}
      <span style="font-size: 12px; color: --el-text-color-secondary">{{
        t(
          'activity.columns.units.word',
          activity.members.find((x) => x._id === user._id)?.impression.length as number
        )
      }}</span>
    </ElDescriptionsItem>
    <ElDescriptionsItem :label="t('activity.columns.description')">
      {{ activity.description }}
    </ElDescriptionsItem>
  </ElDescriptions>
</template>
