<script setup lang="ts">
import { ElPageHeader, ElButton, ElSpace, ElTooltip } from 'element-plus'
import { ref, watch } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import { useHeaderStore } from '@/stores/header'
import { useI18n } from 'vue-i18n'
import type { ActivityType, UserPosition } from '@/../types'
import { ArrowLeft, InfoFilled } from '@element-plus/icons-vue'
import classifications from '@/components/tags/classifications'
import CreateHome from './CreateHome.vue'
import { permissions } from '@/components/activity'
import { useUserStore } from '@/stores/user'

const header = useHeaderStore()
const { t } = useI18n()
const user = useUserStore()

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

const tabs = Object.entries(classifications.type).map(([key, value]) => ({
  label: '',
  value: key as ActivityType,
  color: value.color,
  icon: value.icon
}))

const show = ref(true)

function mov(mov: string) {
  show.value = false
  tab.value = mov
  router.push(`/activity/create/${mov}`)
  setTimeout(() => {
    show.value = true
  }, 80)
}

watch(tab, () => {
  mov(tab.value)
})

function returnHome() {
  router.push('/activity/create')
  tab.value = ''
}

const visibility = permissions(user.position as UserPosition[])
</script>

<template>
  <div class="p-4" style="width: 100%">
    <Transition enter-active-class="animate__animated animate__fadeInRight" appear>
      <ElPageHeader v-if="tab" class="text-2xl px-12 py-6" @back="returnHome" :icon="ArrowLeft">
        <template #content>
          {{ $t(tab ? `activity.type.${tab}.name` : 'nav.create') }}
          <ElTooltip
            v-if="tab"
            :content="t('activity.type.' + tab + '.description')"
            effect="light"
            placement="bottom"
          >
            <ElButton :icon="InfoFilled" text circle size="small" />
          </ElTooltip>
        </template>
        <template #extra>
          <ElSpace>
            <ElButton
              v-for="button in tabs.filter((x) => visibility[x.value as ActivityType])"
              :key="button.value"
              @click="mov(button.value)"
              text
              bg
              :icon="button.icon"
              :type="button.color"
              size="small"
              :disabled="button.value === tab"
            >
              {{ t(`activity.type.${button.value}.short`) }}
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
    >
      <RouterView />
    </Transition>
    <Transition
      v-else-if="show && !tab"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      appear
    >
      <CreateHome @move="mov" />
    </Transition>
  </div>
</template>
