<script lang="ts" setup>
import ZNotificationList from '@/components/notifications/ZNotificationList.vue'
import { ElButton } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const jumpToCreate = () => {
  router.push('/notifications/create')
}
</script>

<template>
  <div class="px-8 py-6">
    <ZNotificationList />
  </div>
</template>
