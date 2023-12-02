<script setup lang="ts">
import { ElTabs, ElTabPane } from 'element-plus'
import { ZActivityList } from '@/components'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHeaderStore } from '@/stores/header'
import { useUserStore } from '@/stores/user'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import type { ActivityInstance } from '@/../@types/activity'
import api from '@/api'

const header = useHeaderStore()
const user = useUserStore()
const { t } = useI18n()

header.setHeader(t('nav.activity'))

const route = useRoute()
const router = useRouter()

const path = ref(route.params?.type ?? '')

const tab = ref(path.value as string)

const { width, height } = useWindowSize()

const activities = ref<ActivityInstance[]>([])

const loading = ref(true)

api.activity.read.campus({
  type: 'all'
}).then((res) => {
  loading.value = false
  activities.value = res as ActivityInstance[]
})

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
</script>

<template>
  <div class="p-4" style="width: 100%">
    <ElTabs v-model="tab" class="pl-4" :tab-position="width < height * 1.2 ? 'top' : 'left'">
      <ElTabPane name="" :label="t('nav.activities.mine')">
        <p class="text-2xl py-4 px-12">{{ t('nav.activities.mine') }}</p>
        <ZActivityList role="mine" :activities="activities" :loading="loading" />
      </ElTabPane>
      <ElTabPane name="register" :label="t('nav.activities.register')">
        <p class="text-2xl py-4 px-12">{{ t('nav.activities.register') }}</p>
      </ElTabPane>
      <ElTabPane
        v-if="user.position.includes('secretary')"
        name="class"
        :label="t('nav.activities.class')"
      >
        <p class="text-2xl py-4 px-12">{{ t('nav.activities.class') }}</p>
        <ZActivityList role="class" :activities="activities" :loading="loading" />
      </ElTabPane>
      <ElTabPane
        v-if="user.position.includes('auditor') || user.position.includes('department')"
        name="campus"
        :label="t('nav.activities.campus')"
      >
        <p class="text-2xl py-4 px-12">{{ t('nav.activities.campus') }}</p>
        <ZActivityList role="campus" :activities="activities" :loading="loading" />
      </ElTabPane>
    </ElTabs>
  </div>
</template>
