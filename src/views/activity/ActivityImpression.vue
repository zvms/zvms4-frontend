<script setup lang="ts">
import type { ActivityInstance } from '@zvms/zvms4-types'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ZActivityImpressionManager } from '@/components'
import {
  ElHeader,
  ElLoading,
  ElScrollbar,
  ElCard,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElPageHeader,
  ElButton
} from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useWindowSize } from '@vueuse/core'
import api from '@/api'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { height } = useWindowSize()

const activityId = ref(route.params.id.toString())
const mode = ref<'mine' | 'class' | 'campus'>(
  route.params.mode.toString() as 'mine' | 'class' | 'campus'
)
const classify = ref(mode.value === 'mine' ? 'write' : 'reflect')

const activity = ref<ActivityInstance>()

onMounted(async () => {
  const loading = ElLoading.service({ fullscreen: true })
  try {
    activity.value = await api.activity.read.single(activityId.value)
  } finally {
    loading.close()
  }
})
</script>

<template>
  <div class="p-12">
    <ElPageHeader :icon="ArrowLeft" @back="() => router.back()">
      <template #content>
        {{ t(`activity.impression.page.${classify}.title`) }}
      </template>
      <template #breadcrumb>
        <ElBreadcrumb :separator-icon="ArrowRight">
          <ElBreadcrumbItem>
            <ElButton text size="small" @click="router.push({ path: '/activities' })">
              {{ t('nav.breadcrumbs.view.home') }}
            </ElButton>
          </ElBreadcrumbItem>
          <ElBreadcrumbItem>
            <ElButton text size="small">
              {{ t('nav.breadcrumbs.view.specific') }}
            </ElButton>
          </ElBreadcrumbItem>
          <ElBreadcrumbItem>
            <ElButton
              text
              size="small"
              @click="router.push({ path: `/activity/details/${activityId}` })"
            >
              {{ activity?.name }}
            </ElButton>
          </ElBreadcrumbItem>
          <ElBreadcrumbItem>
            <ElButton text size="small" type="info">
              {{ t(`activity.impression.page.${classify}.title`) }}
            </ElButton>
          </ElBreadcrumbItem>
        </ElBreadcrumb>
      </template>
    </ElPageHeader>
    <div class="py-4">
      <ElCard shadow="never">
        <ElScrollbar :max-height="height * 0.6">
          <ZActivityImpressionManager v-if="activity" :activity="activity" :role="mode" />
        </ElScrollbar>
      </ElCard>
    </div>
  </div>
</template>
