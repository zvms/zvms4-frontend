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
  ElDialog
} from 'element-plus'
import { Refresh, ArrowRight } from '@element-plus/icons-vue'
import api from '@/api'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
import { ZSelectPerson } from '@/components'

if (useUserStore().isLogin) {
  useRouter().push('/user/')
}

const { height } = useWindowSize()

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
  const result = await api.user.auth.useLongTermAuth(user.value, password.value as string)
  if (result) {
    ElNotification({
      title: '登录成功',
      message: '欢迎使用，' + userStore.name + '。',
      type: 'success',
      position: 'bottom-right'
    })
    userStore.setUser(user.value, password.value as string).then(() => {
      router.push('/user/')
    })
  }
}

watch(user, async () => {
  const result = await loginfield.value.validate()
  console.log(result)
})

const open = ref(true)
</script>

<template>
  <div class="login-field text-center bg-white">
    <ElDialog
      v-model="open"
      draggable
      :modal="false"
      append-to-body
      width="60%"
      :show-close="false"
    >
      <ElRow style="width: 100%">
        <ElCol :span="3" />
        <ElCol :span="12">
          <p class="text-2xl py-4 pl-8">登录</p>
        </ElCol>
        <ElCol :span="3">
          <p class="align-right motto">励志 进取 勤奋 健美</p>
        </ElCol>
      </ElRow>
      <ElForm ref="loginfield">
        <ElFormItem label="账号" prop="id">
          <ZSelectPerson v-model="user" :filter-start="6" placeholder="请选择账号" />
        </ElFormItem>
        <ElFormItem label="密码" prop="password">
          <ElInput type="password" v-model="password" clearable show-password></ElInput>
        </ElFormItem>
        <div class="actions">
          <ElButton type="warning" @click="refresh" text bg :icon="Refresh">重置</ElButton>
          <ElButton type="primary" @click="login" text bg :icon="ArrowRight">登录</ElButton>
        </div>
      </ElForm>
    </ElDialog>
  </div>
</template>

<style scoped>
.login-field {
  width: 60%;
  height: v-bind(height * 0.88 + 'px');
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  top: 50%;
}

/* .panel {
  height: v-bind(height * 0.32 + 'px');
} */

.actions {
  text-align: right;
}

.motto {
  color: #aaaaaa;
  font-size: 16px;
  text-align: right;
  position: relative;
  right: 0;
}
</style>
