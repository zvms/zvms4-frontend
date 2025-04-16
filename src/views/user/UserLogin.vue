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
  ElMessageBox,
} from 'element-plus'
import { Refresh, ArrowRight } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
import { ZSelectLanguage } from '@/components'
import { useI18n } from 'vue-i18n'
import api from '@/api'

if (useUserStore().isLogin) {
  useRouter().push('/user')
} else {
  localStorage.removeItem('token')
}

const { height } = useWindowSize()
const { t } = useI18n()

// dark.value = false
// We haven't already adjusted the color in dark mode.

const user = ref('')
const password = ref<string>('')
const loginfield = ref()
const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)

function refresh() {
  user.value = ''
  password.value = ''
  loading.value = false
}

async function login() {
  if (loading.value) {
    return
  }
  loading.value = true
  if (user.value.toString().length !== 8) {
    await ElMessageBox.alert('User ID must be 8 digits.', 'Error', {
      type: 'error'
    })
    loading.value = false
    return
  }
  const users = (await api.user.read(user.value).catch(() => {
    loading.value = false
  }))?.users
  if (users?.length !== 1) {
    await ElMessageBox.alert('User not found or multiple users found.', 'Error', {
      type: 'error'
    })
    loading.value = false
    return
  }
  const id = users?.[0]._id
  await userStore.setUser(id, password.value as string).catch(() => {
    loading.value = false
  })
  router.push('/user')
}

watch(user, async () => {
  await loginfield.value.validate()
})

</script>

<template>
  <div class="w-full">
    <div :style="`height: ${height * 0.25}px`"></div>
    <ElCard class="login-field text-center px-4 w-full" shadow="hover">
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
          <ElInput v-model.number="user" :minlength="8" :maxlength="8" clearable type="number" class="w-full" :min="8" :max="8" />
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
          <ZSelectLanguage type="button" with-text placement="right" />
        </ElCol>
        <ElCol :span="15" class="actions">
          <ElButton type="warning" @click="refresh" text bg :icon="Refresh">
            {{ t('nav.login.actions.reset') }}
          </ElButton>
          <ElButton
            type="primary"
            @click="login"
            text
            bg
            :icon="ArrowRight"
            :disabled="password === '' || user === ''"
          >
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
