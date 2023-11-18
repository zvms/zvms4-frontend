<script setup lang="ts">
import type { User } from '@/../@types/user'
import { toRefs, ref } from 'vue'
import { getUser } from '@/api/user/crud'
import ZButtonOrCard from '../utils/ZButtonOrCard.vue'
import type { Component as VueComponent } from 'vue'

const props = defineProps<{ id: string; icon: VueComponent }>()
const { id, icon } = toRefs(props)
const person = ref<User<string>>()
const loading = ref(false)
const error = ref(false)

getUser(id.value).then((res) => {
  if (!res) error.value = true
  else person.value = res as User<string>
})
</script>

<template>
  <ZButtonOrCard mode="button" type="primary" size="small" round :loading="loading" :icon="icon">
    <template #text>
      {{ person?.name }}
    </template>
    <template #default></template>
  </ZButtonOrCard>
</template>
