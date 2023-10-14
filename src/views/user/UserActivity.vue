<script setup lang="ts">
import { ElTabs, ElTabPane } from 'element-plus'
import ZActivityList from '@/components/activity/ZActivityList.vue'
import { ref, type Component, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHeaderStore } from '@/stores/header'
import { useUserStore } from '@/stores/user'

const header = useHeaderStore()
const user = useUserStore()

header.setHeader('创建义工')

const route = useRoute()
const router = useRouter()

const path = ref(route.params?.type ?? '')

const tab = ref(path.value as string)

watch(
  tab,
  () => {
    router.push(`/activity/${path.value}`)
  },
  { immediate: true }
)

watch(
  () => route.params?.type,
  (type) => {
    if (typeof type === 'string') {
      console.log(type)
      tab.value = type
    }
  },
  { immediate: true }
)

function mov (mov: string) {
  tab.value = mov
}
</script>

<template>
  <div class="p-4" style="width: 100%">
    <ElTabs v-model="tab" class="pl-4" tab-position="left">
      <ElTabPane name="" label="我的义工">
        <ZActivityList role="student" :activities="[]" />
      </ElTabPane>
      <ElTabPane v-if="user.position.includes('auditor')" name="management" label="义工审计">
        <ZActivityList role="auditor" :activities="[]" />
      </ElTabPane>
      <ElTabPane v-if="user.position.includes('secretary')" name="management" label="班级义工">
        <ZActivityList role="secretary" :activities="[]" />
      </ElTabPane>
    </ElTabs>
  </div>
</template>
