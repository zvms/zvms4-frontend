<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElButton } from 'element-plus'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

const router = useRouter()

const goToGroupList = () => {
  router.push('/group')
}

const goToClass = () => {
  router.push(`/group/${user.class_id}`)
}
</script>

<template>
  <div
    class="px-6 py-6"
    v-if="
      user.position.includes('admin') ||
      user.position.includes('department') ||
      user.position.includes('auditor')
    "
  >
    <ElButton type="primary" text bg @click="goToGroupList">Go to Group List</ElButton>
  </div>
  <div class="px-6 py-6" v-else>
    <ElButton type="primary" text bg @click="goToClass">Go to Class</ElButton>
  </div>
</template>
