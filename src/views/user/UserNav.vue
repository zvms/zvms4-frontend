<script setup lang="ts">
import {
  CirclePlusFilled,
  HomeFilled,
  InfoFilled,
  Management,
  Sunny,
  Moon
} from '@element-plus/icons-vue'
import { ElButton, ElDivider, ElIcon, ElMenu, ElMenuItem, ElTooltip } from 'element-plus'
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

const user = useUserStore()
const router = useRouter()
const dark = useDark()
// const route = useRoute()

const path = ref(new URL(window.location.href).pathname)

const { height } = useWindowSize()

const navs: Array<{
  icon: VueComponent
  name: string
  path: string
  show: boolean
}> = [
  {
    icon: HomeFilled,
    name: '首页',
    path: '/user/',
    show: true
  },
  {
    icon: MdiEye,
    name: '查看',
    path: '/activity/',
    show: true
  },
  {
    icon: CirclePlusFilled,
    name: '创建',
    path: '/activity/create',
    show: true
  },
  {
    icon: MdiUmbrella,
    name: '漂流伞',
    path: '/umbrella',
    show: false
  },
  {
    icon: Management,
    name: '管理',
    path: '/activity/management',
    show: user.position.filter((x) => x !== 'student' && x !== 'secretary').length > 0
  },
  {
    icon: InfoFilled,
    name: '关于',
    path: '/about',
    show: true
  },
  {
    icon: MaterialSymbolsSettings,
    name: '后台',
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
  <div class="px-2 bg-slate-50 dark:bg-slate-700 pl-3 menu">
    <div v-for="nav in navs" :key="nav.path">
      <div class="py-2" v-if="nav.show">
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
    <ElButton disabled :icon="dark ? Moon : Sunny" size="large" text circle @click="dark = !dark" />
  </div>
</template>

<style scoped>
.menu {
  width: 4rem;
  min-height: v-bind(height * 0.88 + 'px');
}
</style>
