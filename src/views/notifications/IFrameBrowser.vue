<template>
    <div class="iframe-browser">
      <div class="flex items-center justify-between w-full space-x-2">
        <el-input v-model="url" placeholder="Enter URL" class="w-full" />
        <el-button type="primary" @click="loadUrl">Go</el-button>
      </div>
      <iframe v-if="iframeSrc" :src="iframeSrc" class="w-full h-full border-0"></iframe>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'IframeBrowser',
    setup() {
      const url = ref('');
      const iframeSrc = ref('');
  
      const loadUrl = () => {
        if (url.value) {
          iframeSrc.value = url.value;
        }
      };
  
      return {
        url,
        iframeSrc,
        loadUrl,
      };
    },
  });
  </script>
  
  <style scoped>
  /* 使用 UnoCSS，不需要传统样式 */
  .iframe-browser {
    @apply flex flex-col items-center h-screen p-4;
  }
  </style>
  