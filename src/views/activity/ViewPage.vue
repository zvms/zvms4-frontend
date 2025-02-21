<script setup lang="ts">
import { ZActivityList } from '@/components'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()

const page = ref<'' | 'class' | 'campus'>(
  route.path.replace('/activities/', '').split('/')[0] as '' | 'class' | 'campus'
)

const type = ref<'mine' | 'class' | 'campus'>(page.value ? page.value : 'mine')
</script>

<template>
  <ZActivityList :role="type" />
</template>
