<script lang="ts" setup>
import ZGroupUserList from '@/components/group/ZGroupUserList.vue'
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()

const id = ref<string>('')

watch(() => route.params.id, (value) => {
  id.value = value as string
})

id.value = route.params.id as string
</script>

<template>
  <div class="px-16 py-8">
    <ZGroupUserList :id="id" />
  </div>
</template>
