<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ZActivityPage } from '@/components/activity/'

const route = useRoute()

const _id = route.params.id as string
const session = route.query.session as string
</script>

<template>
  <ZActivityPage class="px-16 py-12" :id="_id" :session="session" />
</template>
