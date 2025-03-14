<script setup lang="ts">
import type { ActivityInstance, ActivityMember, ActivityType } from '@/../types'
import {
  ElDrawer,
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
import { Box, Search, PieChart, Refresh, View } from '@element-plus/icons-vue'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { getActivity } from './getActivity'
import { ZActivityType, ZActivityStatus, ZActivityDuration, ZActivityCard } from '@/components'
import { useRouter, useRoute } from 'vue-router'
import ZDataExport from '@/components/utils/ZDataExport.vue'
import { pad } from '@/plugins/ua.ts'

const { t } = useI18n()
const { width, height } = useWindowSize()
const router = useRouter()
const route = useRoute()

const user = useUserStore()

const props = withDefaults(
  defineProps<{
    role: 'campus' | 'class' | 'mine'
    perspective?: string
    classTarget?: string
    modelValue?: ActivityInstance[]
    selectTarget?: ActivityType | ''
  }>(),
  {
    role: 'mine',
    perspective: 'mine',
    selectTarget: ''
  }
)
const emits = defineEmits(['update:modelValue'])

const activePage = ref(parseInt(route.query?.page?.toString() ?? '1') ?? 1)
const pageSize = ref(parseInt(route.query?.perpage?.toString() ?? '8') ?? 8)
const size = ref(0)

const { role, perspective: persp, selectTarget, classTarget, modelValue } = toRefs(props)
// eslint-disable-next-line vue/no-dupe-keys
const perspective = ref(persp.value === 'mine' ? user._id : persp.value)
const loading = ref(true)
const initial = ref(true)
const searchWord = ref(route.query?.search?.toString() ?? '')
const query = ref(route.query?.search?.toString() ?? '')

const activities = ref<ActivityInstance[]>([])

function refresh() {
  loading.value = true
  getActivity(
    perspective.value === 'mine' ? user._id : perspective.value,
    role.value,
    activePage.value,
    pageSize.value,
    query.value,
    classTarget.value ?? user.class_id ?? '',
    (selectTarget.value && selectTarget.value !== '') ? selectTarget.value : 'all',
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
      initial.value = false
    })
    .catch(() => {
      loading.value = false
      initial.value = false
    })
}

onMounted(refresh)

watch(activePage, refresh)
watch(pageSize, refresh)
watch(query, refresh)
watch(selectTarget, refresh)

const tableMaxHeight = ref(height.value * 0.56)

watch(width, () => {
  tableMaxHeight.value = height.value * 0.56
})

const items = ref<ActivityInstance[]>([])

watch(
  activities,
  () => {
    items.value = activities.value
  },
  { immediate: true }
)

function selectable(row: ActivityInstance) {
  return selectTarget.value.toLowerCase() === row.type.toLowerCase() && row.status === 'effective'
}

function handleSelectionChange(val: string[]) {
  emits('update:modelValue', val)
}

function confirmPage() {
  router.push({ query: { perpage: pageSize.value, page: activePage.value, search: searchWord.value }})
}

watch(pageSize, confirmPage)
watch(activePage, confirmPage)
watch(query, confirmPage)

const openExport = ref(false)
</script>

<template>
  <div class="max-w-full">
    <ElDrawer direction="rtl" size="50%" v-model="openExport" :title="t('manage.exports.title')" center>
      <ZDataExport type="time" v-model="openExport" />
    </ElDrawer>
    <ElSkeleton
      v-if="loading && initial"
      :loading="loading && initial"
      :rows="8"
      animated
      class="pt-4 px-4"
      :throttle="500"
    />
    <ElCard shadow="never" v-else v-loading="loading && !initial">
      <div class="text-lg px-2">
        <slot name="title" />
      </div>
      <div v-if="perspective === user._id" class="text-right">
        <ElButton type="primary" round class="px-1" text bg :icon="Refresh" @click="refresh">
          {{ t('activity.form.actions.refresh') }}
        </ElButton>
        <ElDivider v-if="!pad()" direction="vertical" />
        <ElButton
          v-if="role === 'campus' && !pad()"
          :icon="Box"
          @click="openExport = true"
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
        @selection-change="handleSelectionChange"
        stripe
      >
        <ElTableColumn v-if="selectTarget" type="selection" :selectable="selectable" />
        <ElTableColumn v-else type="expand">
          <template #default="{ row }">
            <ZActivityCard
              :_id="row._id"
              :mode="role"
              :perspective="perspective"
              @refresh="refresh"
            />
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" :label="t('activity.form.name')" />
        <ElTableColumn prop="date" :label="t('activity.form.date')">
          <template #default="{ row }">
            {{ dayjs(row.date).format('YYYY-MM-DD') }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="type" v-if="role !== 'mine'" :label="t('activity.form.type')">
          <template #default="{ row }">
            <ZActivityType
              :type="row.type"
              size="small"
              show-special
              :special="row?.special?.classify ?? 'other'"
              :status="row?.status"
              :status-modifiable="
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
        <ElTableColumn v-if="role === 'mine'" :label="t('activity.form.duration')">
          <template #default="{ row }">
            <ZActivityDuration
              v-if="
                (row as ActivityInstance).members.find((x: ActivityMember) => x._id === perspective)
                  ?.status === 'effective'
              "
              :mode="
                (row as ActivityInstance).members.find((x: ActivityMember) => x._id === perspective)
                  ?.mode
              "
              :duration="
                (row as ActivityInstance).members.find((x: ActivityMember) => x._id === perspective)
                  ?.duration ?? 0
              "
              force="short"
            />
            <ZActivityStatus
              v-else
              :type="
                (row as ActivityInstance).members.find((x: ActivityMember) => x._id === perspective)
                  ?.status
              "
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
              :icon="View"
              v-if="selectTarget === ''"
              text
              bg
              type="info"
              @click="router.push(`/activity/details/${row._id}`)"
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
        />
      </div>
    </ElCard>
  </div>
</template>

<style scoped>
.code {
  font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'Courier', 'monospace';
}
</style>
