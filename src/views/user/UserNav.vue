<script setup lang="ts">
import {
  CirclePlusFilled,
  HomeFilled,
  InfoFilled,
  Sunny,
  Moon,
  SwitchButton,
  Notification
} from '@element-plus/icons-vue'
import Feedback from '@/icons/MaterialSymbolsFeedbackOutlineRounded.vue'
import Password from '@/icons/MaterialSymbolsPasswordRounded.vue'
import { ElButton, ElDivider, ElTooltip } from 'element-plus'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
// import { useRoute, useRouter } from 'vue-router'
import MdiEye from '@/icons/MdiEye.vue'
import MdiUmbrella from '@/icons/MdiUmbrella.vue'
import MaterialSymbolsSettings from '@/icons/MaterialSymbolsSettings.vue'
import { useWindowSize } from '@vueuse/core'
import type { Component as VueComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import ZSelectLanguage from '@/components/form/ZSelectLanguage.vue'

const user = useUserStore()
const router = useRouter()
const dark = useDark()
const { t, locale } = useI18n({
  useScope: 'global'
})

const path = ref(new URL(window.location.href).pathname)

const { height } = useWindowSize()

const actions: Array<{
  icon: VueComponent
  name: string
  path: string
  show: boolean
  action: () => void
}> = [
  {
    icon: Feedback,
    name: t('nav.feedback'),
    path: '/feedback/',
    show: true,
    action: () => {
      router.push('/feedback/')
      routeTo('/feedback/')
    }
  },
  {
    icon: Notification,
    name: t('nav.broadcast'),
    path: '/notification/',
    show: true,
    action: () => {
      router.push('/notification/')
      routeTo('/notification/')
    }
  },
  {
    icon: Password,
    name: t('nav.reset'),
    path: '/password',
    show: true,
    action: () => {
      router.push('/password')
      routeTo('/password')
    }
  },
  {
    icon: SwitchButton,
    name: t('nav.exit'),
    path: '/logout',
    show: true,
    action: () => {
      user.removeUser()
      router.push('/user/login')
    }
  }
]

const navs: Array<{
  icon: VueComponent
  name: string
  path: string
  show: boolean
}> = [
  {
    icon: HomeFilled,
    name: 'home',
    path: '/user/',
    show: true
  },
  {
    icon: MdiEye,
    name: 'activity',
    path: '/activity/',
    show: true
  },
  {
    icon: CirclePlusFilled,
    name: 'create',
    path: '/activity/create',
    show: true
  },
  {
    icon: MdiUmbrella,
    name: '漂流伞',
    path: '/umbrella',
    show: false
  },
  // {
  //   icon: Management,
  //   name: '管理',
  //   path: '/activity/management',
  //   show: user.position.filter((x) => x !== 'student' && x !== 'secretary').length > 0
  // },
  {
    icon: InfoFilled,
    name: 'about',
    path: '/about',
    show: true
  },
  {
    icon: MaterialSymbolsSettings,
    name: 'preferences',
    path: '/administration',
    show: user.position.includes('admin')
  }
]

function routeTo(page: string) {
  path.value = page
  router.push(page)
}
</script>

<template>
  <div class="px-2 bg-slate-50 dark:bg-gray-900 pl-3 menu">
    <div v-for="nav in navs" :key="nav.path">
      <div class="py-1" v-if="nav.show">
        <ElTooltip
          v-if="nav.show"
          :content="t(`nav.${nav.name}`)"
          placement="right"
          :effect="dark ? 'dark' : 'light'"
        >
          <ElButton
            :icon="nav.icon"
            size="large"
            text
            :bg="nav.path === path"
            :type="nav.path === path ? 'primary' : ''"
            circle
            @click="routeTo(nav.path)"
          >
          </ElButton>
        </ElTooltip>
      </div>
    </div>
    <ElDivider />

    <div v-for="nav in actions" :key="nav.path">
      <div class="py-1" v-if="nav.show">
        <ElTooltip
          v-if="nav.show"
          :content="nav.name"
          placement="right"
          :effect="dark ? 'dark' : 'light'"
        >
          <ElButton
            :icon="nav.icon"
            size="large"
            text
            v-if="nav.path === path"
            :type="nav.path === path ? 'primary' : ''"
            circle
            @click="nav.action"
          >
          </ElButton>
        </ElTooltip>
      </div>
    </div>
    <ElDivider v-if="!navs.map((x) => x.path).includes(path)" />
    <div class="bottom">
      <ZSelectLanguage placement="right" />
      <br />
      <ElButton :icon="dark ? Moon : Sunny" size="large" text circle @click="dark = !dark" />
    </div>
  </div>
</template>

<style scoped>
.menu {
  width: 4rem;
  min-height: v-bind(height * 0.92 + 'px');
}

.full {
  width: 100%;
}

.bottom {
  position: absolute;
  left: 0.72rem;
  bottom: 4rem;
}
</style>
