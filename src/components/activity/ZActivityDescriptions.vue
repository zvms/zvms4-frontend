<script lang="ts" setup>
import { ElDescriptions, ElDescriptionsItem, ElTag, ElButton } from 'element-plus'
import dayjs from 'dayjs'
import type {
  ActivityDisplayInstance,
  ActivityInstance,
  ActivityMember
} from '@/../@types/activity'
import { Appointment, Star, Association } from '@icon-park/vue-next'
import { type Component as VueComponent, toRefs } from 'vue'
import { useUserStore } from '@/stores/user'

const icon = {
  specified: Appointment,
  special: Star,
  'off-campus': Association
} as Record<string, VueComponent>

const props = defineProps<{
  activity: ActivityInstance
  role: 'auditor' | 'secretary' | 'student'
}>()
const user = useUserStore()

const { activity, role } = toRefs(props)

const activityTypes = [
  {
    label: '指定义工',
    value: 'specified'
  },
  {
    label: '特殊义工',
    value: 'special'
  },
  {
    label: '校外义工',
    value: 'off-campus'
  }
]

const status = {
  registered: { label: '已报名', color: '' },
  attended: { label: '初审中', color: '' },
  'first-instance-rejected': { label: '初审未通过', color: 'warning' },
  'first-instance-approved': { label: '终审中', color: '' },
  'last-instance-rejected': { label: '终审未通过', color: 'warning' },
  effective: { label: '有效', color: 'success' },
  rejected: { label: '拒绝', color: 'danger' }
} as Record<string, { label: string; color: '' | 'success' | 'warning' | 'danger' }>
</script>

<template>
  <ElDescriptions class="px-8" border>
    <template #title>
      <span class="code"
        >Activity Id <ElButton text bg size="small" class="code">{{ activity._id }}</ElButton></span
      >
    </template>
    <ElDescriptionsItem label="名称">{{ activity.name }}</ElDescriptionsItem>
    <ElDescriptionsItem label="日期">{{
      dayjs(activity.time).format('YYYY-MM-DD')
    }}</ElDescriptionsItem>
    <ElDescriptionsItem label="类型">
      <ElButton size="small" text :icon="icon[activity.type]">{{
        activityTypes.find((x) => x.value === activity.type)?.label
      }}</ElButton>
    </ElDescriptionsItem>
    <ElDescriptionsItem label="状态" v-if="role === 'student'">
      <ElTag
        v-for="(tag, idx) in (activity as ActivityDisplayInstance).members.filter(
          (x: ActivityMember) => x._id === user._id
        )"
        :key="idx"
        :type="status[tag.status].color"
      >
        {{ status[tag.status].label }}
      </ElTag>
    </ElDescriptionsItem>
    <ElDescriptionsItem label="时长">
      {{ activity.duration }}
      <span style="font-size: 12px; color: --el-text-color-secondary">小时</span>
    </ElDescriptionsItem>
    <ElDescriptionsItem label="感想">
      {{ activity.members.find((x: ActivityMember) => x._id === user._id)?.impression.length }}
      <span style="font-size: 12px; color: --el-text-color-secondary">字</span>
    </ElDescriptionsItem>
    <ElDescriptionsItem label="详情">
      {{ activity.description }}
    </ElDescriptionsItem>
  </ElDescriptions>
</template>
