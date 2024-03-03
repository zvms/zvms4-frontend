<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  ElInput,
  ElForm,
  ElFormItem,
  ElButton,
  ElNotification,
  ElRow,
  ElCol,
  ElCard,
  ElTooltip,
  ElDialog
} from 'element-plus'
import { Refresh, ArrowRight, Plus, InfoFilled } from '@element-plus/icons-vue'
import api from '@/api'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
import { ZSelectLanguage, ZSelectPerson } from '@/components'
import { useI18n } from 'vue-i18n'
import { AboutView } from '..'

if (useUserStore().isLogin) {
  useRouter().push('/user/')
}

const { height } = useWindowSize()
const { t } = useI18n()

const user = ref('')
const password = ref<string>('')
const loginfield = ref()
const userStore = useUserStore()
const router = useRouter()

function refresh() {
  user.value = ''
  password.value = ''
}

async function login() {
  userStore.setUser(user.value, password.value as string).then(() => {
    router.push('/user/')
  })
}

watch(user, async () => {
  const result = await loginfield.value.validate()
  console.log(result)
})

const openDialog = ref(false)
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
          <ZSelectPerson v-model="user" :filter-start="6" full-width />
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
