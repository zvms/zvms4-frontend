<script setup lang="ts">
import { ElResult, ElButton, ElCard } from 'element-plus'
</script>

<template>
  <div class="p-4">
    <ElCard shadow="never">
      <ElResult status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
        <template #extra>
          <ElButton text bg type="primary" @click="$router.push('/')">Back Home</ElButton>
        </template>
      </ElResult>
    </ElCard>
  </div>
</template>

<style scoped></style>
