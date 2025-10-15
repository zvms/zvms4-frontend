<script setup lang="ts">
import { ArrowDown, User, SwitchButton } from '@element-plus/icons-vue'
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
  ElMessageBox,
  ElWatermark
} from 'element-plus'
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import Password from '@/icons/MaterialSymbolsPasswordRounded.vue'
import UserNav from '@/views/user/UserNav.vue'
import { useHeaderStore } from './stores/header'
import { useWindowSize, useDark, useOnline } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { watch, ref, onMounted, h, reactive } from 'vue'
import { zhCn } from 'element-plus/es/locale/index.mjs'
import ZVerticalNav from '@/components/form/ZVerticalNav.vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { CarbonCloudOffline } from '@/icons'
import { modifyPasswordDialogs } from '@/views'

const { needRefresh, offlineReady, updateServiceWorker } = useRegisterSW()

const online = useOnline()
const cached = ref(localStorage.getItem('cached'))

window.onbeforeunload = (e) => {
  if (location.pathname.startsWith('/activity/create/') || location.pathname.endsWith('/modify')) {
    e.preventDefault()
    return false
  }
}

window.oncontextmenu = (e) => {
  e.preventDefault()
  return false
}

const { t, locale } = useI18n()

function getLocale(ident: string) {
  return zhCn
}

const langPack = ref(zhCn)

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const headerStore = useHeaderStore()

async function resetPassword() {
  if (userStore.shouldResetPassword) {
    const messages = {
      'zh-CN': '为防止您的账号被盗，您必须修改密码以保护您的账号。',
      'en-US': ''
    }
    const advice = {
      'zh-CN': '您必须修改密码',
      'en-US': ''
    }
    const threaten = {
      'zh-CN': '您必须修改密码后才能继续使用本系统。',
      'en-US': ''
    }
    await ElMessageBox({
      message: h(
        'p',
        null,
        [
          h('span', null, messages['zh-CN'] as string),
          h('strong', null, threaten['zh-CN'] as string)
        ]
      ),
      showCancelButton: true,
      title: advice['zh-CN'] as string,
      confirmButtonText: '修改密码',
      cancelButtonText: '退出登录',
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
    })
      .then(async () => {
        try {
          await modifyPasswordDialogs(String(userStore.id), 'zh-CN', userStore.resetPassword)
          .catch(async () => {
            userStore.shouldResetPassword = false
            await userStore.removeUser()
            router.replace('/user/login')
          })
        } catch {
          userStore.shouldResetPassword = false
          await userStore.removeUser()
          router.replace('/user/login')
        }
      })
      .catch(async () => {
        userStore.shouldResetPassword = false
        await userStore.removeUser()
        router.replace('/user/login')
      })
  }
}

watch(
  () => userStore.isLogin,
  (v) => {
    v && resetPassword()
  }
)

// force insecure sessions to log out
const security = ref(Number(localStorage.getItem('security') || '0') - 0)

if (security.value < 2) {
  security.value = 2
  localStorage.setItem('security', '' + security.value)
  userStore.removeUser()
  router.replace('/user/login')
}

const watermark = reactive({
  color: 'rgba(0, 0, 0, .05)',
  text: '',
  fontSize: 14
})

const dark = useDark()

watch(
  () => route.path,
  () => {
    if (!location.pathname.startsWith('/activities/')) {
      headerStore.resetHeader()
    }
    if (!userStore.isLogin && !route.fullPath.endsWith('login') && !route.fullPath.endsWith('about')) {
      router.replace('/user/login')
    }
  }
)

function embedClarity() {

  type ClarityFunction = {
    (config: { [key: string]: unknown }): void
    q?: IArguments[]
  }

  const scriptId = 'jwc2tctpr3'

  const setupClarity: ClarityFunction = (window.clarity =
    window.clarity ||
    function () {
      ;(window.clarity.q = window.clarity.q || []).push(arguments)
    })

  setupClarity({})

  const scriptElement: HTMLScriptElement = document.createElement('script') as HTMLScriptElement
  scriptElement.async = true
  scriptElement.src = `https://www.clarity.ms/tag/${scriptId}`

  const firstScriptTag: HTMLScriptElement = document.getElementsByTagName(
    'script'
  )[0] as HTMLScriptElement
  firstScriptTag.parentNode!.insertBefore(scriptElement, firstScriptTag)
}

locale.value = 'zh-CN'

const { width, height } = useWindowSize()

const verticalMode = ref<boolean>(width.value < height.value * 1.2)

watch(
  () => width.value,
  (w) => {
    verticalMode.value = w < height.value * 1.2
  }
)

const locales: Record<
  (typeof locale)['value'],
  {
    disconnected: {
      title: string
      message: string
    }
  }
> = {
  'zh-CN': {
    disconnected: {
      title: '连接已断开',
      message: '已加载备用缓存数据但无法进行操作。'
    }
  },
  'en-US': {
    disconnected: {
      title: '',
      message: ''
    }
  }
}

const panelButtons = [
  {
    icon: Password,
    async click() {
      await modifyPasswordDialogs(String(userStore.id), locale.value, userStore.resetPassword)
    },
    text: 'reset'
  },
  {
    icon: SwitchButton,
    async click() {
      await userStore.removeUser()
      router.replace('/user/login')
    },
    text: 'logout'
  }
]

watch(needRefresh, () => {
  if (!needRefresh.value) {
    return
  }
  updateServiceWorker()
})

watch(offlineReady, () => {
  if (!offlineReady.value) {
    return
  }
  localStorage.setItem('cached','true')
})

onMounted(() => {
  embedClarity()
  userStore.isLogin && resetPassword()
})
</script>

<template>
  <ElConfigProvider :locale="langPack" class="bg-slate-100 dark:bg-gray-900 full">
    <ElWatermark
      :font="watermark"
      content=""
      :z-index="999"
    >
      <ElAlert
        type="error"
        center
        :closable="true"
        v-if="(cached || offlineReady) && !online"
        class="hidden-print"
      >
        <template #title>
          <ElIcon class="disconnected">
            <CarbonCloudOffline />
          </ElIcon>
          <span class="text-lg px-1">{{ locales[locale].disconnected.title }}</span>
          <span class="text-sm px-1">{{ locales[locale].disconnected.message }}</span>
        </template>
      </ElAlert>
      <ElContainer
        @contextmenu.prevent
        class="bg-slate-100 dark:bg-gray-900"
        direction="vertical"
        :style="{ width: width + 'px', height: height + 'px' }"
      >
        <ElHeader>
          <ElRow :class="['pt-4', verticalMode && userStore.isLogin ? 'px-1' : 'px-4']">
            <ElCol :span="16">
              <div
                :class="[
                  'text-2xl',
                  'w-full',
                  verticalMode && userStore.isLogin ? 'pl-1' : 'pl-10',
                  'pt-1.5',
                  'flex',
                  'items-center'
                ]"
                @dblclick="router.push(userStore.isLogin ? '/user' : '/user/login')"
              >
                <ZVerticalNav v-if="verticalMode && userStore.isLogin" class="pl-6" />
                <ElDivider v-if="verticalMode && userStore.isLogin" direction="vertical" />
                <ElIcon style="border-radius: .25rem;"><img src="/favicon.ico" class="scale-50" style="border-radius: 20%;" alt="favicon" /></ElIcon>
                <span class="lh-100% ml-2">{{ headerStore.header }}</span>
              </div>
            </ElCol>
            <ElCol :span="8">
              <div class="user" v-if="userStore.isLogin">
                <ElButtonGroup>
                  <ElButton text bg :icon="User" type="primary">
                    {{ userStore.name }}
                  </ElButton>
                  <ElPopover width="216px">
                    <template #reference>
                      <ElButton
                        text
                        bg
                        :icon="ArrowDown"
                        type="primary"
                      />
                    </template>
                    <ElButtonGroup class="w-full" v-for="button in panelButtons" :key="button.text">
                      <ElButton
                        text
                        :icon="button.icon"
                        class="action-btn p-1 w-full"
                        @click="button.click"
                      >
                        {{ t(`nav.${button.text}`) }}
                      </ElButton>
                    </ElButtonGroup>
                  </ElPopover>
                </ElButtonGroup>
              </div>
            </ElCol>
          </ElRow>
        </ElHeader>
        <ElContainer class="full">
          <UserNav style="height: 100%; width: 3.2rem" v-if="userStore.isLogin && !verticalMode" />
          <RouterView
            class="bg-slate-50 dark:bg-gray-950 view fragment-container"
            style="width: 100%; height: 100%; box-sizing: border-box;"
          />
        </ElContainer>
      </ElContainer>
    </ElWatermark>
  </ElConfigProvider>
</template>

<style scoped>
.full {
  width: 100%;
  height: 100%;
}

.footer-container {
  height: 3rem;
}

.disconnected {
  position: relative;
  top: 40%;
  transform: translateY(16%);
  font-size: 1.2rem;
}

.footer {
  font-size: 0.8rem;
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fragment-container {
  height: 100%;
  overflow-y: scroll;
  max-height: calc(100vh - 3.75rem);
}

.action-btn {
  width: 100%;
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
@media print {
  .hidden-print {
    display: none !important;
  }
  .__vue-devtools-container__ {
    display: none !important;
  }
}

body {
  transition-property: color, background-color !important;
  transition-duration: 1s !important;
}

.el-pagination {
  overflow-x: scroll;
  height: 34px;
}

.el-pagination .el-pagination__sizes {
  -moz-flex-grow: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
}

.el-pagination .el-pagination__sizes .el-select {
  width: 100% !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}

div[data-netlify-site-id] {
  display: none !important;
}

*,
*:active,
*:focus {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
  -webkit-focus-ring-color: rgba(0, 0, 0, 0) !important;
  outline: none !important;
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}

.z-wrap .el-form-item--default .el-form-item__content {
  display: block;
  overflow-wrap: break-word;
}

@media print {
  body {
    font-size: 12px;
  }
}
</style>
