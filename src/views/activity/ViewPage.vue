<script setup lang="ts">
import { ZActivityList } from '@/components'
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/user';
import { ref, watch } from 'vue';

const route = useRoute()
const { t } = useI18n()
const user = useUserStore()

console.log(route)

const page = ref<'' | 'class' | 'campus'>(route.path.replace('/activities/', '').split('/')[0] as '' | 'class' | 'campus')

const type = ref<'mine' | 'class' | 'campus'>(page.value ? page.value : 'mine')
</script>

<template>
  <ZActivityList class="px-8" :role="type" />
</template>
