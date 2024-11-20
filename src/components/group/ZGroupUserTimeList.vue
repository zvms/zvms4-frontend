<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElTable, ElTableColumn, ElCard, ElPagination, ElInput, ElResult, ElButton, ElSwitch, ElFormItem } from 'element-plus'
import { ref, onMounted, toRefs, watch } from 'vue'
import api from '@/api'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import type { User, Group } from '@zvms/zvms4-types'
import { ZUserGroup } from '@/components'
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
const time = ref<{
  _id: string
  name: string
  id: string
  'on-campus': number
  'off-campus': number
  'social-practice': number
}[]>([])
const page = ref(1)
const perpage = ref(10)
const loading = ref(false)
const search = ref('')
const total = ref(0)
const diff = ref(false)

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

const refresh = () => {
  loading.value = true
  api.group.reads.time(id.value, page.value, perpage.value, search.value, true, diff.value).then((res) => {
    time.value = []
    time.value.push(...res.time)
    total.value = res.size
    loading.value = false
  })
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
        <ElFormItem label="Diff" style="text-align: right">
          <ElSwitch v-model="diff"></ElSwitch>
        </ElFormItem>
      </div>
      <ElTable :data="time" stripe :max-height="tableHeight">
        <ElTableColumn prop="name" label="Name" />
        <ElTableColumn prop="id" label="ID" />
        <ElTableColumn prop="on-campus" label="On Campus" v-if="diff">
          <template #default="{ row }">
            <span class="color-green" v-if="row['on-campus'] <= 0">Complete</span>
            <span class="color-red" v-else>
              {{ row['on-campus'].toFixed(1) }}h
            </span>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="on-campus" label="On Campus" v-else>
          <template #default="{ row }">
            <span class="color-green" v-if="row['on-campus'] >= 30">{{ row['on-campus'].toFixed(1) }}</span>
            <span class="color-red" v-else>
              {{ row['on-campus'].toFixed(1) }}
            </span>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="off-campus" label="Off Campus" v-if="diff">
          <template #default="{ row }">
            <span class="color-green" v-if="row['off-campus'] <= 0">Complete</span>
            <span class="color-red" v-else>
              {{ row['off-campus'].toFixed(1) }}h
            </span>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="off-campus" label="Off Campus" v-else>
          <template #default="{ row }">
            <span class="color-green" v-if="row['off-campus'] >= 15">{{ row['off-campus'].toFixed(1) }}</span>
            <span class="color-red" v-else>{{ row['off-campus'].toFixed(1) }}</span>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="social-practice" label="Social Practice" v-if="diff">
          <template #default="{ row }">
            <span class="color-green" v-if="row['social-practice'] <= 0">Complete</span>
            <span class="color-red" v-else>
              {{ row['social-practice'].toFixed(1) }}h
            </span>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="social-practice" label="Social Practice" v-else>
          <template #default="{ row }">
            <span class="color-green" v-if="row['social-practice'] >= 18">{{ row['social-practice'].toFixed(1) }}</span>
            <span class="color-red" v-else>{{ row['social-practice'].toFixed(1) }}</span>
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right">
          <template #header>
            <ElInput
              v-model="search"
              size="small"
              placeholder="Search"
              :prefix-icon="Search"
              @blur="handleSearch"
              @keyup.enter="handleSearch"
            />
          </template>
          <template #default="{ row }">
            <ElButton text bg size="small" @click="router.push(`/user/${row._id}`)">
              Details
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
