<script lang="ts" setup>
import { ElCard, ElDivider } from 'element-plus'
</script>
<template>
  <div class="px-24 full py-4">
    <ElCard shadow="never" class="full">
      <p class="text-xl">关于 ZVMS</p>
      <p class="text-l pl-4">
        <span class="large">Z</span>henhai High School
        <span class="large">V</span>olunteer
        <span class="large">M</span>anagement
        <span class="large">S</span>ystem
      </p>
      <p>Open-Sourced Project, with a long history.</p>
      <ol class="pl-4">
        <li>Version. 0.x, with <code>Vue</code> 2, <code>Vuetifty</code>, and <code>Electron</code>.</li>
        <li>Version. 1.x, with <code>Vue</code> 2, <code>Vuetifty</code>, and <code>Electron</code>.</li>
        <li>Version. 2.x, with <code>Vue</code> 3, <code>Vuetify</code>, move to the browser.</li>
        <li>Version. 3.x, with <code>Vanilla</code>, <code>Bootstrap</code>.</li>
        <li>Version. 4.x, with <code>Vue</code> 3, <code>Element Plus</code>, <b>Current Version</b>.</li>
      </ol>
    </ElCard>
  </div>
  <div class="px-24 full py-4">
    <ElCard shadow="never" class="full">
      <p class="text-xl">关于开发者</p>
      <p class=""></p>
    </ElCard>
  </div>
</template>

<style scoped>
.full {
  width: 100%;
}

.large {
  font-weight: bold;
  font-size: 24px;
}
</style>
