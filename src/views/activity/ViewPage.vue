<script setup lang="ts">
import { ZActivityList } from '@/components'
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const route = useRoute()
const { t } = useI18n()
const user = useUserStore()

const type = ref(route.params?.type as 'mine' | 'class' | 'campus')
</script>

<template>
  <ZActivityList :role="type" />
</template>
