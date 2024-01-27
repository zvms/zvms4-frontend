<script setup lang="ts">
import { pad } from '@/plugins/ua'

const isPad = pad()
</script>

<template>
  <slot v-if="!isPad" />
</template>
