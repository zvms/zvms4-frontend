<script setup lang="ts">
import type { User } from '@/../@types/user'
import { toRefs, ref, watch } from 'vue'
import { getUser } from '@/api/user/crud'
import ZButtonOrCard from '../utils/ZButtonOrCard.vue'
import type { Component as VueComponent } from 'vue'
import { User as UserIcon } from '@element-plus/icons-vue'

const props = defineProps<{ id: string; icon?: VueComponent }>()
const { id, icon } = toRefs(props)
const person = ref<User<string>>()
const loading = ref(true)
const error = ref(false)

if (id.value)
  getUser(id.value).then((res) => {
    if (!res) error.value = true
    else person.value = res as User<string>
    console.log(res)
    loading.value = false
  })

watch(id, () => {
  if (id.value)
    getUser(id.value).then((res) => {
      if (!res) error.value = true
      else person.value = res as User<string>
      console.log(res)
      loading.value = false
    })
})
</script>

<template>
  <ZButtonOrCard
    mode="button"
    type="primary"
    size="small"
    round
    :loading="loading"
    :icon="icon ?? UserIcon"
  >
    <template #text>
      {{ person?.name }}
    </template>
    <template #default></template>
  </ZButtonOrCard>
</template>
