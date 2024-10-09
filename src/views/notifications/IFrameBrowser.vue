<template>
  <div class="iframe-browser" :class="{'grayscale': isGrayscale}">
    <div class="flex items-center justify-between w-full space-x-2">
      <el-input v-model="url" placeholder="Enter URL" class="w-full" />
      <el-button type="primary" @click="loadUrl">Go</el-button>
      <!-- Button to toggle grayscale filter -->
      <el-button type="default" @click="toggleGrayscale">
        {{ isGrayscale ? 'Disable Grayscale' : 'Enable Grayscale' }}
      </el-button>
    </div>
    <iframe v-if="iframeSrc" :src="iframeSrc" class="w-full h-full border-0"></iframe>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// Reactive variable to store the input URL
const url = ref('');

// Reactive variable to store the iframe source URL
const iframeSrc = ref('');

// Reactive variable to control the grayscale filter state
const isGrayscale = ref(false);

// Function to load the URL into the iframe
const loadUrl = () => {
  if (url.value) {
    iframeSrc.value = url.value; // Set the iframe source to the input URL
  }
};

// Function to toggle the grayscale filter
const toggleGrayscale = () => {
  isGrayscale.value = !isGrayscale.value; // Toggle the grayscale state
};
</script>

<style scoped>
/* UnoCSS styling for the container */
.iframe-browser {
  @apply flex flex-col items-center h-screen p-4;
}

/* Grayscale filter effect */
.grayscale {
  filter: grayscale(100%);
}
</style>
