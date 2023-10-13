<script setup lang="ts">
import { CirclePlusFilled, HomeFilled, InfoFilled, Management } from '@element-plus/icons-vue'
import { ElIcon, ElMenu, ElMenuItem } from 'element-plus'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
// import { useRoute, useRouter } from 'vue-router'
import MdiEye from '@/icons/MdiEye.vue'
import MaterialSymbolsSettings from '@/icons/MaterialSymbolsSettings.vue'
import { useWindowSize } from '@vueuse/core'

const user = useUserStore()
// const router = useRouter()
// const route = useRoute()

const path = ref(new URL(window.location.href).pathname)

const { height } = useWindowSize()
</script>

<template>
  <ElMenu class="menu" :collapse="true" :default-active="path" router>
    <ElMenuItem index="/user/">
      <ElIcon><HomeFilled /></ElIcon>
      <template #title>首页</template>
    </ElMenuItem>
    <ElMenuItem index="/activity/">
      <ElIcon><MdiEye /></ElIcon>
      <template #title>查看</template>
    </ElMenuItem>
    <ElMenuItem index="/activity/create">
      <ElIcon><CirclePlusFilled /></ElIcon>
      <template #title>创建</template>
    </ElMenuItem>
    <ElMenuItem index="/activity/management" v-if="!user.position.includes('student') || user.position.length > 1">
      <ElIcon><Management /></ElIcon>
      <template #title>管理</template>
    </ElMenuItem>
    <ElMenuItem index="/about">
      <ElIcon><InfoFilled /></ElIcon>
      <template #title>关于</template>
    </ElMenuItem>
    <ElMenuItem index="/administration" v-if="user.position.includes('admin')">
      <ElIcon><MaterialSymbolsSettings /></ElIcon>
      <template #title>后台</template>
    </ElMenuItem>
  </ElMenu>
</template>

<style scoped>
.menu {
  width: 4rem;
  min-height: v-bind(height + 'px');
}
</style>
