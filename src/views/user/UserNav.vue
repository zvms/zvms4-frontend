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
import { ElButton, ElDivider, ElPopover, ElTooltip, ElButtonGroup } from 'element-plus'
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
import MdiTranslate from '@/icons/MdiTranslate.vue'
import { Chinese, English } from '@icon-park/vue-next'

const user = useUserStore()
const router = useRouter()
const dark = useDark()

const languages = ref<
  Array<{
    icon: VueComponent
    display: string
    value: string
  }>
>([
  {
    icon: Chinese,
    display: '简体中文',
    value: 'zh-CN'
  },
  {
    icon: English,
    display: 'English',
    value: 'en-US'
  }
])

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
    name: '问题反馈',
    path: '/feedback/',
    show: true,
    action: () => {
      router.push('/feedback/')
      routeTo('/feedback/')
    }
  },
  {
    icon: Notification,
    name: '通知中心',
    path: '/notification/',
    show: true,
    action: () => {
      router.push('/notification/')
      routeTo('/notification/')
    }
  },
  {
    icon: Password,
    name: '密码修改',
    path: '/password',
    show: true,
    action: () => {
      router.push('/password')
      routeTo('/password')
    }
  },
  {
    icon: SwitchButton,
    name: '退出登录',
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
  // {
  //   icon: Management,
  //   name: '管理',
  //   path: '/activity/management',
  //   show: user.position.filter((x) => x !== 'student' && x !== 'secretary').length > 0
  // },
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
  <div class="px-2 bg-slate-50 dark:bg-slate-800 pl-3 menu">
    <div v-for="nav in navs" :key="nav.path">
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
      <ElPopover placement="right" width="192px">
        <template #reference>
          <ElButton :icon="MdiTranslate" size="large" text circle />
        </template>
        <ElButtonGroup class="full">
          <div v-for="language in languages" :key="language.value">
            <ElButton
              :icon="language.icon"
              class="full"
              text
              :bg="user.language === language.value"
              @click="user.setLanguage(language.value)"
              :type="user.language === language.value ? 'primary' : ''"
            >
              {{ language.display }}
            </ElButton>
            <br />
          </div>
        </ElButtonGroup>
      </ElPopover>
      <br />
      <ElButton
        :icon="dark ? Moon : Sunny"
        size="large"
        text
        circle
        @click="dark = !dark"
      />
    </div>
  </div>
</template>

<style scoped>
.menu {
  width: 4rem;
  min-height: v-bind(height * 0.88 + 'px');
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
