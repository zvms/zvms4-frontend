<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ZActivityPage } from '@/components/activity/'
import { ref } from 'vue';
import type { ActivityInstance } from '@zvms/zvms4-types';
import api from '@/api';
import { ElLoading } from 'element-plus';

const route = useRoute()

const _id = route.params.id as string

const activity = ref<ActivityInstance>()

const loading = ElLoading.service({
  fullscreen: true,
})

api.activity.read.single(_id).then(res => {
  activity.value = res
  loading.close()
})
</script>

<template>
  <ZActivityPage class="px-16 py-12" v-if="activity" :activity="activity" />
</template>
