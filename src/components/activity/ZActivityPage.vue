<script setup lang="ts">
import type { ActivityInstance } from '@/../@types/activity'
import { ZActivityCard, ZActivityHistory, ZActivityMemberList } from '.'
import { ref, withDefaults } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { ElPageHeader } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

const props = withDefaults(
  defineProps<{
    activity: ActivityInstance
  }>(),
  {}
)

const { activity } = props

// const availibility = ref(
//   user.position.includes('department') ||
//     user.position.includes('auditor') ||
//     user.position.includes('admin') ||
//     user.position.includes('secretary')
// )
</script>

<template>
  <div>
    <ElPageHeader v-if="activity._id" :icon="ArrowLeft" @back="() => $router.back()" class="py-4">
      <template #content>
        {{ activity.name }}
      </template>
    </ElPageHeader>
    <p class="text-gray-500 dark:text-gray-400 px-4">
      {{ activity.description }}
    </p>
  </div>
</template>
