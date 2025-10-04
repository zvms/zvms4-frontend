<script setup lang="ts">
import type { ActivityInstance } from '@/../types'
import {
  ElDrawer,
  ElTable,
  ElTableColumn,
  ElButton,
  ElPagination,
  ElCard,
  ElInput,
  ElDivider
} from 'element-plus'
import type { TableInstance } from 'element-plus'
import { onMounted, ref, toRefs, watch, useTemplateRef } from 'vue'
import { useUserStore } from '@/stores/user'
import dayjs from '@/plugins/dayjs'
import { Box, Search, PieChart, Refresh, View } from '@element-plus/icons-vue'
import { useWindowSize, useSwipe, usePointerSwipe } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { getActivity } from './getActivity'
import { ZActivityType, ZActivityStatus, ZActivityDuration, ZActivityCard } from '@/components'
import { useRouter, useRoute } from 'vue-router'
import ZDataExport from '@/components/utils/ZDataExport.vue'
import { pad } from '@/plugins/ua.ts'
import type { Activity } from '@/../types/v2'

const { t } = useI18n()
const { width, height } = useWindowSize()
const router = useRouter()
const route = useRoute()

const user = useUserStore()

const props = withDefaults(
  defineProps<{
    role: 'campus' | 'class' | 'mine'
    embed?: boolean
    perspective?: string
    classTarget?: string
    modelValue?: Activity[]
    selectTarget?: string
    selectedMax?: number
    select?: boolean
  }>(),
  {
    role: 'mine',
    embed: false,
    perspective: 'mine',
    selectTarget: '',
    selectedMax: 0, // Infinite
    select: false
  }
)
const emits = defineEmits(['update:modelValue'])

const tableRef = ref<TableInstance>()
const activePage = ref(parseInt(route.query?.page?.toString() ?? '1') ?? 1)
const pageSize = ref(parseInt(route.query?.perpage?.toString() ?? '8') ?? 8)
const size = ref(0)

const { role, perspective: persp, selectTarget, classTarget, select, embed } = toRefs(props)
// eslint-disable-next-line vue/no-dupe-keys
const perspective = ref(persp.value === 'mine' ? user._id : persp.value)
const loading = ref(true)
const searchWord = ref(route.query?.search?.toString() ?? '')
const query = ref(route.query?.search?.toString() ?? '')

const activities = ref<Activity[]>([])

const sort = ref('_id')
const asc = ref(false)

function refresh() {
  loading.value = true
  getActivity(
    perspective.value === 'mine' ? user._id : perspective.value,
    role.value,
    activePage.value,
    pageSize.value,
    query.value,
    classTarget.value ?? user.class_id ?? '',
    selectTarget.value,
    sort.value,
    asc.value
  )
    .then((res) => {
      if (res && res?.activities?.length !== 0) {
        activities.value = res?.activities
        size.value = res?.total
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

onMounted(refresh)

watch(selectTarget, refresh)

const tableMaxHeight = ref(height.value * 0.56)

watch(width, () => {
  tableMaxHeight.value = height.value * 0.56
})

const items = ref<Activity[]>([])

watch(
  activities,
  () => {
    items.value = activities.value
  },
  { immediate: true }
)

function selectable(row: ActivityInstance) {
  return (
    (selectTarget.value.toLowerCase().includes(row.type.toLowerCase()) ||
      selectTarget.value === '') &&
    row.status === 'effective'
  )
}

function handleSelectionChange(val: string[]) {
  emits('update:modelValue', val)
}

function confirmPage() {
  refresh()
  router.replace({
    query: { perpage: pageSize.value, page: activePage.value, search: searchWord.value }
  })
}

watch(pageSize, confirmPage)
watch(activePage, confirmPage)
watch(query, confirmPage)

const openExport = ref(false)

async function onSortChange(data: {
  column: Activity
  prop: string
  order?: 'ascending' | 'descending'
}) {
  if (data.order) {
    sort.value = data.prop
    asc.value = data.order === 'ascending'
  } else {
    sort.value = '_id'
    asc.value = false
  }
  refresh()
}

const el = useTemplateRef('card')
// @ts-ignore
const { isSwiping, direction } = useSwipe(el)

watch(isSwiping, (swiping) => {
  if (swiping && direction.value === 'right') {
    if (activePage.value > 1) {
      activePage.value -= 1
      refresh()
    }
  } else if (swiping && direction.value === 'left') {
    if (activePage.value < Math.ceil(size.value / pageSize.value)) {
      activePage.value += 1
      refresh()
    }
  }
})

// @ts-ignore
const { isSwiping: isPointerSwiping, direction: pointerDirection } = usePointerSwipe(el)

watch(isPointerSwiping, (swiping) => {
  if (swiping && pointerDirection.value === 'left') {
    if (activePage.value > 1) {
      activePage.value -= 1
      refresh()
    }
  } else if (swiping && pointerDirection.value === 'right') {
    if (activePage.value < Math.ceil(size.value / pageSize.value)) {
      activePage.value += 1
      refresh()
    }
  }
})
</script>

<template>
  <div class="max-w-full">
    <ElDrawer
      direction="rtl"
      size="50%"
      v-model="openExport"
      :title="t('manage.exports.title')"
      center
    >
      <ZDataExport type="time" v-model="openExport" />
    </ElDrawer>
    <ElCard ref="card" shadow="never" v-loading="loading" :class="[embed ? 'z-embed' : '']">
      <div class="text-lg px-2">
        <slot name="title" />
      </div>
      <div v-if="perspective === user._id && !selectTarget" class="text-right">
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
      </div>
      <!-- @vue-ignore -->
      <ElTable
        :ref="tableRef"
        :max-height="tableMaxHeight"
        :data="items"
        table-layout="auto"
        row-key="_id"
        @selection-change="handleSelectionChange"
        stripe
        :key="selectTarget || 'all'"
        @sort-change="onSortChange"
      >
        <ElTableColumn v-if="select" type="selection" :selectable="selectable" reserve-selection />
        <ElTableColumn v-else type="expand">
          <template #default="{ row }">
            <ZActivityCard
              :_id="row._id"
              :mode="role"
              :perspective="perspective"
              :user-session="row?.mine?._id"
              @refresh="refresh"
            />
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" sortable :label="t('activity.form.name')" />
        <ElTableColumn prop="date" sortable :label="t('activity.form.date')">
          <template #default="{ row }">
            {{ dayjs(row.date).format('YYYY-MM-DD') }}
          </template>
        </ElTableColumn>
        <ElTableColumn
          prop="type"
          v-if="role !== 'mine'"
          :label="t('activity.form.type')"
        >
          <template #default="{ row }">
            <ZActivityType
              :type="row.type"
              size="small"
              special="other"
              :status="row?.status"
              :status-modifiable="
                user.position.includes('admin') ||
                user.position.includes('department')
              "
              :activity="row"
              :refresh="refresh"
              call-when-modify
            />
          </template>
        </ElTableColumn>
        <ElTableColumn v-else :label="t('activity.form.duration')">
          <template #default="{ row }">
            <ZActivityDuration
              :mode="row.mine.mode"
              :duration="row.mine.duration"
              force="short"
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
              @click="
                router.push(
                  `/activity/details/${row._id}` +
                    (role === 'mine' ? '?session=' + row.mine._id : '')
                )
              "
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

.el-card.z-embed {
  padding: 0 !important;
}

.el-card.z-embed > .el-card__body {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
