<script lang="ts" setup>
import ZNotificationList from '@/components/notifications/ZNotificationList.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="px-8 py-6">
    <ZNotificationList />
  </div>
</template>
