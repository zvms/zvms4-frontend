<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ZActivityPage } from '@/components/activity/'
import { ref } from 'vue';
import type { ActivityInstance } from '@/../@types/activity';
import api from '@/api';

const route = useRoute()

const _id = route.params._id as string

const activity = ref<ActivityInstance>()

api.activity.read.single(_id).then(res => {
  activity.value = res
})
</script>

<template>
  <ZActivityPage v-if="activity" :activity="activity" />
</template>
