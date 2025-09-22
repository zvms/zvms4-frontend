<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

if (!userStore.isLogin) {
  router.replace('/user/login')
} else {
  router.replace('/user')
}
</script>

<!-- eslint-disable-next-line vue/valid-template-root -->
<template></template>
