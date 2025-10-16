<script setup lang="ts">
import {
  CirclePlusFilled,
  HomeFilled,
  InfoFilled,
  Sunny,
  Moon,
  Management
} from '@element-plus/icons-vue'
import { ElButton, ElButtonGroup, ElDrawer, ElSwitch, ElForm, ElFormItem } from 'element-plus'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import MdiEye from '@/icons/MdiEye.vue'
import { ApplicationMenu } from '@icon-park/vue-next'
import { useWindowSize } from '@vueuse/core'
import type { Component as VueComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'
import { pad, getTabletType } from '@/plugins/ua'

const user = useUserStore()
const router = useRouter()
const route = useRoute()
const dark = useDark()
const { t } = useI18n({
  useScope: 'global'
})

const show = ref(false)

const path = ref(route.fullPath)

watch(route, () => {
  path.value = route.fullPath
})

const { height } = useWindowSize()

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
      routeTo(`/group/${user.class_id}`)
    }
  } else {
    path.value = page
    router.push(page)
  }
}

const useless = ref(dark.value)

watch(useless, () => {
  dark.value = useless.value
})
</script>

<template>
  <ElButton :icon="ApplicationMenu" text circle @click="show = !show" />
  <Teleport to="body">
    <div class="full">
      <ElDrawer v-model="show" direction="ltr" size="40%">
        <div class="menu full">
          <ElButtonGroup class="full">
            <ElButton
              v-for="nav in navs.filter((x) => x.show)"
              :key="nav.path"
              :icon="nav.icon"
              text
              class="full py-4"
              size="large"
              :bg="nav.judge(path ?? '')"
              :type="nav.judge(path ?? '') ? 'primary' : ''"
              @click="routeTo(nav.path)"
            >
              {{ t(`nav.${nav.name}`) }}
            </ElButton>
          </ElButtonGroup>
        </div>
        <div class="bottom">
          <ElForm label-position="right" label-width="120px">
            <ElFormItem :label="t('nav.dark')" v-if="!pad() || getTabletType() === 'p615' || getTabletType() === 'p620'">
              <ElSwitch
                v-model="useless"
                inline-prompt
                :active-icon="Moon"
                active-color="#2c2c2c"
                :inactive-icon="Sunny"
                inactive-color="#f2f2f2"
              />
            </ElFormItem>
          </ElForm>
        </div>
      </ElDrawer>
    </div>
  </Teleport>
</template>

<style scoped>
.menu {
  width: 4rem;
  overflow: hidden;
}

.full {
  width: 100%;
}

.bottom {
  position: absolute;
  left: 0.72rem;
  bottom: 1rem;
}
</style>
