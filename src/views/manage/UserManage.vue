<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ElButton } from 'element-plus';

const router = useRouter();

const goToGroupList = () => {
  router.push('/group');
};
</script>

<template>
  <div class="px-6 py-6">
    <ElButton type="primary" text bg @click="goToGroupList">Go to Group List</ElButton>
  </div>
</template>
