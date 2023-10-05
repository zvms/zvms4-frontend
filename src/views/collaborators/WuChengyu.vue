<script setup lang="ts">
import { ElButton, ElNotification } from 'element-plus'

function openGitHub() {
  ElNotification({
    title: '不行',
    message: '如果这样就让你润出去的话未免有些……（   ）（3 分）',
    type: 'warning'
  })
}
</script>
<template>
  <p class="text-2xl">2023 级 吴承宇</p>
  <br />
  <ElButton text bg @click="openGitHub" type="primary">View me on GitHub</ElButton>
  <code> // Never write comments. </code>
</template>
