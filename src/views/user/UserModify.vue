<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue';
import ZUserModification from '@/components/group/ZUserModification.vue';

const route = useRoute()

const id = ref<string>(route.params.id as string)

watch(() => route.params.id, (value) => {
  id.value = value as string
})
</script>

<template>
  <div class="px-16">
    <ZUserModification :id="id" />
  </div>
</template>
