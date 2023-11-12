<script setup lang="ts">
import { ElTabs, ElTabPane } from 'element-plus'
import { ref, watch } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import { useHeaderStore } from '@/stores/header'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import type { ActivityType } from '@/../@types/activity'

const header = useHeaderStore()
const { width, height } = useWindowSize()
const { t } = useI18n()

header.setHeader(t('nav.create'))

const route = useRoute()
const router = useRouter()

const path = ref(route.params?.type ?? '')

const tab = ref(path.value as string)

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

const tabs = ref<{ label: string; value: ActivityType | '' }[]>([
  // {
  //   label: t('nav.home'),
  //   value: '',
  //   component: CreateHome
  // },
  {
    label: '',
    value: 'specified',
  },
  {
    label: '',
    value: 'social',
  },
  {
    label: '',
    value: 'scale',
  },
  {
    label: '',
    value: 'special',
  }
])

const show = ref(true)

function mov(mov: string) {
  // console.log(mov)
  show.value = false
  tab.value = mov
  router.push(`/activity/create/${mov}`)
  setTimeout(() => {
    show.value = true
  }, 80)
}

watch(
  tab,
  () => {
    mov(tab.value)
  },
  // { immediate: true, deep: true }
)
</script>

<template>
  <div class="p-4" style="width: 100%">
    <ElTabs v-model="tab" class="pl-4" :tab-position="width < height ? 'top' : 'left'">
      <ElTabPane
        v-for="pane in tabs"
        :key="pane.value"
        :name="pane.value"
        :label="t(pane.value ? `activity.type.${pane.value}.short` : 'nav.create')"
      >
        <Transition
          enter-active-class="animate__animated animate__fadeInUp"
          leave-active-class="animate__animated animate__fadeOutUp"
          appear
        >
          <!-- <ZActivityCreate v-if="pane.value !== ''" :type="pane.value" /> -->
          <RouterView v-if="show" />
        </Transition>
      </ElTabPane>
    </ElTabs>
  </div>
</template>
