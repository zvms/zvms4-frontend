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
  ElNotification,
  ElMessageBox
} from 'element-plus'
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import Password from '@/icons/MaterialSymbolsPasswordRounded.vue'
import UserNav from '@/views/user/UserNav.vue'
import { useHeaderStore } from './stores/header'
import { useWindowSize, useDark } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { watch, ref, onMounted, h } from 'vue'
import { zhCn, en } from 'element-plus/es/locale/index.mjs'
import ZVerticalNav from '@/components/form/ZVerticalNav.vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { CarbonCloudOffline } from '@/icons'
import { modifyPasswordDialogs } from '@/views'

const { needRefresh, offlineReady, updateServiceWorker } = useRegisterSW()

const { t, locale } = useI18n()

function getLocale(ident: string) {
  switch (ident) {
    case 'zh-CN':
      return zhCn
    default:
      return en
  }
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
      'zh-CN': '为防止您的账号被盗，建议您修改密码以保护您的账号。',
      'en-US': 'To prevent your account from being stolen, it is recommended that you change your password to protect your account.'
    }
    const advice = {
      'zh-CN': '建议您重置密码',
      'en-US': 'It is recommended that you reset your password',
    }
    const threaten = {
      'zh-CN': '您必须重置密码后才能继续使用本系统。',
      'en-US': 'You must reset your password before you can continue to use this system.',
    }
    await ElMessageBox({
      message: h(
        'p',
        null,
        userStore.position.length !== 1
          ? [
              h('span', null, messages[userStore.language as 'en-US'] as string),
              h('strong', null, threaten[userStore.language as 'en-US'] as string)
            ]
          : [h('span', null, messages[userStore.language as 'en-US'] as string)]
      ),
      showCancelButton: true,
      title: advice[userStore.language as 'en-US'] as string,
      confirmButtonText: locale.value == 'zh-CN' ? '重置密码' : 'Modify Password',
      cancelButtonText: locale.value == 'zh-CN' ? '取消' : 'Cancel'
    })
      .then(async () => {
        try {
          await modifyPasswordDialogs(userStore._id, userStore.language, userStore.resetPassword)
        } catch {
          userStore.shouldResetPassword = false
          if (userStore.position.length !== 1) {
            await userStore.removeUser()
            router.push('/user/login')
          }
        }
      })
      .catch(async () => {
        userStore.shouldResetPassword = false
        if (userStore.position.length !== 1) {
          await userStore.removeUser()
          router.push('/user/login')
        }
      })
  }
}

resetPassword()

useDark() //Only this can fix login page background flashing in dark mode

if(!userStore.isLogin && !useRoute().fullPath.endsWith('login')) {
  router.push('/user/login')
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

locale.value = userStore.language ?? navigator.language

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
    click() {
      userStore.removeUser()
      router.push('/user/login')
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
})
</script>

<template>
  <ElConfigProvider :locale="langPack" class="bg-slate-100 dark:bg-gray-900 full">
    <ElAlert type="error" center :closable="true" v-if="offlineReady">
      <template #title>
        <ElIcon class="disconnected">
          <CarbonCloudOffline />
        </ElIcon>
        <span class="text-lg px-1">{{ locales[locale].disconnected.title }}</span>
        <span class="text-sm px-1">{{ locales[locale].disconnected.message }}</span>
      </template>
    </ElAlert>
    <ElContainer @contextmenu.prevent class="bg-slate-100 dark:bg-gray-900" direction="vertical" :style="{width: width + 'px', height: 'calc(' + height + 'px - 3rem)'}">
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
              @dblclick="router.push('/')"
            >
              <ZVerticalNav v-if="verticalMode && userStore.isLogin" class="pl-6" />
              <ElDivider v-if="verticalMode && userStore.isLogin" direction="vertical" />
              <ElIcon><img src="/favicon.ico" class="scale-50" alt="favicon" /></ElIcon>
              <span class="lh-100% ml-2">{{ headerStore.header }}</span>
            </div>
          </ElCol>
          <ElCol :span="8">
            <div class="user" v-if="userStore.isLogin">
              <ElButtonGroup>
                <ElButton text bg :icon="User" type="primary">
                  {{ userStore.isLogin ? userStore.name : t('login.unlogined') }}
                </ElButton>
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
          :style="{width: width + 'px', height: 'calc(' + height + 'px - 6.75rem)', boxSizing: 'border-box'}"
        />
      </ElContainer>
      <ElContainer class="full" v-else>
        <RouterView style="width: 100%; height: 100%; overflow-y: scroll" />
      </ElContainer>
      <ElFooter
        class="footer bg-slate-100 text-gray-500 dark:text-gray-300 dark:bg-gray-900 footer-container"
      >
        <p class="text-center">
          &copy; 2018-2025 | {{ t('about.footer') }} | {{ t('about.license') }}
        </p>
      </ElFooter>
    </ElContainer>
  </ElConfigProvider>
</template>

<style scoped>
.full {
  width: 100%;
  height: 100%;
}

.footer-container {
  height: 3rem;
  z-index: 2004;
}

.disconnected {
  position: relative;
  top: 40%;
  transform: translateY(16%);
  font-size: 1.2rem;
}

.footer {
  font-size: 0.8rem;
  position: /*absolute*/fixed;
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
body {
  transition-property: color,background-color !important;
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

input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}

div[data-netlify-site-id] {
  display: none !important;
}

*, *:active, *:focus {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
  -webkit-focus-ring-color: rgba(0, 0, 0, 0)!important;
  outline: none !important;
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}

@media print {
  body {
    font-size: 12px;
  }
}
</style>
