<script setup lang="ts">
import { ElContainer, ElAside, ElHeader, ElFooter, ElIcon } from 'element-plus'
import { RouterView } from 'vue-router'
</script>

<template>
  <ElContainer>
    <ElHeader>
      <div class="text-2xl pt-4 px-6 tit">
        <ElIcon class="icon"><img src="/favicon.ico" /></ElIcon>
        镇海中学义工管理系统
      </div>
    </ElHeader>
    <ElContainer style="width: 100%; height: 100%">
        <RouterView />
    </ElContainer>
    <ElFooter class="footer">
      <p class="text-center">&copy; 2018-2023 镇海中学义管会</p>
    </ElFooter>
  </ElContainer>
</template>

<style scoped>
.footer {
  background-color: #f5f5f5;
  color: #666;
  font-size: 0.8rem;
  position: absolute;
  width: 100%;
  bottom: 0;
}

.tit {
  width: 100%;
  border: 0 0 2px 0;
}

.icon {
  position: relative;
  top: 40%;
  transform: translateY(16%);
}
</style>
