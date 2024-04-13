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
  ElSkeleton,
  ElDivider
} from 'element-plus'
import { onMounted, ref, toRefs, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import dayjs from 'dayjs'
import { Box, Search, PieChart, Refresh, Plus, EditPen, View } from '@element-plus/icons-vue'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { getActivity } from './getActivity'
import { ZActivityType, ZActivityStatus, ZActivityDuration, ZActivityCard } from '@/components'
import { useRouter } from 'vue-router'
import { Write } from '@icon-park/vue-next'

const { t } = useI18n()
const { width, height } = useWindowSize()
const router = useRouter()

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
  getActivity(
    user._id,
    role.value,
    activePage.value,
    pageSize.value,
    query.value,
    user.class_id ?? ''
  )
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
      inital.value = false
    })
    .catch(() => {
      loading.value = false
      inital.value = false
    })
}

onMounted(refresh)

watch(activePage, refresh)
watch(pageSize, refresh)
watch(query, () => {
  activePage.value = 1
  refresh()
})

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
      <div class="text-right">
        <ElButton
          type="success"
          :icon="Plus"
          text
          bg
          round
          @click="router.push('/activity/create')"
        >
          {{ t('nav.create') }}
        </ElButton>
        <ElDivider direction="vertical" />
        <ElButton type="primary" round class="px-1" text bg :icon="Refresh" @click="refresh">
          {{ t('activity.form.actions.refresh') }}
        </ElButton>
        <ElDivider direction="vertical" />
        <ElButton
          v-if="role === 'campus'"
          :icon="Box"
          type="warning"
          text
          bg
          round
          :disabled="!user.position.includes('admin')"
        >
          {{ t('activity.export.name') }}
        </ElButton>
        <ElButton v-else :icon="PieChart" type="warning" text bg circle disabled />
      </div>
      <ElTable
        :max-height="tableMaxHeight"
        :data="items"
        table-layout="auto"
        :on-sort-change="onSortChange"
        stripe
      >
        <ElTableColumn type="expand">
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
        <ElTableColumn fixed="right">
          <template #header>
            <ElInput
              v-model="searchWord"
              size="small"
              :prefix-icon="Search"
              @blur="query = searchWord"
              @keydown.enter="query = searchWord"
            />
          </template>
          <template #default="{ row }">
            <ElButton
              :icon="Write"
              v-if="
                role === 'mine' &&
                ['draft', 'rejected'].includes(
                  (row as ActivityInstance).members?.find((x: ActivityMember) => x._id === user._id)
                    ?.status ?? ''
                )
              "
              text
              bg
              type="primary"
              @click="router.push(`/activity/details/${row._id}/impression/${role}`)"
            >
              {{ t('activity.impression.actions.write') }}
            </ElButton>
            <ElButton
              :icon="EditPen"
              v-else-if="
                role === 'campus' &&
                (user.position.includes('admin') || user.position.includes('auditor')) &&
                row.members.filter((x: ActivityMember) => x.status === 'pending').length > 0
              "
              type="danger"
              text
              bg
              @click="router.push(`/activity/details/${row._id}/impression/${role}`)"
            >
              {{ t('activity.impression.actions.reflect') }}
            </ElButton>
            <ElButton
              :icon="View"
              v-else
              text
              bg
              type="info"
              @click="router.push(`/activity/details/${row._id}/impression/${role}`)"
            >
              {{ t('activity.impression.actions.view') }}
            </ElButton>
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
