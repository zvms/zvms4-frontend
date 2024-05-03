<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElTable, ElTableColumn, ElCard, ElPagination, ElInput, ElResult, ElButton } from 'element-plus'
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
const users = ref<User[]>([])
const page = ref(1)
const perpage = ref(10)
const loading = ref(false)
const search = ref('')
const total = ref(0)

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
  api.group.reads.users(id.value, page.value, perpage.value, search.value).then((res) => {
    users.value = []
    users.value.push(...res.users)
    total.value = res.size
    loading.value = false
  })
}
onMounted(refresh)
watch(id, refresh)
watch(page, refresh)
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
    <p class="text-2xl py-1">
      {{ group?.name }}
    </p>
    <p class="text-gray-700 dark:text-gray-200">
      {{ group?.description }}
    </p>
    <ElCard shadow="never" v-loading="loading">
      <ElTable :data="users" stripe :max-height="tableHeight">
        <ElTableColumn prop="name" label="Name" />
        <ElTableColumn prop="id" label="ID" />
        <ElTableColumn prop="group" label="Group">
          <template #default="{ row }">
            <ZUserGroup v-for="group in row.group" :key="group" :group="group" class="px-1" />
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
