<script lang="ts" setup>
import type { ActivityInstance } from '@/../@types/activity'
import { toRefs, ref } from 'vue'
import ZButtonOrCard from '@/components/utils/ZButtonOrCard.vue'
import { ElButton } from 'element-plus'
import { IndexFinger } from '@icon-park/vue-next'
import ZActivityType from '@/components/tags/ZActivityType.vue'

const props = defineProps<{
  activity: ActivityInstance
  mode: 'student' | 'secretary' | 'auditor'
}>()

const { activity, mode } = toRefs(props)

const hovered = ref(false)
</script>

<template>
  <ZButtonOrCard mode="card" @mouseover="hovered = true" @mouseleave="hovered = false">
    <p class="text-xl pl-4">
      {{ activity.name }}
      <ZActivityType :type="activity.type" mode="full" />
      <Transition
        appear
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <ElButton v-if="hovered" size="small" class="pl-2" type="info" text bg round>
          {{ activity._id }}
        </ElButton>
      </Transition>
    </p>

    <p class="text-sm text-gray-500 pt-2 pl-4">
      {{ activity.description }}
    </p>
  </ZButtonOrCard>
</template>
