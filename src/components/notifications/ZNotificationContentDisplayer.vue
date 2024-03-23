<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  content: string
}>()
const paras = computed(() => props.content.split('\n'))
</script>

<template>
  <div v-for="item in paras" class="py-1">
    {{ item }}
  </div>
</template>
