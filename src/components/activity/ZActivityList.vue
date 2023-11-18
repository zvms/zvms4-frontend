<script setup lang="ts">
import type { ActivityInstance, ActivityMember } from '@/../@types/activity'
import {
  ElDialog,
  ElTable,
  ElTableColumn,
  ElButton,
  ElPagination,
  ElCard,
  ElInput
} from 'element-plus'
import { ref, toRefs, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import dayjs from 'dayjs'
import { Box, Search } from '@element-plus/icons-vue'
import MaterialSymbolsAppRegistration from '@/icons/MaterialSymbolsAppRegistration.vue'
import ZActivityImpressionDrawer from './ZActivityImpressionDrawer.vue'
import UserResgister from '@/views/activity/UserRegister.vue'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import ZActivityType from '@/components/tags/ZActivityType.vue'
import ZActivityStatus from '@/components/tags/ZActivityStatus.vue'
import ZActivityDetails from './ZActivityDetails.vue'

const { t } = useI18n()
const { width, height } = useWindowSize()

const user = useUserStore()

const props = defineProps<{
  activities: ActivityInstance[]
  role: 'auditor' | 'secretary' | 'student'
}>()

const activePage = ref(1)
const pageSize = ref(8)

const { activities } = toRefs(props)

const { role } = toRefs(props)

const reflect = ref(
  role.value === 'student' ? '' : role.value === 'auditor' ? 'first-instance-approved' : 'attended'
)

const registerForSpecified = ref(false)

const statusFilter = [
  'registered',
  'draft',
  'first-instance',
  'first-instance-rejected',
  'last-instance',
  'last-instance-rejected',
  'effective',
  'rejected'
]

const tableMaxHeight = ref(height.value * 0.56)

watch(width, () => {
  tableMaxHeight.value = height.value * 0.56
})

const searchWord = ref('')

const items = ref<ActivityInstance[]>([])

function filter() {
  items.value = activities.value.filter((x) => x.name.includes(searchWord.value))
}

watch(searchWord, filter)

filter()

onSortChange({
  column: 'date',
  order: 'ascending'
})

function onSortChange({ column, order }: { column: string; order: string }) {
  activePage.value = 1
  if (column === 'date') {
    items.value.sort((a, b) => {
      if (order === 'ascending') {
        return dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1
      } else {
        return dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1
      }
    })
  } else if (column === 'name') {
    items.value.sort((a, b) => {
      if (order === 'ascending') {
        return a.name.localeCompare(b.name)
      } else {
        return b.name.localeCompare(a.name)
      }
    })
  }
}

watch(
  () => props.activities,
  (activities) => {
    items.value = activities
  },
  { immediate: true }
)
</script>

<template>
  <div :class="['card', 'pr-8', width < height ? 'pl-6' : '']">
    <ElDialog
      :title="t('activity.registration.title')"
      fullscreen
      center
      v-model="registerForSpecified"
    >
      <UserResgister />
    </ElDialog>
    <ElCard shadow="never">
      <ElTable
        :max-height="tableMaxHeight"
        :data="
          items.filter(
            (x, idx) =>
              idx < activePage * pageSize &&
              idx >= (activePage - 1) * pageSize &&
              x.name.includes(searchWord)
          )
        "
        table-layout="auto"
        :on-sort-change="onSortChange"
      >
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
            <ZActivityDetails :activity="row" :mode="role" />
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" :label="t('activity.form.name')" />
        <ElTableColumn prop="date" :label="t('activity.form.date')" sortable>
          <template #default="{ row }">
            {{ dayjs(row.date).format('YYYY-MM-DD') }}
          </template>
        </ElTableColumn>
        <ElTableColumn
          prop="type"
          :label="t('activity.form.type')"
          :filters="[
            { text: t('activity.type.specified.name'), value: 'specified' },
            { text: t('activity.type.social.name'), value: 'social' },
            { text: t('activity.type.scale.name'), value: 'scale' },
            { text: t('activity.type.special.name'), value: 'special' }
          ]"
          :filter-method="(value, row) => row.type === value"
        >
          <template #default="{ row }">
            <ZActivityType :type="row.type" size="small" />
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="role === 'student'"
          :label="t('activity.form.duration')"
          sortable
          :sort-method="
            (a, b) =>
              ((a as ActivityInstance).members.find((x: ActivityMember) => x._id === user._id)
                ?.duration ?? a.duration) -
              ((b as ActivityInstance).members.find((x: ActivityMember) => x._id === user._id)
                ?.duration ?? b.duration)
          "
        >
          <template #default="{ row }">
            {{
              (row as ActivityInstance).members.find((x: ActivityMember) => x._id === user._id)
                ?.duration ?? row.duration
            }}
            <span style="font-size: 12px; color: --el-text-color-secondary">{{
              t(
                'activity.units.hour',
                (row as ActivityInstance).members.find((x: ActivityMember) => x._id === user._id)
                  ?.duration ?? row.duration
              )
            }}</span>
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="role === 'student'"
          :label="t('activity.status.title')"
          :filters="
            statusFilter.map((x) => ({
              text: t('activity.status.' + x),
              value: x
            }))
          "
          :filter-method="
            (value, row) =>
              (row as ActivityInstance).members.find((x: ActivityMember) => x._id === user._id)
                ?.status === value
          "
        >
          <template #default="{ row }">
            <ZActivityStatus
              :type="
                (row as ActivityInstance).members.find((x: ActivityMember) => x._id === user._id)
                  ?.status
              "
            />
          </template>
        </ElTableColumn>
        <ElTableColumn v-else :label="t('activity.form.pending')">
          <template #default="{ row }">
            {{
              (row as ActivityInstance).members.filter(
                (x: ActivityMember) => x.status === reflect && row.type === 'specified'
              ).length
            }}
            <span style="font-size: 12px; color: --el-text-color-secondary">{{
              t(
                'activity.units.item',
                (row as ActivityInstance).members.filter(
                  (x: ActivityMember) => x.status === reflect && row.type === 'specified'
                ).length
              )
            }}</span>
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right">
          <template #header>
            <ElInput v-model="searchWord" size="small" :prefix-icon="Search" />
          </template>
          <template #default="props">
            <ZActivityImpressionDrawer :activity="props.row" :role="role" />
          </template>
        </ElTableColumn>
      </ElTable>
      <div class="py-2">
        <ElPagination
          v-model:current-page="activePage"
          v-model:page-size="pageSize"
          :total="items.length"
          layout="total, prev, pager, next, sizes, jumper"
          background
          :page-sizes="[3, 5, 8, 10, 15, 20]"
          :on-current-change="onSortChange"
        />
      </div>
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
