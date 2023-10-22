<script setup lang="ts">
import { ElButton, ElButtonGroup, ElNotification, ElTooltip } from 'element-plus'
import type { Component as VueComponent } from 'vue'
import { PersonalStacks, PersonalPreferences, TeckStackMagV0, TeckStackMagV1 } from '@/icons/wcy'
import { useHeaderStore } from '@/stores/header'

const header = useHeaderStore()

header.setHeader('关于｜吴承宇')

function openGitHub() {
  ElNotification({
    title: '不行',
    message: '如果这样就让你润出去的话未免有些……（   ）（3 分）',
    type: 'warning'
  })
}

function randomColor() {
  const colors = ['primary', 'success', 'warning', 'danger', 'info']
  return colors[Math.floor(Math.random() * colors.length)] as
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
}
</script>
<template>
  <p class="text-2xl">
    2023 级 吴承宇
    <ElButtonGroup>
      <ElTooltip
        :content="interest.name"
        effect="light"
        v-for="(interest, idx) in PersonalPreferences"
        :key="idx"
      >
        <ElButton text bg circle :icon="interest.icon" />
      </ElTooltip>
    </ElButtonGroup>
    <br />
    <span class="text-lg">个人技术栈推荐：</span>
    <ElButtonGroup>
      <ElTooltip
        :content="stack.name"
        effect="light"
        v-for="(stack, idx) in PersonalStacks"
        :key="idx"
      >
        <ElButton style="fill: currentColor" text bg circle :icon="stack.icon" />
      </ElTooltip>
    </ElButtonGroup>
  </p>
  <br />
  <ElButton text bg @click="openGitHub" type="primary"
    >View me on GitHub: https://github.com/7086cmd/</ElButton
  >
  <code> // Never write comments. </code>
  <p class="self-introd">
    开发过的项目有：蛟川书院纪检部管理平台
    <sup>
      <ElButtonGroup>
        <ElTooltip
          :content="stack.name"
          effect="light"
          v-for="(stack, idx) in TeckStackMagV0"
          :key="idx"
        >
          <ElButton text bg circle :icon="stack.icon" />
        </ElTooltip>
      </ElButtonGroup>
    </sup>
    蛟川书院学生会管理平台
    <sup>
      <ElButtonGroup>
        <ElTooltip
          :content="stack.name"
          effect="light"
          v-for="(stack, idx) in TeckStackMagV1"
          :key="idx"
        >
          <ElButton text bg circle :icon="stack.icon" />
        </ElTooltip>
      </ElButtonGroup>
    </sup>
  </p>
</template>

<style scoped>
.self-introd {
  font-family: 'Ubuntu';
  font-size: 1.2rem;
}
</style>
