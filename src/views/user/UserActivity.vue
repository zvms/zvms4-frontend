<script setup lang="ts">
import { ElPageHeader, ElSpace, ElButton, ElDivider } from 'element-plus'
import { ref, watch, type Component as VueComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ZActivityList } from '@/components'
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

const path = ref(route.params?.type ?? 'mine')

const tab = ref((path.value as string).replace('/', ''))

const availibility = ref(true)

watch(
  () => route.params?.type,
  () => {
    if (route.path.startsWith('/activities/')) {
      tab.value = route.path.replace('/activities/', '') ?? 'mine'
    } else {
      tab.value = 'mine'
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
  tab.value = type
  router.push(`/activities/${type}`)
}
</script>

<template>
  <div class="p-4" style="width: 100%; height: 100%">
    <div class="flex px-12 py-4">
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
        <ElSpace v-if="x.visibility">
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
    <ZActivityList class="mx-12" :role="tab ?? 'mine'" />
  </div>
</template>
