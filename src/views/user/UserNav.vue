<script setup lang="ts">
import { CirclePlusFilled, HomeFilled, InfoFilled, Management } from '@element-plus/icons-vue'
import { ElButton, ElDivider, ElIcon, ElMenu, ElMenuItem } from 'element-plus'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
// import { useRoute, useRouter } from 'vue-router'
import MdiEye from '@/icons/MdiEye.vue'
import MdiUmbrella from '@/icons/MdiUmbrella.vue'
import MaterialSymbolsSettings from '@/icons/MaterialSymbolsSettings.vue'
import { useWindowSize } from '@vueuse/core'
import type { Component as VueComponent } from 'vue'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()
// const route = useRoute()

const path = ref(new URL(window.location.href).pathname)

const { height } = useWindowSize()

const navs: Array<{
  icon: VueComponent
  name: string
  path: string
}> = [
  {
    icon: HomeFilled,
    name: '首页',
    path: '/user/'
  },
  {
    icon: MdiEye,
    name: '查看',
    path: '/activity/'
  },
  {
    icon: CirclePlusFilled,
    name: '创建',
    path: '/activity/create'
  },
  {
    icon: MdiUmbrella,
    name: '漂流伞',
    path: '/umbrella'
  },
  {
    icon: Management,
    name: '管理',
    path: '/activity/management'
  },
  {
    icon: InfoFilled,
    name: '关于',
    path: '/about'
  },
  {
    icon: MaterialSymbolsSettings,
    name: '后台',
    path: '/administration'
  }
]

function routeTo(page: string) {
  path.value = page
  router.push(page)
}
</script>

<template>
  <div class="px-2 bg-slate-50 pl-3 menu">
    <div v-for="nav in navs" :key="nav.path" class="py-1">
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
    </div>
    <ElDivider direction="horizontal" />
  </div>
</template>

<style scoped>
.menu {
  width: 4rem;
  min-height: v-bind(height + 'px');
}
</style>
