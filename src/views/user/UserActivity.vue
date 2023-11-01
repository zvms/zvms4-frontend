<script setup lang="ts">
import { ElTabs, ElTabPane } from 'element-plus'
import ZActivityList from '@/components/activity/ZActivityList.vue'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHeaderStore } from '@/stores/header'
import { useUserStore } from '@/stores/user'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const header = useHeaderStore()
const user = useUserStore()
const { t } = useI18n()

header.setHeader(t('nav.activity'))

const route = useRoute()
const router = useRouter()

const path = ref(route.params?.type ?? '')

const tab = ref(path.value as string)

const { width, height } = useWindowSize()

const useVertical = ref(width.value < height.value)

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
    <ElTabs v-model="tab" class="pl-4" :tab-position="useVertical ? 'top' : 'left'">
      <ElTabPane name="" :label="t('activity.panels.mine')">
        <p class="text-2xl py-4 px-12">{{ t('activity.panels.title.mine') }}</p>
        <ZActivityList role="student" :activities="[]" />
      </ElTabPane>
      <ElTabPane
        v-if="user.position.includes('auditor')"
        name="management"
        :label="t('activity.panels.admin.global')"
      >
        <p class="text-2xl py-4 px-12">{{ t('activity.panels.title.global') }}</p>
        <ZActivityList role="auditor" :activities="[]" />
      </ElTabPane>
      <ElTabPane
        v-if="user.position.includes('secretary')"
        name="management"
        :label="t('activity.panels.admin.secretary')"
      >
        <p class="text-2xl py-4 px-12">{{ t('activity.panels.title.class') }}</p>
        <ZActivityList role="secretary" :activities="[]" />
      </ElTabPane>
    </ElTabs>
  </div>
</template>
