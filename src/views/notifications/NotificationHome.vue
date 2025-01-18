<script lang="ts" setup>
import ZNotificationList from '@/components/notifications/ZNotificationList.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

const mode = ref<'global' | 'personal'>(route.params.type === 'global' ? 'global' : 'personal')

onMounted(() => {
  if (route.params.type === 'global') mode.value = 'global'
  else mode.value = 'personal'
})

watch(
  () => route.params.type,
  (newVal) => {
    if (newVal === 'global') mode.value = 'global'
    else mode.value = 'personal'
  },
  { immediate: true }
)

const refresh = () => {
  router.push({ name: 'NotificationHome', params: { mode: mode.value } })
}
</script>

<template>
  <div class="px-8 py-6">
    <ZNotificationList :refresh="refresh" :mode="mode" />
  </div>
</template>
