<script setup lang="ts">
import {
  CirclePlusFilled,
  HomeFilled,
  InfoFilled,
  Sunny,
  Moon,
  Close
} from '@element-plus/icons-vue'
import { ElButton, ElButtonGroup, ElDrawer, ElSwitch, ElForm, ElFormItem } from 'element-plus'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
// import { useRoute, useRouter } from 'vue-router'
import MdiEye from '@/icons/MdiEye.vue'
import { ApplicationMenu } from '@icon-park/vue-next'
import MaterialSymbolsSettings from '@/icons/MaterialSymbolsSettings.vue'
import { useWindowSize } from '@vueuse/core'
import type { Component as VueComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import ZSelectLanguage from '@/components/form/ZSelectLanguage.vue'
import { watch } from 'vue'

const user = useUserStore()
const router = useRouter()
const dark = useDark()
const { t } = useI18n({
  useScope: 'global'
})

const show = ref(false)

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
    icon: InfoFilled,
    name: 'about',
    path: '/about',
    show: true
  },
  {
    icon: MaterialSymbolsSettings,
    name: 'preferences',
    path: '/preferences',
    show: user.position.includes('admin')
  }
]

function routeTo(page: string) {
  path.value = page
  router.push(page)
}

const useless = ref(dark.value)

watch(useless, () => {
  setTimeout(() => {
    dark.value = useless.value
  }, 60)
})
</script>

<template>
  <ElButton :icon="ApplicationMenu" size="large" text circle @click="show = !show" />
  <div class="full">
    <ElDrawer v-model="show" direction="rtl" size="45%" :with-header="false" :modal="false">
      <div class="menu full">
        <div class="py-2" style="text-align: right">
          <ElButton :icon="Close" text circle @click="show = !show" />
        </div>
        <ElButtonGroup class="full">
          <ElButton
            v-for="nav in navs"
            :key="nav.path"
            :icon="nav.icon"
            text
            class="full py-4"
            size="large"
            :bg="nav.path === path"
            :type="nav.path === path ? 'primary' : ''"
            @click="routeTo(nav.path)"
          >
            {{ t(`nav.${nav.name}`) }}
          </ElButton>
        </ElButtonGroup>
        <p class="px-2 py-2 pt-8 font-serif">
          开发、测试时大多使用横屏，横屏效果更佳，竖屏效果也还行。菜单为了区分 ZVMS
          3，从左边移到了右边。由于使用的组件库和学海浏览器自身问题，ZVMS 3 显眼的主题功能暂不会完整呈现。
        </p>
        <p class="px-2 py-2 font-serif">
          Development and testing mostly use landscape, landscape effect is better, portrait effect
          is also OK. The menu has been moved from the left to the right to distinguish ZVMS 3. Due
          to the component library and the browser itself, the prominent theme function of ZVMS 3
          will not be fully presented for the time being.
        </p>
        <p class="px-2 py-2 text-right font-mono">By Wu Chengyu</p>
      </div>
      <div class="bottom px-6">
        <ElForm>
          <ElFormItem :label="t('nav.dark')">
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
