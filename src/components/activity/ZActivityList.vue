<script setup lang="ts">
import {
  type ActivityStatus,
  type ActivityDisplayInstance,
  type ActivityMember,
  type MemberActivityStatus,
  type SpecialActivity,
  type SpecifiedActivity
} from '@/../@types/activity'
import { ElDrawer, ElDialog, ElCard, ElTable, ElTableColumn, ElInput, ElTag } from 'element-plus'
import { ref, toRefs } from 'vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

const props = defineProps<{
  activities: ActivityDisplayInstance[]
  role: 'auditor' | 'secretary' | 'student'
}>()

const titleFilter = ref('')

const { role } = toRefs(props)

const activity = ref<ActivityDisplayInstance[]>([
  {
    // MongoDB _ID: HEX 12
    _id: '60b9b6b9a9b0f3c4b8e1b0a1',
    type: 'off-campus',
    name: '2021-2022年度第一学期学生社团招新',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        status: 'rejected',
        impression: '丁真'
      }
    ],
    duration: 1
  },
  {
    _id: '60b9b6b9a9b0f3c4b8e1b0a3',
    type: 'special',
    subtype: 'larce-scale',
    name: '2021-2022年度第一学期学生社团招新',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        status: 'approved',
        impression: '丁真'
      }
    ],
    duration: 8
  } as unknown as Omit<SpecialActivity, 'description'>,
  {
    _id: '60b9b6b9a9b0f3c4b8e1b0a5',
    type: 'specified',
    name: '2021-2022年度第一学期学生社团招新',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        status: 'first-instance-approved',
        impression: '丁真'
      }
    ],
    register: [
      {
        class: 202306,
        max: 4
      },
      {
        class: 202302,
        max: 4
      }
    ],
    duration: 4
  } as unknown as Omit<SpecifiedActivity, 'description'>
])

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
  attended: { label: '已参加', color: 'success' },
  'first-instance-rejected': { label: '初审未通过', color: 'warning' },
  'first-instance-approved': { label: '初审通过', color: 'success' },
  'last-instance-rejected': { label: '终审未通过', color: 'danger' },
  effective: { label: '有效', color: 'success' },
  rejected: { label: '已拒绝', color: 'danger' }
} as Record<string, { label: string; color: '' | 'success' | 'warning' | 'danger' }>

const reflect = ref(
  role.value === 'student' ? '' : role.value === 'auditor' ? 'first-instance-approved' : 'attended'
)
</script>

<template>
  <div class="card px-12">
    <ElCard shadow="never">
      <ElTable :data="activity.filter((x) => x.name.includes(titleFilter))">
        <ElTableColumn prop="name" label="名称" />
        <ElTableColumn prop="type" label="类型">
          <template #default="{ row }">
            {{ activityTypes.find((x) => x.value === row.type)?.label }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="duration" label="时长" />
        <ElTableColumn v-if="role === 'student'" label="状态">
          <template #default="{ row }">
            <ElTag
              v-for="(tag, idx) in (row as ActivityDisplayInstance).members.filter((x: ActivityMember) => x._id === user._id)"
              :key="idx"
              :type="status[tag.status].color"
            >
              {{ status[tag.status].label }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn v-else label="待审核">
          <template #default="{ row }">
            {{ (row as ActivityDisplayInstance).members.filter((x: ActivityMember) => x.status === reflect && row.type === 'specified').length }}
            条
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
}
</style>
