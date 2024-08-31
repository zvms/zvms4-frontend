<script setup lang="ts">
import { ElPageHeader, ElSpace, ElButton, ElDivider } from 'element-plus'
import { ref, watch, type Component as VueComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHeaderStore } from '@/stores/header'
import { useI18n } from 'vue-i18n'
import { User, Write, Group, School, Trophy } from '@icon-park/vue-next'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const header = useHeaderStore()
const { t } = useI18n()
const user = useUserStore()

header.setHeader(t('nav.activity'))

const route = useRoute()
const router = useRouter()

const path = ref(route.params?.type ?? '')

const tab = ref((path.value as string).replace('/', ''))

const availibility = ref(true)

watch(
  () => route.params?.type,
  () => {
    if (route.path.startsWith('/activities/')) {
      tab.value = route.path.replace('/activities/', '') ?? 'mine'
    }
  },
  { immediate: true }
)

const panes = [
  {
    value: 'mine',
    color: 'primary',
    icon: User,
    visibility: user.position.includes('student')
  },
  {
    value: 'class',
    color: 'warning',
    icon: Group,
    visibility: user.position.includes('secretary') || user.position.includes('admin')
  },
  {
    value: 'campus',
    color: 'danger',
    icon: School,
    visibility:
      user.position.includes('department') ||
      user.position.includes('auditor') ||
      user.position.includes('admin')
  }
] as Array<{
  value: string
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info' | ''
  icon: VueComponent
  visibility?: boolean
}>

function moveTo(type: string) {
  availibility.value = false
  tab.value = type
  if (type === 'trophy') router.push('/trophy')
  else router.push(`/activities/${type}`)
  setTimeout(() => {
    availibility.value = true
  }, 100)
}
</script>

<template>
  <div class="p-4" style="width: 100%">
    <div
      class="flex px-12 py-4"
      v-if="route.path.startsWith('/activities/') && !route.path.endsWith('register')"
    >
      <Transition appear enter-active-class="animate__animated animate__fadeIn">
        <span class="text-xl">
          {{ t(`activity.view.panels.${tab ? tab : 'mine'}.name`) }}
        </span>
      </Transition>
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeInRight"
        class="flex justify-end"
        style="margin-left: auto"
      >
        <ElSpace>
          <ElButton
            text
            bg
            size="small"
            v-for="pane in panes.filter((x) => x.visibility)"
            :key="pane.value"
            :type="pane.color"
            :icon="pane.icon"
            @click="moveTo(pane.value)"
            :disabled="tab === pane.value || (tab === '' && pane.value === 'mine')"
          >
            {{ t(`activity.view.panels.${pane.value}.short`) }}
          </ElButton>
        </ElSpace>
      </Transition>
    </div>
    <Transition appear v-else enter-active-class="animate__animated animate__fadeIn">
      <ElPageHeader
        :icon="ArrowLeft"
        class="text-xl px-12 py-4"
        @back="router.push('/activities/mine')"
      >
        <template #content>
          {{ t(`activity.view.panels.${tab}.name`) }}
        </template>
      </ElPageHeader>
    </Transition>
    <RouterView v-if="availibility" />
  </div>
</template>
