<script lang="ts" setup>
import { ref } from 'vue'
import ZActicityList from '@/components/activity/ZActivityList.vue'
</script>

<template>
  <ZActicityList :activities="[]" role="student" />
</template>
