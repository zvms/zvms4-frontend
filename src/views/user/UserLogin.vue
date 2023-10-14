<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  ElCard,
  ElInput,
  ElForm,
  ElFormItem,
  ElButton,
  ElNotification,
  ElRow,
  ElCol
} from 'element-plus'
import { Refresh, ArrowRight } from '@element-plus/icons-vue'
import { UserLogin } from '@/api/user/auth'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

if(useUserStore().isLogin) {
  useRouter().push('/user/')
}

const user = ref<number>()
const password = ref<string>('')
const loginfield = ref()
const userStore = useUserStore()
const router = useRouter()

function refresh() {
  user.value = undefined
  password.value = ''
}

async function login() {
  const result = await UserLogin(user.value as number, password.value as string)
  if (result) {
    ElNotification({
      title: '登录成功',
      message: '欢迎使用，' + userStore.name + '。',
      type: 'success',
      position: 'bottom-right'
    })
    userStore.setUser(user.value as number, password.value as string).then(() => {
      router.push('/user/')
    })
  }
}

watch(user, async () => {
  const result = await loginfield.value.validate()
  console.log(result)
})
</script>

<template>
  <ElCard shadow="hover" class="login-field text-center">
    <ElRow>
      <ElCol :span="6"> </ElCol>
      <ElCol :span="12">
        <p class="text-2xl py-4">登录</p>
      </ElCol>
      <ElCol :span="6">
        <p class="align-right motto">励志 进取 勤奋 健美</p>
      </ElCol>
    </ElRow>
    <ElForm ref="loginfield">
      <ElFormItem label="账号" prop="id">
        <ElInput placeholder="e.g. 19191145" clearable v-model.number="user"></ElInput>
      </ElFormItem>
      <ElFormItem label="密码" prop="password">
        <ElInput type="password" v-model="password" clearable show-password></ElInput>
      </ElFormItem>
      <div class="actions">
        <ElButton type="warning" @click="refresh" text bg :icon="Refresh">重置</ElButton>
        <ElButton type="primary" @click="login" text bg :icon="ArrowRight">登录</ElButton>
      </div>
    </ElForm>
  </ElCard>
</template>

<style scoped>
.login-field {
  width: 60%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  top: 50%;
  transform: translateY(40%);
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
}
</style>