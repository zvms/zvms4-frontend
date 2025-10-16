<script setup lang="ts">
import {
  CirclePlusFilled,
  HomeFilled,
  InfoFilled,
  Sunny,
  Moon,
  Management
} from '@element-plus/icons-vue'
import { ElButton, ElTooltip, ElSpace } from 'element-plus'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import MdiEye from '@/icons/MdiEye.vue'
import type { Component as VueComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { ZSelectLanguage } from '@/components'
import { watch } from 'vue'
import { pad, getTabletType } from '@/plugins/ua'

const user = useUserStore()
const router = useRouter()
const route = useRoute()
const dark = useDark()
const { t } = useI18n({
  useScope: 'global'
})

if (getTabletType() !== 'p615') {
  dark.value = false
}

const path = ref(route.fullPath)

watch(route, () => {
  path.value = route.fullPath
})

const navs: Array<{
  icon: VueComponent
  name: string
  path: string
  show: boolean
  judge: (path: string) => boolean
}> = [
  {
    icon: HomeFilled,
    name: 'home',
    path: '/user',
    show: true,
    judge: (path) => path === '/user'
  },
  {
    icon: MdiEye,
    name: 'activity',
    path: '/activities/mine',
    show: true,
    judge: (path) =>
      (path.startsWith('/activity') && !path.startsWith('/activity/create')) ||
      path.startsWith('/activities')
  },
  {
    icon: CirclePlusFilled,
    name: 'create',
    path: '/activity/create',
    show: user.position.includes('admin') || user.position.includes('department'),
    judge: (path) => path.startsWith('/activity/create')
  },
  {
    icon: Management,
    name: 'manage',
    path: '/management',
    show: user.position.filter((x) => x !== 'student').length > 0,
    judge: (path) =>
      path.startsWith('/group') || path.startsWith('/user/') && path !== '/user/login' || path.startsWith('/manage')
  },
  {
    icon: InfoFilled,
    name: 'about',
    path: '/about',
    show: true,
    judge: (path) => path.startsWith('/about')
  }
]

function routeTo(page: string) {
  if (page === '/management') {
    if (user.position.includes('admin') || user.position.includes('department')) {
      routeTo('/manage/groups')
    } else {
      routeTo(`/group/${user.class_id}/users`)
    }
  } else {
    path.value = page
    router.push(page)
  }
}
</script>

<template>
  <div class="px-2 bg-slate-100 dark:bg-gray-900 pl-3 menu">
    <div v-for="nav in navs" :key="nav.path">
      <div class="py-1" v-if="nav.show">
        <ElTooltip
          v-if="nav.show"
          :content="t(`nav.${nav.name}`)"
          placement="right"
          effect="light"
          :show-after="200"
        >
          <ElButton
            :icon="nav.icon"
            size="large"
            text
            :bg="nav.judge(path ?? '')"
            :type="nav.judge(path ?? '') ? 'primary' : ''"
            circle
            @click="routeTo(nav.path)"
          >
          </ElButton>
        </ElTooltip>
      </div>
    </div>
    <ElSpace class="bottom" direction="vertical">
      <ElButton
        v-if="!pad() || getTabletType() === 'p615' || getTabletType() === 'p620'"
        :icon="dark ? Moon : Sunny"
        size="large"
        text
        circle
        @click="dark = !dark"
      />
    </ElSpace>
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
  bottom: 1rem;
}

@media print {
  .menu {
    display: none;
  }
}
</style>
