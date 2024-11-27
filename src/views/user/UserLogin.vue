<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  ElInput,
  ElForm,
  ElFormItem,
  ElButton,
  ElRow,
  ElCol,
  ElCard,
  ElTooltip,
  ElDialog,
  ElMessageBox,
  ElAlert
} from 'element-plus'
import { Refresh, ArrowRight, Plus, InfoFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useWindowSize, useDark } from '@vueuse/core'
import { ZSelectLanguage } from '@/components'
import { useI18n } from 'vue-i18n'
import { AboutView } from '..'
import api from '@/api'

if (useUserStore().isLogin) {
  useRouter().push('/user/')
}

const dark = useDark()
const { height } = useWindowSize()
const { t } = useI18n()

dark.value = false // We haven't already adjusted the color in dark mode.

const user = ref('')
const password = ref<string>('')
const loginfield = ref()
const userStore = useUserStore()
const router = useRouter()

const warnings = {
  'zh-CN': {
    title: '对盗用密码行为的警告',
    message: '近期平台发生一起严重密码盗用行为，相关人员已交给学校处理。请勿尝试盗用他人密码，否则将受到严重处罚。您在平台上的所有操作都已经过 Microsoft Clarity 记录并可随时复现，如有违规行为，将被追究责任。请保管好自己的账号和密码。现已强制要求团支书、实践部和管理员设置强密码，否则无法进行任何操作。',
  },
  'en-US': {
    title: 'Warning on Password Theft',
    message: 'Recently, a serious password theft incident occurred on the platform, and the relevant personnel have been handed over to the school for processing. Do not attempt to steal other people\'s passwords, otherwise you will be severely punished. All your operations on the platform have been recorded by Microsoft Clarity and can be reproduced at any time. If there is any violation, you will be held accountable. Please keep your account and password safe. It is now mandatory for the group leader, the practice department, and the administrator to set a strong password, otherwise no operation can be performed.',
  },
  'zh-TW': {
    title: '對盜用密碼行為的警告',
    message: '近期平台發生一起嚴重密碼盜用行為，相關人員已交給學校處理。請勿嘗試盜用他人密碼，否則將受到嚴重處罰。您在平台上的所有操作都已經過 Microsoft Clarity 記錄並可隨時複現，如有違規行為，將被追究責任。請保管好自己的帳號和密碼。現已強制要求團支書、實踐部和管理員設置強密碼，否則無法進行任何操作。',
  },
  'ja-JP': {
    title: 'パスワード盗用に対する警告',
    message: '最近、プラットフォームで深刻なパスワード盗用事件が発生し、関係者は学校に引き渡されました。他人のパスワードを盗むことはしないでください。さもないと、厳しい処罰を受けることになります。プラットフォームでのすべての操作は、Microsoft Clarity によって記録され、いつでも再現できます。違反がある場合は、責任を追及されます。アカウントとパスワードを安全に保管してください。現在、グループリーダー、実践部、および管理者に強力なパスワードの設定が義務付けられており、それ以外の操作はできません。',
  },
  'fr-FR': {
    title: 'Avertissement sur le vol de mot de passe',
    message: 'Récemment, un incident grave de vol de mot de passe s\'est produit sur la plateforme, et le personnel concerné a été remis à l\'école pour traitement. Ne tentez pas de voler les mots de passe des autres, sinon vous serez sévèrement punis. Toutes vos opérations sur la plateforme ont été enregistrées par Microsoft Clarity et peuvent être reproduites à tout moment. En cas de violation, vous serez tenu pour responsable. Veuillez garder votre compte et votre mot de passe en sécurité. Il est désormais obligatoire pour le chef de groupe, le département de pratique et l\'administrateur de définir un mot de passe fort, sinon aucune opération ne peut être effectuée.',
  }
}

function refresh() {
  user.value = ''
  password.value = ''
}

async function login() {
  if (user.value.toString().length !== 8) {
    await ElMessageBox.alert('User ID must be 8 digits.', 'Error', {
      type: 'error'
    })
    return
  }
  const users = await api.user.read(user.value)
  if (users.length !== 1) {
    await ElMessageBox.alert('User not found or multiple users found.', 'Error', {
      type: 'error'
    })
    return
  }
  const id = users[0]._id
  userStore.setUser(id, password.value as string).then(() => {
    router.push('/user/')
  })
}

watch(user, async () => {
  await loginfield.value.validate()
})

const openDialog = ref(false)

const language =  ref(navigator.language as 'en-US')

// Store to localStorage, if the notification has been confirmed.
localStorage.getItem('warning') === 'true' || ElMessageBox({
  title: warnings[language.value].title,
  message: warnings[language.value].message,
  type: 'warning',
  showClose: false,
  center: true
}).then(_ => {
  localStorage.setItem('warning', 'true')
})
</script>

<template>
  <div class="w-full">
    <ElDialog v-model="openDialog" width="88%" height="60%" :title="t('nav.about')">
      <AboutView />
    </ElDialog>
    <div :style="`height: ${height * 0.25}px`"></div>
    <ElCard class="login-field text-center bg-white px-4 w-full" shadow="hover">
      <ElRow class="w-full py-1">
        <ElCol :span="8" />
        <ElCol :span="6">
          <p class="text-2xl py-1 pl-8" style="text-align: center">
            {{ t('nav.login.actions.login') }}
          </p>
        </ElCol>
        <ElCol :span="10">
          <p class="align-right motto" style="text-align: right">{{ t('nav.login.motto') }}</p>
        </ElCol>
      </ElRow>
      <ElForm ref="loginfield" label-position="right" label-width="96px">
        <ElFormItem :label="t('nav.login.form.account')" prop="id" class="py-1">
          <ElInput v-model.number="user" clearable type="number" class="w-full" :min="8" :max="8" />
        </ElFormItem>
        <ElFormItem :label="t('nav.login.form.password')" prop="password" class="py-1">
          <ElInput
            type="password"
            v-model="password"
            clearable
            show-password
            @keydown.enter="login"
          />
        </ElFormItem>
      </ElForm>
      <ElRow>
        <ElCol :span="9" style="text-align: left">
          <ElButton type="info" text bg :icon="InfoFilled" @click="openDialog = true">
            {{ t('nav.about') }}
          </ElButton>
          <ZSelectLanguage type="button" with-text placement="right" />
        </ElCol>
        <ElCol :span="15" class="actions">
          <ElTooltip :content="t('nav.login.registration')" effect="light">
            <ElButton type="success" text bg :icon="Plus" disabled>
              {{ t('nav.login.actions.register') }}
            </ElButton>
          </ElTooltip>
          <ElButton type="warning" @click="refresh" text bg :icon="Refresh">
            {{ t('nav.login.actions.reset') }}
          </ElButton>
          <ElButton type="primary" @click="login" text bg :icon="ArrowRight" :disabled="password === '' || user === ''">
            {{ t('nav.login.actions.login') }}
          </ElButton>
        </ElCol>
      </ElRow>
    </ElCard>
    <div :style="`height: ${height * 0.31}px`"></div>
  </div>
</template>

<style scoped>
.login-field {
  width: 80%;
  height: 296px !important;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  top: 50%;
}

.actions {
  text-align: right;
}

.motto {
  color: #aaaaaa;
  font-size: 16px;
  text-align: right;
  position: relative;
  right: 0;
  transform: translateY(60%);
}
</style>
