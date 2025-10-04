<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ElTable, ElTableColumn, ElCard, ElPagination, ElButton, ElInput } from 'element-plus'
import { ref, onMounted, watch } from 'vue'
import api from '@/api'
import type { Group } from '@/../types'
import { useWindowSize } from '@vueuse/core'
import { useUserStore } from '@/stores/user.ts'
import ZUserPosition from '../tags/ZUserPosition.vue'
import { Search } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'

const groups = ref<Group[]>([])
const { height } = useWindowSize()
const page = ref(1)
const router = useRouter()
const perpage = ref(10)
const loading = ref(false)
const search = ref('')
const total = ref(0)
const { t } = useI18n()

const tableHeight = ref(height.value * 0.6)

watch(height, () => {
  tableHeight.value = height.value * 0.6
})

function refresh() {
  loading.value = true
  api.group.read('all', page.value, perpage.value, search.value).then((res) => {
    groups.value = []
    if (!res) return
    groups.value.push(...res.groups)
    total.value = res.size
    loading.value = false
  }).catch(() => {
    loading.value = false
  })
}

onMounted(refresh)
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
  <div class="px-2">
    <ElCard shadow="hover" v-loading="loading">
      <ElTable :data="groups">
        <ElTableColumn prop="name" :label="t('manage.groupList.columns.name')"></ElTableColumn>
        <ElTableColumn prop="permission" :label="t('manage.groupList.columns.permission')">
          <template #default="{ row }">
            <ZUserPosition v-for="p in row.permissions" :key="p" :position="p" />
          </template>
        </ElTableColumn>
        <ElTableColumn label="Action">
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
            <ElButton type="primary" size="small" text bg @click="router.push(`/group/${row._id}`)">
              {{ t('manage.groupList.columns.details') }}
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
      <ElPagination
        class="py-2"
        v-model:currentPage="page"
        v-model:pageSize="perpage"
        :total="total"
        :page-sizes="[3, 5, 8, 10, 15, 20]"
        :pager-count="3"
        background
        layout="total, prev, pager, next, sizes, jumper"
      />
    </ElCard>
  </div>
</template>
