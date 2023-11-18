<script setup lang="ts">
import { ElButton, ElButtonGroup, ElCol, ElNotification, ElRow, ElTooltip } from 'element-plus'
import { PersonalPreferences, TeckStackMagV0, TeckStackMagV1 } from '@/icons/wcy'
import { useHeaderStore } from '@/stores/header'
import { pad } from '@/plugins/ua'

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
  const list = ['primary', 'success', 'warning', 'danger', 'info']
  return list[Math.floor(Math.random() * list.length)] as 'primary' | 'success' | 'warning' | 'danger' | 'info'
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
        <ElButton text bg circle :type="randomColor()" :icon="interest.icon" />
      </ElTooltip>
    </ElButtonGroup>
  </p>
  <br />
  <img
    @click="openGitHub"
    src="https://img.shields.io/badge/-@7086cmd-181717?style=for-the-badge&logo=github&logoColor=white"
  />
  <ElRow>
    <ElCol :span="12">
      <img
        v-if="!pad()"
        src="https://github-readme-stats.vercel.app/api/top-langs/?username=7086cmd&layout=compact&hide_border=true"
      />
    </ElCol>
    <ElCol :span="12">
      <img
        v-if="!pad()"
        src="https://github-readme-stats.vercel.app/api?username=7086cmd&show_icons=true"
      />
    </ElCol>
  </ElRow>
  <p class="self-introd py-2">
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
