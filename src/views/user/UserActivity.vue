<script lang="ts" setup>
import { ref } from 'vue'
import ZActicityList from '@/components/activity/ZActivityList.vue'
import { useHeaderStore } from '@/stores/header';

const header = useHeaderStore()

header.setHeader('查看义工')
</script>

<template>
  <ZActicityList :activities="[]" role="student" />
</template>
