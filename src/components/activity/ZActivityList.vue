<script setup lang="ts">
import {
  type ActivityStatus,
  type ActivityDisplayInstance,
  type ActivityMember,
  type MemberActivityStatus,
  type SpecialActivity,
  type SpecifiedActivity
} from '@/../@types/activity'
import {
  ElDrawer,
  ElDialog,
  ElCard,
  ElTable,
  ElTableColumn,
  ElInput,
  ElTag,
  ElDescriptions,
  ElDescriptionsItem,
  ElButton
} from 'element-plus'
import { ref, toRefs } from 'vue'
import { useUserStore } from '@/stores/user'
import dayjs from 'dayjs'
import { Appointment, Star, Association } from '@icon-park/vue-next'
import type { Component as VueComponent } from 'vue'
import { Edit, EditPen } from '@element-plus/icons-vue'

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
    name: '义工 A',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        status: 'rejected',
        impression: '丁真'
      }
    ],
    duration: 1,
    time: dayjs().toString()
  },
  {
    _id: '60b9b6b9a9b0f3c4b8e1b0a3',
    type: 'special',
    subtype: 'larce-scale',
    name: '义工 B',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        status: 'effective',
        impression: '丁真'
      }
    ],
    duration: 8,
    time: dayjs().toString()
  } as unknown as Omit<SpecialActivity, 'description'>,
  {
    _id: '60b9b6b9a9b0f3c4b8e1b0a5',
    type: 'specified',
    name: '义工 C',
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
    duration: 4,
    time: dayjs().toString()
  } as unknown as Omit<SpecifiedActivity, 'description'>
])

const dialogs = ref(activity.value.map(() => false))

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

const reflect = ref(
  role.value === 'student' ? '' : role.value === 'auditor' ? 'first-instance-approved' : 'attended'
)

const icon = {
  specified: Appointment,
  special: Star,
  'off-campus': Association
} as Record<string, VueComponent>

const color = ref(
  ['primary', 'success', 'warning', 'danger', 'info'][Math.floor(Math.random() * 5)] as
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
)
</script>

<template>
  <div class="card px-12">
    <ElCard shadow="never">
      <ElTable :data="activity.filter((x) => x.name.includes(titleFilter))" table-layout="auto">
        <ElTableColumn type="expand">
          <template #default="{ row }">
            <ElDescriptions class="px-8" border>
              <template #title>
                <span class="code"
                  >Activity Id
                  <ElButton text bg size="small" class="code">{{ row._id }}</ElButton></span
                >
              </template>
              <ElDescriptionsItem label="名称">{{ row.name }}</ElDescriptionsItem>
              <ElDescriptionsItem label="日期">{{
                dayjs(row.time).format('YYYY-MM-DD')
              }}</ElDescriptionsItem>
              <ElDescriptionsItem label="类型">
                <ElButton size="small" text :icon="icon[row.type]">{{
                  activityTypes.find((x) => x.value === row.type)?.label
                }}</ElButton>
              </ElDescriptionsItem>
              <ElDescriptionsItem label="状态" v-if="role === 'student'">
                <ElTag
                  v-for="(tag, idx) in (row as ActivityDisplayInstance).members.filter(
                    (x: ActivityMember) => x._id === user._id
                  )"
                  :key="idx"
                  :type="status[tag.status].color"
                >
                  {{ status[tag.status].label }}
                </ElTag>
              </ElDescriptionsItem>
              <ElDescriptionsItem label="时长">
                {{ row.duration }}
                <span style="font-size: 12px; color: --el-text-color-secondary">小时</span>
              </ElDescriptionsItem>
              <ElDescriptionsItem label="感想">
                {{ row.members.find((x: ActivityMember) => x._id === user._id)?.impression.length }}
                <span style="font-size: 12px; color: --el-text-color-secondary">字</span>
              </ElDescriptionsItem>
              <ElDescriptionsItem label="详情">
                {{ row.description }}
              </ElDescriptionsItem>
            </ElDescriptions>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" label="名称" />
        <ElTableColumn prop="time" label="日期">
          <template #default="{ row }">
            {{ dayjs(row.time).format('YYYY-MM-DD') }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="type" label="类型">
          <template #default="{ row }">
            <ElButton size="small" text :icon="icon[row.type]">{{
              activityTypes.find((x) => x.value === row.type)?.label
            }}</ElButton>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="duration" label="时长">
          <template #default="{ row }">
            {{ row.duration }}
            <span style="font-size: 12px; color: --el-text-color-secondary">小时</span>
          </template>
        </ElTableColumn>
        <ElTableColumn v-if="role === 'student'" label="状态">
          <template #default="{ row }">
            <ElTag
              v-for="(tag, idx) in (row as ActivityDisplayInstance).members.filter(
                (x: ActivityMember) => x._id === user._id
              )"
              :key="idx"
              :type="status[tag.status].color"
            >
              {{ status[tag.status].label }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn v-else label="待审">
          <template #default="{ row }">
            {{
              (row as ActivityDisplayInstance).members.filter(
                (x: ActivityMember) => x.status === reflect && row.type === 'specified'
              ).length
            }}
            <span style="font-size: 12px; color: --el-text-color-secondary">条感想</span>
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right" label="感想">
          <template #default="props">
            <ElButton
              text
              bg
              @click="dialogs[props.$index] = true"
              :icon="role === 'student' ? Edit : EditPen"
              :type="color"
              >{{ role === 'student' ? '填写' : '审阅' }}</ElButton
            >
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

.code {
  font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'Courier', 'monospace';
}
</style>
