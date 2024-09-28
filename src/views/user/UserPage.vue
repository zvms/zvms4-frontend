<script setup lang="ts">
import ZActivityMember from '@/components/activity/ZActivityMember.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { ElButton, ElSegmented } from 'element-plus'
import { ZActivityList } from '@/components'

const route = useRoute()
const router = useRouter()
const id = ref<string>(route.params.id as string)

watch(
  () => route.params.id,
  (value) => {
    id.value = value as string
  }
)

const current = ref('info')

const tabs = ref([
  {
    label: 'Info',
    value: 'info',
  },
  {
    label: 'Activity',
    value: 'activity',
  }
])
</script>

<template>
  <div class="px-16 py-8">
    <div class="text-center py-2">
      <ElSegmented v-model="current" :options="tabs" />
    </div>
    <div v-if="current === 'info'">
      <p class="text-2xl">User Card</p>
      <p class="text-sm text-gray-500">
        This is a small implementation for user administration and management. Because of the time limit, I can't design a full-fledged user management system. This is just a small part of the system.
        Since only department members use this part of the system, it displays English for a short time for the sake of simplicity. I will translate it into Chinese and other languages with the help of the translator (internationalization) in the future.
      </p>
      <ZActivityMember :id="id" mode="card" />
      <div class="text-right">
        <ElButton text bg type="warning" @click="router.push(`/user/${id}/modify`)">
          Edit Member Info
        </ElButton>
      </div>
    </div>
    <div v-else-if="current === 'activity'">
      <ZActivityList :perspective="id" role="mine" />
    </div>
  </div>
</template>
