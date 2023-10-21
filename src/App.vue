<script setup lang="ts">
import { ArrowDown, User, SwitchButton } from '@element-plus/icons-vue'
import {
  ElContainer,
  ElAside,
  ElHeader,
  ElFooter,
  ElIcon,
  ElRow,
  ElCol,
  ElButton,
  ElButtonGroup,
  ElPopover
} from 'element-plus'
import { RouterView } from 'vue-router'
import { useUserStore } from './stores/user'
import { useRouter } from 'vue-router'
import Feedback from '@/icons/MaterialSymbolsFeedbackOutlineRounded.vue'
import Password from '@/icons/MaterialSymbolsPasswordRounded.vue'
import UserNav from './views/user/UserNav.vue'
import { useHeaderStore } from './stores/header'

const router = useRouter()
const userStore = useUserStore()
const headerStore = useHeaderStore()

function logout() {
  userStore.removeUser()
  router.push('/user/login')
}
</script>

<template>
  <ElContainer @contextmenu.prevent class="bg-slate-50">
    <ElHeader>
      <ElRow class="pt-4 px-6">
        <ElCol :span="8">
          <div class="text-2xl tit" @dblclick="router.push('/')">
            <ElIcon class="icon"><img src="/favicon.ico" /></ElIcon>
            {{ headerStore.header }}
          </div>
        </ElCol>
        <ElCol :span="8"> </ElCol>
        <ElCol :span="8">
          <ElButtonGroup class="user">
            <ElButton text bg :icon="User" type="primary">{{
              userStore.isLogin ? userStore.name : '未登录'
            }}</ElButton>
            <ElPopover>
              <template #reference>
                <ElButton text bg :icon="ArrowDown" :disabled="!userStore.isLogin" type="primary" />
              </template>
              <ElButton text :icon="Feedback" class="action-btn p-4">问题反馈</ElButton><br />
              <ElButton text :icon="Password" class="action-btn p-4">密码修改</ElButton><br />
              <ElButton text :icon="SwitchButton" class="action-btn p-4" @click="logout"
                >退出登录</ElButton
              >
            </ElPopover>
          </ElButtonGroup>
        </ElCol>
      </ElRow>
    </ElHeader>
    <ElContainer style="width: 100%; height: 100%">
      <UserNav style="height: 100%" v-if="userStore.isLogin" />
      <RouterView class="bg-white view"/>
    </ElContainer>
    <ElFooter class="footer">
      <p class="text-center">&copy; 2018-2023 镇海中学义管会</p>
    </ElFooter>
  </ElContainer>
</template>

<style scoped>
.footer {
  background-color: #f5f5f5;
  color: #666;
  font-size: 0.8rem;
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
}

.tit {
  width: 100%;
  border: 0 0 2px 0;
}

.action-btn {
  width: 100%;
}

.icon {
  position: relative;
  top: 40%;
  transform: translateY(16%);
}

.view {
  border-radius: 1rem;
}

.user {
  position: absolute;
  right: 0;
}
</style>
