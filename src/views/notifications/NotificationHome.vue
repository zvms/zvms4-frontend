<script lang="ts" setup>
import ZNotificationList from '@/components/notifications/ZNotificationList.vue';
import { ElButton } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter()

const jumpToCreate = () => {
  router.push('/notifications/create')
}
</script>

<template>
  <div class="px-8 py-6">
    <div class="flex justify-between">
      <p class="text-2xl px-4">通知中心</p>
      <ElButton @click="jumpToCreate">发布通知</ElButton>
    </div>
    <ZNotificationList/>
  </div>
</template>
