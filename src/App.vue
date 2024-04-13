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
  ElTag,
  ElMessageBox,
  ElAlert
} from 'element-plus'
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import Feedback from '@/icons/MaterialSymbolsFeedbackOutlineRounded.vue'
import Password from '@/icons/MaterialSymbolsPasswordRounded.vue'
import UserNav from '@/views/user/UserNav.vue'
import { useHeaderStore } from './stores/header'
import { useWindowSize } from '@vueuse/core'
// import { pad } from './plugins/ua'
import { useI18n } from 'vue-i18n'
import { watch, ref, onMounted } from 'vue'
import { zhCn, en, ja, zhTw, fr } from 'element-plus/es/locale/index.mjs'
import ZVerticalNav from '@/components/form/ZVerticalNav.vue'
import { temporaryToken } from '@/plugins/short-token'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { CarbonCloudOffline } from '@/icons'

const { needRefresh, offlineReady, updateServiceWorker } = useRegisterSW()

const { t, locale } = useI18n()

function getLocale(ident: string) {
  switch (ident) {
    case 'zh-CN':
      return zhCn
    case 'en-US':
      return en
    case 'ja-JP':
      return ja
    case 'zh-TW':
      return zhTw
    case 'fr-FR':
      return fr
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

function embedClarity() {
  if (userStore.position.includes('admin')) return
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

  setupClarity()

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
    feedback: {
      close: {
        title: string
        message: string
      }
    }
    password: {
      title: string
      message: string
      confirmButtonText: string
      cancelButtonText: string
      inputErrorMessage: string
    }
    password_confirm: {
      title: string
      message: string
      inputErrorMessage: string
    }
    disconnected: {
      title: string
      message: string
    }
    refresh: {
      title: string
      message: string
      ok: string
      cancel: string
    }
  }
> = {
  'zh-CN': {
    feedback: {
      close: {
        title: '反馈渠道关闭',
        message: `出于某些不可抗力因素，反馈渠道关闭，详情请咨询蛟二（3）班 楼瀚文同学。 Because of some irresistible factors, the feedback channel is closed. For details, please consult Lou Hanwen in Class 3, Senior 2 in Jiaochuan Academy。`
      }
    },
    password: {
      title: '重置密码',
      message: '请输入新密码',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputErrorMessage: '密码至少8位，且至少包含一个大写字母，一个小写字母，一个数字和一个特殊字符'
    },
    password_confirm: {
      title: '重置密码',
      message: '请再次输入新密码',
      inputErrorMessage: '密码不匹配'
    },
    disconnected: {
      title: '连接已断开',
      message: '已加载备用缓存数据但无法进行操作。'
    },
    refresh: {
      title: '发现新版本',
      message: '发现新版本，是否立即刷新？',
      ok: '刷新',
      cancel: '取消'
    }
  },
  'en-US': {
    feedback: {
      close: {
        title: 'Feedback Channel Closed',
        message: `Because of some irresistible factors, the feedback channel is closed. For details, please consult Lou Hanwen in Class 3, Senior 2 in Jiaochuan Academy。`
      }
    },
    password: {
      title: 'Reset Password',
      message: 'Please input the new password',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      inputErrorMessage:
        'Password must be at least 8 characters long, and must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    },
    password_confirm: {
      title: 'Reset Password',
      message: 'Please input the new password again',
      inputErrorMessage: 'Password not match'
    },
    disconnected: {
      title: 'Disconnected',
      message: 'Loaded backup cache data but cannot operate.'
    },
    refresh: {
      title: 'New version found',
      message: 'New version found, refresh now?',
      ok: 'Refresh',
      cancel: 'Cancel'
    }
  },
  'zh-TW': {
    feedback: {
      close: {
        title: '反饋渠道關閉',
        message: `出於某些不可抗力因素，反饋渠道關閉，詳情請諮詢蛟二（3）班 樓瀚文同學。 Because of some irresistible factors, the feedback channel is closed. For details, please consult Lou Hanwen in Class 3, Senior 2 in Jiaochuan Academy。`
      }
    },
    password: {
      title: '重置密碼',
      message: '請輸入新密碼',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      inputErrorMessage: '密碼至少8位，且至少包含一個大寫字母，一個小寫字母，一個數字和一個特殊字符'
    },
    password_confirm: {
      title: '重置密碼',
      message: '請再次輸入新密碼',
      inputErrorMessage: '密碼不匹配'
    },
    disconnected: {
      title: '連接已斷開',
      message: '已加載備用緩存數據但無法進行操作。'
    },
    refresh: {
      title: '發現新版本',
      message: '發現新版本，是否立即刷新？',
      ok: '刷新',
      cancel: '取消'
    }
  },
  'ja-JP': {
    feedback: {
      close: {
        title: 'フィードバックチャネルが閉じられました',
        message: `あるいは、フィードバックチャネルは閉じられています。詳細については、蛟二（3）クラスの楼瀚文にお問い合わせください。 Because of some irresistible factors, the feedback channel is closed. For details, please consult Lou Hanwen in Class 3, Senior 2 in Jiaochuan Academy。`
      }
    },
    password: {
      title: 'パスワードをリセット',
      message: '新しいパスワードを入力してください',
      confirmButtonText: 'OK',
      cancelButtonText: 'キャンセル',
      inputErrorMessage:
        'パスワードは少なくとも8文字で、大文字、小文字、数字、特殊文字がそれぞれ1つ以上含まれている必要があります'
    },
    password_confirm: {
      title: 'パスワードをリセット',
      message: '新しいパスワードをもう一度入力してください',
      inputErrorMessage: 'パスワードが一致しません'
    },
    disconnected: {
      title: '切断されました',
      message: 'バックアップキャッシュデータを読み込みましたが、操作できません。'
    },
    refresh: {
      title: '新しいバージョンが見つかりました',
      message: '新しいバージョンが見つかりました。今すぐ更新しますか？',
      ok: '更新',
      cancel: 'キャンセル'
    }
  },
  'fr-FR': {
    feedback: {
      close: {
        title: 'Le canal de rétroaction est fermé',
        message: `En raison de certains facteurs irrésistibles, le canal de rétroaction est fermé. Pour plus de détails, veuillez consulter Lou Hanwen en classe 3, 2e année à l'Académie Jiaochuan。`
      }
    },
    password: {
      title: 'Réinitialiser le mot de passe',
      message: 'Veuillez entrer le nouveau mot de passe',
      confirmButtonText: "D'accord",
      cancelButtonText: 'Annuler',
      inputErrorMessage:
        'Le mot de passe doit comporter au moins 8 caractères et contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial'
    },
    password_confirm: {
      title: 'Réinitialiser le mot de passe',
      message: 'Veuillez entrer le nouveau mot de passe à nouveau',
      inputErrorMessage: 'Le mot de passe ne correspond pas'
    },
    disconnected: {
      title: 'Déconnecté',
      message:
        'Les données de cache de secours ont été chargées mais ne peuvent pas être exploitées.'
    },
    refresh: {
      title: 'Nouvelle version trouvée',
      message: 'Nouvelle version trouvée, rafraîchir maintenant?',
      ok: 'Rafraîchir',
      cancel: 'Annuler'
    }
  }
}

const panelButtons = [
  {
    icon: Feedback,
    click() {
      ElNotification({
        title: locales[locale.value].feedback.close.title,
        message: locales[locale.value].feedback.close.message,
        type: 'warning',
        position: 'bottom-right'
      })
    },
    text: 'feedback'
  },
  {
    icon: Notification,
    click() {
      router.push('/notifications/')
    },
    text: 'notification'
  },
  {
    icon: Password,
    async click() {
      const token = await temporaryToken(userStore._id, false, locale.value as 'en-US')
      if (!token) {
        return
      }
      const input = await ElMessageBox.prompt(
        locales[locale.value].password.message,
        locales[locale.value].password.title,
        {
          confirmButtonText: locales[locale.value].password.confirmButtonText,
          cancelButtonText: locales[locale.value].password.cancelButtonText,
          inputType: 'password'
        }
      )
      const confirm = await ElMessageBox.prompt(
        locales[locale.value].password_confirm.message,
        locales[locale.value].password_confirm.title,
        {
          confirmButtonText: locales[locale.value].password.confirmButtonText,
          cancelButtonText: locales[locale.value].password.cancelButtonText,
          inputValidator: (ipt: string) => input.value === ipt,
          inputType: 'password',
          inputErrorMessage: locales[locale.value].password_confirm.inputErrorMessage
        }
      )
      if (input.value === confirm.value) {
        userStore.resetPassword(token, input.value)
      }
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
  ElMessageBox.confirm(locales[locale.value].refresh.message, locales[locale.value].refresh.title, {
    confirmButtonText: locales[locale.value].refresh.ok,
    cancelButtonText: locales[locale.value].refresh.cancel,
    type: 'warning'
  }).then(() => {
    updateServiceWorker()
  })
})

onMounted(() => {
  embedClarity()
})
</script>

<template>
  <ElConfigProvider :locale="langPack" class="bg-slate-100 dark:bg-gray-900 h-full">
    <ElAlert type="error" center :closable="false" v-if="offlineReady">
      <template #title>
        <ElIcon class="disconnected">
          <CarbonCloudOffline />
        </ElIcon>
        <span class="text-lg px-1">{{ locales[locale].disconnected.title }}</span>
        <span class="text-sm px-1">{{ locales[locale].disconnected.message }}</span>
      </template>
    </ElAlert>
    <ElContainer @contextmenu.prevent class="bg-slate-100 dark:bg-gray-900 h-full">
      <ElHeader>
        <ElRow class="pt-4 px-4">
          <ElCol :span="16">
            <div
              class="text-2xl w-full pl-10 pt-1.5 flex items-center"
              @dblclick="router.push('/')"
            >
              <ElIcon><img src="/favicon.ico" class="scale-50" /></ElIcon>
              <span class="lh-100% ml-2">{{ headerStore.header }}</span>
              <ElTag type="danger" size="small" round effect="plain">alpha</ElTag>
              <span class="text-sm">{{ toast }}</span>
            </div>
          </ElCol>
          <ElCol :span="8">
            <div class="user">
              <ElButtonGroup>
                <ElButton text bg :icon="User" type="primary" v-if="userStore.isLogin">
                  {{ userStore.isLogin ? userStore.name : t('login.unlogined') }}
                </ElButton>
                <ElPopover width="216px" v-if="userStore.isLogin">
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
              <ElDivider v-if="verticalMode && userStore.isLogin" direction="vertical" />
              <ZVerticalNav v-if="verticalMode && userStore.isLogin" />
            </div>
          </ElCol>
        </ElRow>
      </ElHeader>
      <ElContainer v-if="userStore.isLogin" style="width: 100%; height: 100%">
        <UserNav style="height: 100%; width: 3.2rem" v-if="!verticalMode && userStore.isLogin" />
        <RouterView
          v-if="userStore.isLogin"
          class="bg-slate-50 dark:bg-gray-950 view fragment-container"
        />
      </ElContainer>
      <ElContainer style="height: 100%" v-else>
        <RouterView />
      </ElContainer>
      <ElFooter
        class="footer bg-gray-200 text-gray-500 dark:text-gray-300 dark:bg-gray-900 footer-container"
      >
        <p class="text-center">&copy; 2018-2024 | {{ t('about.footer') }} | MIT Licensed</p>
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

.disconnected {
  position: relative;
  top: 40%;
  transform: translateY(16%);
  font-size: 1.2rem;
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
/*
@media print {
  .user {
    display: none;
  }
} */
</style>

<style>
body {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
  transition:
    color 0.5s,
    background-color 0.5s !important;
  /* filter: grayscale(1); */
}

@media print {
  body {
    font-size: 12px;
  }
}
</style>
