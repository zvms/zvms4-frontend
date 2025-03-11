<script setup lang="ts">
import { ZActivityList } from '@/components'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const page = ref<'' | 'class' | 'campus'>(
  route.path.replace('/activities/', '').split('/')[0] as '' | 'class' | 'campus'
)
if (page.value === '') {
  router.push('/activities/mine')
}
const type = ref<'mine' | 'class' | 'campus'>(page.value ? page.value : 'mine')
</script>

<template>
  <ZActivityList class="mx-12" :role="type" />
</template>
