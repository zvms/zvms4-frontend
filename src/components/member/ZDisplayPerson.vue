<script lang="ts" setup>
import api from '@/api'
import { ref, toRef, watch } from 'vue'
import type { User } from '@zvms/zvms4-types'
import ZButtonOrCard from '@/components/utils/ZButtonOrCard.vue'

const load = ref(false)
const error = ref(false)

const props = defineProps<{
  size?: 'large' | 'default' | 'small'
  userObjectId: string
  mode?: 'card' | 'button'
}>()

const size = ref(toRef(props, 'size').value ?? 'default')
const userObjectId = toRef(props, 'userObjectId')
const mode = ref(toRef(props, 'mode').value ?? 'button')
const user = ref<User>({} as User)

watch(userObjectId, (value) => {
  if (value) {
    api.user.readOne(userObjectId.value)
      .then((resp) => {
        if (resp) {
          load.value = true
          user.value = resp as User
        } else {
          error.value = true
        }
      })
      .catch(() => {
        error.value = true
      })
  } else {
    error.value = true
  }
})
</script>

<template>
  <ZButtonOrCard :mode="mode ?? 'button'" :size="size" :loading="load">
    <template #text>{{ user?.name }}</template>
  </ZButtonOrCard>
</template>
