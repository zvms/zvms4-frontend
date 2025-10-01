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
import { useWindowSize, useDark, useOnline, useTitle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { watch, ref, onMounted, h, reactive } from 'vue'
import { zhCn, en } from 'element-plus/es/locale/index.mjs'
import ZVerticalNav from '@/components/form/ZVerticalNav.vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { CarbonCloudOffline } from '@/icons'
import { modifyPasswordDialogs } from '@/views'
import { Instruction } from '@icon-park/vue-next'
import { pad } from '@/plugins/ua.ts'

const { needRefresh, offlineReady, updateServiceWorker } = useRegisterSW()

const online = useOnline()

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

const langPack = ref(getLocale(locale.value))



watch(locale, () => {
  langPack.value = getLocale(locale.value)
})

const router = useRouter()
const userStore = useUserStore()
const headerStore = useHeaderStore()

async function resetPassword() {
  if (userStore.shouldResetPassword) {
    const messages = {
      'zh-CN': '为防止您的账号被盗，您必须修改密码以保护您的账号。',
      'en-US':
        'To prevent your account from being stolen, it is recommended that you change your password to protect your account.'
    }
    const advice = {
      'zh-CN': '您必须重置密码',
      'en-US': 'It is recommended that you reset your password'
    }
    const threaten = {
      'zh-CN': '您必须重置密码后才能继续使用本系统。',
      'en-US': 'You must reset your password before you can continue to use this system.'
    }
    await ElMessageBox({
      message: h(
        'p',
        null,
        [
          h('span', null, messages[userStore.language as 'en-US'] as string),
          h('strong', null, threaten[userStore.language as 'en-US'] as string)
        ]
      ),
      showCancelButton: true,
      title: advice[userStore.language as 'en-US'] as string,
      confirmButtonText: locale.value == 'zh-CN' ? '重置密码' : 'Modify Password',
      cancelButtonText: locale.value == 'zh-CN' ? '取消' : 'Cancel'
    })
      .then(async () => {
        try {
          await modifyPasswordDialogs(userStore._id, userStore.language, userStore.resetPassword)
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
const security = ref((localStorage.getItem('security') || '0') - 0)

if (security.value < 1) {
  security.value = 1
  localStorage.setItem('security', '' + security.value)
  userStore.removeUser()
  router.replace('/user/login')
}

const watermark = reactive({
  color: 'rgba(0, 0, 0, .05)',
  text: 'ZVMS 4',
  fontSize: 14
})

const dark = useDark()
const title = useTitle()
const titleval = ref(title.value)

watch(
  () => document.title,
  (val) => {
    titleval.value = val
  },
  {
    immediate: true
  }
)

watch(
  dark,
  () => {
    watermark.color = dark.value ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .05)'
  },
  {
    immediate: true
  }
)

if (!userStore.isLogin && !useRoute().fullPath.endsWith('login') && !useRoute().fullPath.endsWith('about')) {
  router.replace('/user/login')
}

function embedClarity() {
  // Define a type for the clarity function to improve readability and type safety
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

  // Create the script element with more descriptive variable names and TypeScript type assertions where necessary
  const scriptElement: HTMLScriptElement = document.createElement('script') as HTMLScriptElement
  scriptElement.async = true
  scriptElement.src = `https://www.clarity.ms/tag/${scriptId}`

  // Insert the script before the first script tag in the document
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
      title: 'Disconnected',
      message: 'Loaded backup cache data but cannot operate.'
    }
  }
}

const panelButtons = [
  {
    icon: Password,
    async click() {
      await modifyPasswordDialogs(userStore._id, locale.value, userStore.resetPassword)
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

onMounted(() => {
  embedClarity()
  userStore.isLogin && resetPassword()
})
</script>

<template>
  <ElConfigProvider :locale="langPack" class="bg-slate-100 dark:bg-gray-900 full">
    <ElWatermark
      :font="watermark"
      :content="
        userStore.isLogin && userStore.position.length >= 2 && false
          ? [userStore.name + ' ' + userStore.id]
          : []
      "
      :z-index="999"
    >
      <ElAlert
        type="error"
        center
        :closable="true"
        v-if="offlineReady && !online"
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
                <span class="lh-100% ml-2">{{ titleval }}</span>
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
        <ElContainer v-if="userStore.isLogin" class="full">
          <UserNav style="height: 100%; width: 3.2rem" v-if="!verticalMode" />
          <RouterView
            class="bg-slate-50 dark:bg-gray-950 view fragment-container"
            style="width: 100%; height: 100%; box-sizing: border-box;"
          />
        </ElContainer>
        <ElContainer class="full" v-else>
          <RouterView style="width: 100%; height: 100%; overflow-y: scroll;" />
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
