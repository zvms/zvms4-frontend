<script setup lang="ts">
import { ArrowDown, User, SwitchButton, Notification } from '@element-plus/icons-vue'
import {
  ElContainer,
  ElHeader,
  ElFooter,
  ElIcon,
  ElRow,
  ElCol,
  ElButton,
  ElButtonGroup,
  ElPopover,
  ElConfigProvider,
  ElDivider,
  ElNotification
} from 'element-plus'
import { RouterView } from 'vue-router'
import { useUserStore } from './stores/user'
import { useRouter } from 'vue-router'
import Feedback from '@/icons/MaterialSymbolsFeedbackOutlineRounded.vue'
import Password from '@/icons/MaterialSymbolsPasswordRounded.vue'
import UserNav from './views/user/UserNav.vue'
import { useHeaderStore } from './stores/header'
import { useWindowSize } from '@vueuse/core'
// import { pad } from './plugins/ua'
import { useI18n } from 'vue-i18n'
import { watch, ref } from 'vue'
import { zhCn, en, ja, ko, zhTw, fr, ru } from 'element-plus/es/locale/index.mjs'
import ZVerticalNav from './components/form/ZVerticalNav.vue'

const { t, locale } = useI18n()

function getLocale(ident: string) {
  switch (ident) {
    case 'zh-CN':
      return zhCn
    case 'en-US':
      return en
    case 'ja-JP':
      return ja
    case 'ko-KR':
      return ko
    case 'zh-TW':
      return zhTw
    case 'fr-FR':
      return fr
    case 'ru-RU':
      return ru
    default:
      return en
  }
}

const langPack = ref(getLocale(locale.value))

watch(locale, () => {
  langPack.value = getLocale(locale.value)
})

const toast = /* pad() ? t('platform.xh') : t('platform.normal') */ ''

const router = useRouter()
const userStore = useUserStore()
const headerStore = useHeaderStore()

const { width, height } = useWindowSize()

const verticalMode = ref<boolean>(width.value < height.value * 1.2)

watch(
  () => width.value,
  (w) => {
    verticalMode.value = w < height.value * 1.2
  }
)

function logout() {
  userStore.removeUser()
  router.push('/user/login')
}

function feedback() {
  ElNotification({
    title: '反馈渠道关闭',
    message: `出于某些不可抗力因素，反馈渠道关闭，详情请咨询蛟二（3）班 楼瀚文同学。 Because of some irresistible factors, the feedback channel is closed. For details, please consult Lou Hanwen in Class 3, Senior 2 in Jiaochuan Academy.`,
    type: 'warning',
    position: 'bottom-right'
  })
}
</script>

<template>
  <ElConfigProvider :locale="langPack">
    <ElContainer @contextmenu.prevent class="bg-slate-100 dark:bg-gray-900">
      <ElHeader>
        <ElRow class="pt-4 px-4">
          <ElCol :span="16">
            <div class="text-2xl tit" @dblclick="router.push('/')">
              <ElIcon class="icon"><img src="/favicon.ico" /></ElIcon>
              {{ headerStore.header }}
              <span class="text-sm">{{ toast }}</span>
            </div>
          </ElCol>
          <ElCol :span="8">
            <div class="user">
              <ElButtonGroup>
                <ElButton text bg :icon="User" type="primary">{{
                  userStore.isLogin ? userStore.name : t('login.unlogined')
                }}</ElButton>
                <ElPopover width="216px">
                  <template #reference>
                    <ElButton
                      text
                      bg
                      :icon="ArrowDown"
                      :disabled="!userStore.isLogin"
                      type="primary"
                    />
                  </template>
                  <ElButton text :icon="Feedback" class="action-btn p-4" @click="feedback">{{
                    t('nav.feedback')
                  }}</ElButton
                  ><br />
                  <ElButton text :icon="Notification" class="action-btn p-4">{{
                    t('nav.broadcast')
                  }}</ElButton
                  ><br />
                  <ElButton text :icon="Password" class="action-btn p-4">{{
                    t('nav.reset')
                  }}</ElButton
                  ><br />
                  <ElButton text :icon="SwitchButton" class="action-btn p-4" @click="logout">{{
                    t('nav.logout')
                  }}</ElButton>
                </ElPopover>
              </ElButtonGroup>
              <ElDivider v-if="verticalMode" direction="vertical" />
              <ZVerticalNav v-if="verticalMode" />
            </div>
          </ElCol>
        </ElRow>
      </ElHeader>
      <ElContainer style="width: 100%; height: 100%">
        <UserNav style="height: 100%" v-if="!verticalMode && userStore.isLogin" />
        <RouterView
          v-if="userStore.isLogin"
          class="bg-slate-50 dark:bg-gray-950 view fragment-container"
        />
        <RouterView v-else class="bg-slate-100 dark:bg-gray-900 view" />
      </ElContainer>
      <ElFooter
        class="footer bg-gray-200 text-gray-500 dark:text-gray-300 dark:bg-gray-900 footer-container"
      >
        <p class="text-center">&copy; 2018-2023 | {{ t('about.footer') }} | MIT Licensed</p>
      </ElFooter>
    </ElContainer>
  </ElConfigProvider>
</template>

<style scoped>
.footer-container {
  height: v-bind(height * 0.05 + 'px');
  overflow-y: scroll;
  z-index: 999;
}

.footer {
  font-size: 0.8rem;
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 3rem; */
}

.fragment-container {
  /* height: v-bind(height - '3rem'); */
  /* all is height, and - 3rem is this height */
  height: v-bind(height * 0.88 + 'px');
  overflow-y: scroll;
  /* max-width: 100vw; */
  /* margin: 0 auto; */
}

.tit {
  width: 100%;
  border: 0 0 2px 0;
  padding-left: 2rem;
}

.action-btn {
  width: 100%;
}

.icon {
  position: relative;
  top: 40%;
  transform: translateY(16%);
}

.view {
  border-radius: 1rem;
  width: 100%;
}

.user {
  position: absolute;
  right: 0;
}
</style>

<style>
body {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
  transition:
    color 0.5s,
    background-color 0.5s !important;
  /* filter: grayscale(1); */
}
</style>
