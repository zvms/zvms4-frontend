<script setup lang="ts">
import { ref, watch, h } from 'vue'
import {
  ElInput,
  ElForm,
  ElFormItem,
  ElButton,
  ElRow,
  ElCol,
  ElCard,
  ElMessageBox,
  ElMessage,
} from 'element-plus'
import {
  InfoFilled
} from '@element-plus/icons-vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useHeaderStore } from '@/stores/header'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { modifyPasswordDialogs } from '@/views'
import api from '@/api'

if (useUserStore().isLogin) {
  useRouter().replace('/user')
} else {
  localStorage.removeItem('token')
}

const header = useHeaderStore()

const { t } = useI18n()

const user = ref('')
const password = ref<string>('')
const loginfield = ref()
const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)

header.setHeader(t('nav.login.actions.login'))

async function login() {
  if (loading.value || password.value === '' || String(user.value).length !== 8) {
    return
  }
  const strongPasswordValidator = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])[ -}]{8,14}$'
  )
  if (!strongPasswordValidator.test(password.value)) {
    loading.value = true
    
    const id = user.value
    const { token, _id } = (await api.user.auth.useLongTermAuth(id, password.value, 'short').catch(() => {
      loading.value = false
    })) || {
      token: '',
      _id: '',
    }
    if (!token) {
      loading.value = false
      return
    }
    await ElMessageBox({
      message: h(
        'p',
        null,
        [
          h('span', null, '为防止您的账号被盗，您必须修改密码以保护您的账号。'),
          h('strong', null, '您必须修改密码后才能继续使用本系统。')
        ]
      ),
      showCancelButton: true,
      title: '您必须修改密码',
      confirmButtonText: '修改密码',
      cancelButtonText: '取消',
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
    }).then(() => reset_and_login(_id, token)).catch(() => {
      loading.value = false
    })
    return
  }
  loading.value = true
  const id = user.value
  await userStore
    .setUser(id, password.value as string)
    .then(() => router.replace('/user'))
    .catch(() => {
      loading.value = false
    })
}

async function reset_and_login(id: string, token: string) {
  await modifyPasswordDialogs(id, 'zh-CN', async (a: string, new_password: string) => {
    await api.user.password.put(id, new_password, token).catch(() => {
      loading.value = false
    })
    await userStore
      .setUser(id, new_password)
      .then(() => router.replace('/user'))
      .catch(() => {
        loading.value = false
      })
  }, token).catch(() => {
    loading.value = false
  })
}

watch(user, async () => {
  await loginfield.value.validate()
})
</script>

<template>
  <div class="w-full" style="display: flex; flex-direction: column;">
    <div style="flex-grow: 1;"></div>
    <ElCard class="login-field text-center px-4 w-full" shadow="hover" style="flex-grow: 0;">
      <ElRow class="w-full py-1">
        <ElCol :span="8" />
        <ElCol :span="8">
          <p class="text-2xl py-1 pl-8" style="text-align: center">
            {{ t('nav.login.actions.login') }}
          </p>
        </ElCol>
        <ElCol :span="8">
          <!--<p class="align-right motto" style="text-align: right">{{ t('nav.login.motto') }}</p>-->
        </ElCol>
      </ElRow>
      <ElForm ref="loginfield" label-position="right" label-width="48px">
        <ElFormItem :label="t('nav.login.form.account')" prop="id" class="py-1">
          <ElInput
            v-model.number="user"
            :minlength="8"
            :maxlength="8"
            clearable
            type="number"
            class="w-full"
          />
        </ElFormItem>
        <ElFormItem :label="t('nav.login.form.password')" prop="password" class="py-1">
          <ElInput
            type="password"
            v-model="password"
            clearable
            show-password
            @keyup.enter="login"
          />
        </ElFormItem>
      </ElForm>
      <ElRow>
        <ElCol :span="9" style="text-align: left">
          <ElButton type="info" text bg :icon="InfoFilled" @click="router.push('/about')">
            {{ t('nav.about') }}
          </ElButton>
        </ElCol>
        <ElCol :span="15" class="actions">
          <!--<ElButton type="warning" @click="refresh" text bg :icon="Refresh">
            {{ t('nav.login.actions.reset') }}
          </ElButton>-->
          <ElButton
            type="primary"
            @click="login"
            text
            bg
            :icon="ArrowRight"
            :disabled="password === '' || String(user).length !== 8"
            :loading="loading"
          >
            {{ t('nav.login.actions.login') }}
          </ElButton>
        </ElCol>
      </ElRow>
    </ElCard>
    <div style="flex-grow: 1;"></div>
    <div style="flex-grow: 0; min-height: 3.75rem; max-height: 3.75rem;"></div>
  </div>
</template>

<style scoped>
.login-field {
  width: 80%;
  height: 296px !important;
  overflow-y: scroll;
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
