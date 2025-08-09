<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  ElTable,
  ElTableColumn,
  ElCard,
  ElPagination,
  ElInput,
  ElResult,
  ElButton,
  ElSwitch,
  ElFormItem
} from 'element-plus'
import { ref, onMounted, toRefs, watch } from 'vue'
import api from '@/api'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import type { Group } from '@/../types'
import { useWindowSize } from '@vueuse/core'
import { Search } from '@element-plus/icons-vue'

const router = useRouter()
const { height } = useWindowSize()
const { t } = useI18n()
const userStore = useUserStore()

const props = withDefaults(
  defineProps<{
    id: string
  }>(),
  {
    id: ''
  }
)
const group = ref<Group>()
const time = ref<
  {
    _id: string
    name: string
    id: string
    'on-campus': number
    'off-campus': number
    'social-practice': number
  }[]
>([])
const page = ref(1)
const perpage = ref(10)
const loading = ref(false)
const search = ref('')
const total = ref(0)
const diff = ref(false)
const sort = ref('_id')
const asc = ref(true)

const { id } = toRefs(props)

const tableHeight = ref(height.value * 0.6)

watch(height, () => {
  tableHeight.value = height.value * 0.6
})

onMounted(() => {
  api.group.readOne(id.value).then((res) => {
    group.value = res
  })
})

watch(id, () => {
  api.group.readOne(id.value).then((res) => {
    group.value = res
  })
})

const refresh = async () => {
  loading.value = true
  const res =
    id.value === ''
      ? await api.time.reads(search.value, page.value, perpage.value, sort.value, asc.value)
      : ((await api.group.reads.time(
          id.value,
          page.value,
          perpage.value,
          search.value,
          false,
          diff.value,
          sort.value,
          asc.value
        )) as {
          time: {
            _id: string
            name: string
            id: string
            'on-campus': number
            'off-campus': number
            'social-practice': number
          }[]
          size: number
        })
  time.value = []
  time.value.push(...res.time)
  total.value = res.size
  loading.value = false
}
onMounted(refresh)
watch(id, refresh)
watch(page, refresh)
watch(diff, refresh)
watch(perpage, () => {
  page.value = 1
  refresh()
})

function handleSearch() {
  page.value = 1
  refresh()
}

async function onSortChange(data: {
  column: unknown
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
</script>

<template>
  <div
    v-if="
      userStore.position.includes('admin') ||
      userStore.position.includes('department') ||
      userStore.groups.includes(id)
    "
  >
    <ElCard shadow="never" v-loading="loading">
      <div style="text-align: right" class="my-2">
        <ElFormItem :label="t('manage.groupDetails.timeList.diff')" style="text-align: right">
          <ElSwitch v-model="diff"></ElSwitch>
        </ElFormItem>
      </div>
      <ElTable :data="time" stripe :max-height="tableHeight" @sort-change="onSortChange">
        <ElTableColumn prop="name" :label="t('manage.groupDetails.userList.columns.name')" />
        <ElTableColumn prop="id" sortable :label="t('manage.groupDetails.userList.columns.id')" />
        <ElTableColumn prop="on-campus" :label="t('activity.mode.on-campus.short')" v-if="diff">
          <template #default="{ row }">
            <span class="color-green" v-if="row['on-campus'] <= 0">{{
              t('manage.groupDetails.timeList.filled')
            }}</span>
            <span class="color-red" v-else>
              {{
                t('manage.groupDetails.timeList.diffed', { time: row['on-campus'].toFixed(1) })
              }}</span
            >
          </template>
        </ElTableColumn>
        <ElTableColumn prop="on-campus" sortable :label="t('activity.mode.on-campus.short')" v-else>
          <template #default="{ row }">
            <span class="color-green" v-if="row['on-campus'] >= 25">{{
              row['on-campus'].toFixed(1)
            }}</span>
            <span class="color-red" v-else>
              {{ row['on-campus'].toFixed(1) }}
            </span>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="off-campus" :label="t('activity.mode.off-campus.short')" v-if="diff">
          <template #default="{ row }">
            <span class="color-green" v-if="row['off-campus'] <= 0">{{
              t('manage.groupDetails.timeList.filled')
            }}</span>
            <span class="color-red" v-else>
              {{
                t('manage.groupDetails.timeList.diffed', { time: row['off-campus'].toFixed(1) })
              }}</span
            >
          </template>
        </ElTableColumn>
        <ElTableColumn
          prop="off-campus"
          sortable
          :label="t('activity.mode.off-campus.short')"
          v-else
        >
          <template #default="{ row }">
            <span class="color-green" v-if="row['off-campus'] >= 15">{{
              row['off-campus'].toFixed(1)
            }}</span>
            <span class="color-red" v-else>{{ row['off-campus'].toFixed(1) }}</span>
          </template>
        </ElTableColumn>
        <ElTableColumn
          prop="social-practice"
          :label="t('activity.mode.social-practice.short')"
          v-if="diff"
        >
          <template #default="{ row }">
            <span class="color-green" v-if="row['social-practice'] <= 0">{{
              t('manage.groupDetails.timeList.filled')
            }}</span>
            <span class="color-red" v-else>
              {{
                t('manage.groupDetails.timeList.diffed', {
                  time: row['social-practice'].toFixed(1)
                })
              }}</span
            >
          </template>
        </ElTableColumn>
        <ElTableColumn
          prop="social-practice"
          :label="t('activity.mode.social-practice.short')"
          sortable
          v-else
        >
          <template #default="{ row }">
            <span class="color-green" v-if="row['social-practice'] >= 18">{{
              row['social-practice'].toFixed(1)
            }}</span>
            <span class="color-red" v-else>{{ row['social-practice'].toFixed(1) }}</span>
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right">
          <template #header>
            <ElInput
              v-model="search"
              size="small"
              :placeholder="t('manage.groupList.columns.search')"
              :prefix-icon="Search"
              @blur="handleSearch"
              @keyup.enter="handleSearch"
            />
          </template>
          <template #default="{ row }">
            <ElButton text bg size="small" @click="router.push(`/user/${row._id}`)">
              {{ t('manage.groupList.columns.details') }}
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
      <ElPagination
        class="py-1 pt-4"
        v-model:current-page="page"
        v-model:page-size="perpage"
        :total="total"
        :pager-count="3"
        layout="total, prev, pager, next, sizes, jumper"
        background
        :page-sizes="[3, 5, 8, 10, 15, 20]"
      />
    </ElCard>
  </div>
  <ElResult v-else />
</template>
