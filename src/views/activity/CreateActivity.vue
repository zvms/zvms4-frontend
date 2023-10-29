<script setup lang="ts">
import { ElTabs, ElTabPane } from 'element-plus'
import CreateOffCampus from './CreateOffCampus.vue'
import CreateSpecial from './CreateSpecial.vue'
import CreateSpecified from './CreateSpecified.vue'
import CreateHome from './CreateHome.vue'
import { ref, type Component, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHeaderStore } from '@/stores/header'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const header = useHeaderStore()
const { width, height } = useWindowSize()
const { t } = useI18n()

header.setHeader(t('nav.create'))

const route = useRoute()
const router = useRouter()

const path = ref(route.params?.type ?? '')

const tab = ref(path.value as string)

watch(
  tab,
  () => {
    router.push(`/activity/create/${path.value}`)
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

const tabs = ref<{ label: string; value: string; component: Component }[]>([
  {
    label: t('nav.home'),
    value: '',
    component: CreateHome
  },
  {
    label: t('activity.columns.shorts.specified'),
    value: 'specified',
    component: CreateSpecified
  },
  {
    label: t('activity.columns.shorts.special'),
    value: 'special',
    component: CreateSpecial
  },
  {
    label: t('activity.columns.shorts.off-campus'),
    value: 'off-campus',
    component: CreateOffCampus
  }
])

function mov(mov: string) {
  tab.value = mov
}
</script>

<template>
  <div class="p-4" style="width: 100%">
    <ElTabs v-model="tab" class="pl-4" :tab-position="width < height ? 'top' : 'left'">
      <ElTabPane v-for="pane in tabs" :key="pane.value" :name="pane.value" :label="pane.label">
        <Transition
          enter-active-class="animate__animated animate__fadeInDown"
          leave-active-class="animate__animated animate__fadeOutUp"
          appear
        >
          <Component :is="pane.component" @move="mov" />
        </Transition>
      </ElTabPane>
    </ElTabs>
  </div>
</template>
