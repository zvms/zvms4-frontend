<script setup lang="ts">
import {
  type ActivityDisplayInstance,
  type ActivityMember,
  type SpecialActivity,
  type SpecifiedActivity
} from '@/../@types/activity'
import { ElDialog, ElTable, ElTableColumn, ElTag, ElButton } from 'element-plus'
import { ref, toRefs } from 'vue'
import { useUserStore } from '@/stores/user'
import dayjs from 'dayjs'
import { Appointment, Star, Association } from '@icon-park/vue-next'
import { Box } from '@element-plus/icons-vue'
import MaterialSymbolsAppRegistration from '@/icons/MaterialSymbolsAppRegistration.vue'
import type { Component as VueComponent } from 'vue'
import ZActivityDescriptions from './ZActivityDescriptions.vue'
import ZActivityImpressionDrawer from './ZActivityImpressionDrawer.vue'
import UserResgister from '@/views/activity/UserRegister.vue'

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
        number: 20230616,
        status: 'rejected',
        impression: '丁真'
      }
    ],
    duration: 1,
    time: dayjs('2023-11-13 00:00:00').toJSON()
  },
  {
    _id: '60b9b6b9a9b0f3c4b8e1b0a3',
    type: 'special',
    description: '这是一条活动描述',
    subtype: 'large-scale',
    name: '义工 B',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        number: 20230616,
        status: 'effective',
        impression: '丁真'
      }
    ],
    duration: 8,
    time: dayjs().toJSON()
  } as SpecialActivity,
  {
    _id: '60b9b6b9a9b0f3c4b8e1b0a5',
    type: 'specified',
    description: '这是一条活动描述',
    name: '义工 C',
    members: [
      {
        _id: '60c9b1b0e6b3a3b4b8b0b0b0',
        number: 20230616,
        status: 'first-instance-approved',
        impression: '丁真'
      }
    ],
    registration: {
      classes: [
        {
          class: 202306,
          max: 4
        },
        {
          class: 202302,
          max: 4
        }
      ],
      place: 'A101',
      deadline: dayjs(new Date('2023-11-13 00:00:00')).toJSON()
    },
    duration: 4,
    time: dayjs().toJSON()
  } as SpecifiedActivity
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

const registerForSpecified = ref(false)
</script>

<template>
  <div class="card px-12">
    <ElDialog title="报名指定义工" fullscreen center v-model="registerForSpecified">
      <UserResgister />
    </ElDialog>
    <ElCard shadow="never">
      <ElTable :data="activity.filter((x) => x.name.includes(titleFilter))" table-layout="auto">
        <ElTableColumn type="expand">
          <template #header>
            <ElButton
              v-if="role !== 'student'"
              :icon="Box"
              type="success"
              text
              bg
              circle
              size="small"
            />
            <ElButton
              v-else
              :icon="MaterialSymbolsAppRegistration"
              type="success"
              text
              bg
              circle
              size="small"
              @click="registerForSpecified = true"
            />
          </template>
          <template #default="{ row }">
            <ZActivityDescriptions :activity="row" :role="role" />
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
            <ZActivityImpressionDrawer :activity="props.row" :role="role" />
            <!-- <ElButton
              text
              bg
              @click="dialogs[props.$index] = true"
              :icon="role === 'student' ? Edit : EditPen"
              :type="color"
              >{{ role === 'student' ? '填写' : '审阅' }}</ElButton
            > -->
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
