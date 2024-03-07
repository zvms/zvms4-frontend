<script setup lang="ts">
import type { ActivityInstance, ActivityMember } from '@zvms/zvms4-types'
import {
  ElDialog,
  ElTable,
  ElTableColumn,
  ElButton,
  ElPagination,
  ElCard,
  ElInput,
  ElSkeleton
} from 'element-plus'
import { ref, toRefs, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import dayjs from 'dayjs'
import { Box, Search, PieChart } from '@element-plus/icons-vue'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { getActivity } from './getActivity'
import {
  ZActivityImpressionDrawer,
  ZActivityType,
  ZActivityStatus,
  ZActivityDuration,
  ZActivityCard
} from '@/components'

const { t } = useI18n()
const { width, height } = useWindowSize()

const user = useUserStore()

const props = defineProps<{
  role: 'campus' | 'class' | 'mine'
}>()

const activePage = ref(1)
const pageSize = ref(8)
const size = ref(0)

const { role } = toRefs(props)
const loading = ref(true)
const inital = ref(true)
const searchWord = ref('')
const query = ref('')

const activities = ref<ActivityInstance[]>([])

function refresh() {
  loading.value = true
  inital.value = false
  getActivity(user._id, role.value, activePage.value, pageSize.value, query.value)
    .then((res) => {
      if (res && res?.data.length !== 0) {
        activities.value = res?.data
        size.value = res?.size
        loading.value = false
      } else {
        activities.value = []
        loading.value = false
        size.value = 0
      }
    })
    .catch(() => {
      loading.value = false
    })
}

refresh()

watch(activePage, refresh)
watch(pageSize, refresh)
watch(query, refresh)

const registerForSpecified = ref(false)

const statusFilter = ['draft', 'pending', 'rejected', 'effective', 'refused']

const tableMaxHeight = ref(height.value * 0.56)

watch(width, () => {
  tableMaxHeight.value = height.value * 0.56
})

const items = ref<ActivityInstance[]>([])

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
  activities,
  () => {
    items.value = activities.value
  },
  { immediate: true }
)
</script>

<template>
  <div :class="'card, pr-8, ' + (width < height ? 'pl-6' : '') + ''">
    <ElDialog
      :title="t('activity.registration.title')"
      width="80%"
      center
      v-model="registerForSpecified"
    >
    </ElDialog>
    <ElSkeleton
      v-if="loading && inital"
      :loading="loading && inital"
      :rows="8"
      animated
      class="py-4 px-4"
      :throttle="500"
    />
    <ElCard shadow="never" v-else v-loading="loading && !inital">
      <ElTable
        :max-height="tableMaxHeight"
        :data="items"
        table-layout="auto"
        :on-sort-change="onSortChange"
        stripe
      >
        <ElTableColumn type="expand">
          <template #header>
            <ElButton
              v-if="role === 'campus'"
              :icon="Box"
              type="success"
              text
              bg
              circle
              size="small"
            />
            <ElButton
              v-else
              :icon="PieChart"
              type="success"
              text
              bg
              circle
              size="small"
              @click="registerForSpecified = true"
            />
          </template>
          <template #default="{ row }">
            <ZActivityCard :_id="row._id" :mode="role" :perspective="user._id" @refresh="refresh" />
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
          v-if="role !== 'mine'"
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
            <ZActivityType
              :type="row.type"
              size="small"
              show-special
              :special="row?.special?.classify ?? 'other'"
            />
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="role === 'mine'"
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
            <ZActivityDuration
              :mode="
                (row as ActivityInstance).members.find((x: ActivityMember) => x._id === user._id)
                  ?.mode
              "
              :duration="
                (row as ActivityInstance).members.find((x: ActivityMember) => x._id === user._id)
                  ?.duration ?? 0
              "
              force="short"
            />
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="
            role === 'mine' ||
            role === 'class' ||
            (role === 'campus' &&
              (user.position.includes('admin') || user.position.includes('department')))
          "
          :label="t('activity.status.title')"
          :filters="
            statusFilter
              .filter((x) => role === 'mine' || (x !== 'rejected' && x !== 'draft'))
              .map((x) => ({
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
              v-if="role === 'mine'"
              :type="
                (row as ActivityInstance).members.find((x: ActivityMember) => x._id === user._id)
                  ?.status
              "
            />
            <ZActivityStatus
              v-else
              :type="row.status"
              :modifiable="
                (role === 'class' && (row.type === 'social' || row.type === 'scale')) ||
                user.position.includes('admin') ||
                user.position.includes('department')
              "
              :activity="row"
              :refresh="refresh"
              call-when-modify
            />
          </template>
        </ElTableColumn>
        <ElTableColumn v-else-if="role === 'campus'" :label="t('activity.form.pending')">
          <template #default="{ row }">
            {{
              (row as ActivityInstance).members.filter(
                (x: ActivityMember) => x.status === 'pending'
              ).length
            }}
            <span style="font-size: 12px; color: --el-text-color-secondary">{{
              t(
                'activity.units.item',
                (row as ActivityInstance).members.filter(
                  (x: ActivityMember) => x.status === 'pending'
                ).length
              )
            }}</span>
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right">
          <template #header>
            <ElInput v-model="searchWord" size="small" :prefix-icon="Search" @blur="query = searchWord" @keydown.enter="query = searchWord" />
          </template>
          <template #default="{ row }">
            <ZActivityImpressionDrawer
              :id="row._id"
              :role="role"
              :readonly="true"
            />
          </template>
        </ElTableColumn>
      </ElTable>
      <div class="py-2" v-if="activities.length !== 0">
        <ElPagination
          v-model:current-page="activePage"
          v-model:page-size="pageSize"
          :pager-count="3"
          :total="size"
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
