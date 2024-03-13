<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const src = `http://172.31.2.4:${route.params.port}`
</script>

<template>
  <iframe
    v-if="src"
    :src="src"
    allow="camera;microphone;midi;encrypted-media"
    class="w-full h-full border-0"
  ></iframe>
</template>
