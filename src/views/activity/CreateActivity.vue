<script setup lang="ts">
import { ElPageHeader, ElButton, ElSpace } from 'element-plus'
import { ref, watch } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import { useHeaderStore } from '@/stores/header'
import { useI18n } from 'vue-i18n'
import type { ActivityType, CreateActivityType, UserPosition } from '@/../types'
import { ArrowLeft } from '@element-plus/icons-vue'
import classifications from '@/components/tags/classifications'
import CreateHome from './CreateHome.vue'
import { permissions } from '@/components/activity'
import { useUserStore } from '@/stores/user'

const header = useHeaderStore()
const { t } = useI18n()
const user = useUserStore()

window.onbeforeunload = (e) => {
  if (location.pathname.startsWith('/activity/create')) {
    e.preventDefault()
    return false
  }
}

header.setHeader(t('nav.create'))

const route = useRoute()
const router = useRouter()

const path = ref(route.params?.type ?? '')

const tab = ref(path.value as string)

watch(
  () => route.path,
  () => {
    if (route.path === '/activity/create') {
      tab.value = ''
    }
  }
)

watch(
  () => route.params?.type,
  (type) => {
    if (typeof type === 'string') {
      tab.value = type
    }
  },
  { immediate: true }
)

const tabs = Object.entries(classifications.create).map(([key, value]) => ({
  label: '',
  value: key as ActivityType,
  color: value.color,
  icon: value.icon
}))

const show = ref(true)

function mov(mov: string) {
  show.value = false
  //tab.value = mov
  if (mov == '') {
    router.push('/activity/create')
  } else {
    router.push(`/activity/create/${mov}`)
  }
  setTimeout(() => {
    show.value = true
  }, 80)
}

watch(tab, () => {
  mov(tab.value)
})

function returnHome() {
  //router.push('/activity/create')
  tab.value = ''
}

const visibility = permissions(user.position as UserPosition[])
</script>

<template>
  <div class="p-4" style="width: 100%">
    <Transition enter-active-class="animate__animated animate__fadeInRight" appear>
      <ElPageHeader v-if="tab" class="text-2xl px-12 py-6" @back="returnHome" :icon="ArrowLeft">
        <template #content>
          {{ $t(tab ? `activity.create.${tab}` : 'nav.create') }}
        </template>
        <template #extra>
          <ElSpace>
            <ElButton
              v-for="button in tabs.filter((x) => visibility[x.value as CreateActivityType])"
              :key="button.value"
              @click="mov(button.value)"
              text
              bg
              :icon="button.icon"
              :type="button.color"
              size="small"
              :disabled="button.value === tab"
            >
              {{ t(`activity.createMinimized.${button.value}`) }}
            </ElButton>
          </ElSpace>
        </template>
      </ElPageHeader>
    </Transition>
    <Transition
      v-if="show && tab"
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutUp"
      appear
      key="1"
    >
      <RouterView :key="tab" />
    </Transition>
    <Transition
      v-else-if="show && !tab"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      appear
      key="0"
    >
      <CreateHome @move="mov" />
    </Transition>
  </div>
</template>
