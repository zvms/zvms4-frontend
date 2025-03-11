<script setup lang="ts">
import type { Log } from '@/../types/log'
import { ref, watch, toRefs } from 'vue'
import api from '@/api'
import ZLogCard from '@/components/log/ZLogCard.vue'
import { ElPagination, ElInput } from 'element-plus'

const props = withDefaults(defineProps<{
  user: string
}>(), {
  user: ''
})

const { user } = toRefs(props)

const logs = ref<Log[]>([])
const loading = ref(false)
const page = ref(1)
const perpage = ref(10)
const query = ref('')
const amount = ref(0)

async function refresh() {
  const result = (await api.logs.read(page.value, perpage.value, query.value, user.value))
  logs.value = result?.data ?? []
  amount.value = result?.size ?? 0
}
refresh()

watch(page, refresh)
watch(perpage, refresh)
watch(query, refresh)
</script>

<template>
  <div>
    <ElInput v-model.lazy="query"></ElInput>
    <ZLogCard v-loading="loading" :log="log" v-for="log in logs" :key="log._id" />
    <div class="py-2">
      <ElPagination
        v-model:current-page="page"
        v-model:page-size="perpage"
        :pager-count="3"
        :total="amount"
        layout="total, prev, pager, next, sizes, jumper"
        background
        :page-sizes="[3, 5, 8, 10, 15, 20]"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
