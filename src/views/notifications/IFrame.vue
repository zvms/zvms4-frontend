<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const portNum = ref(route.params.port)

const src = `http://172.31.2.4:${portNum.value}`
</script>

<template>
  <iframe
    v-if="src"
    :src="src"
    allow="camera;microphone;midi;encrypted-media"
    class="w-full h-full border-box"
  ></iframe>
</template>
