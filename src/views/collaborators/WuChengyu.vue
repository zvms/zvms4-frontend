<script setup lang="ts">
import { ElButton, ElButtonGroup, ElCol, ElRow, ElTooltip } from 'element-plus'
import { PersonalPreferences, TeckStackMagV0, TeckStackMagV1 } from '@/icons/wcy'
import { useHeaderStore } from '@/stores/header'
import { pad } from '@/plugins/ua'

const header = useHeaderStore()

header.setHeader('About Ethan Goh')

function randomColor() {
  const list = ['primary', 'success', 'warning', 'danger', 'info']
  return list[Math.floor(Math.random() * list.length)] as 'primary' | 'success' | 'warning' | 'danger' | 'info'
}
</script>
<template>
  <p class="text-2xl">
    Ethan Goh (Wú Chéng yǔ), or alias `7086cmd`.
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
    Developed projects: Discipline Department Platform in Jiaochuan Academy with
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
    , Intelligent administration platform of Students' Union in Jiaochuan Academy using
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
    , a minimal digit recognition with CNN, a minimal localization & block recognition plugin for automatic, etc.
  </p>
  <p>LaTeX enthusiast. Learning machine learning and embed development.</p>
</template>

<style scoped>
.self-introd {
  font-family: 'Ubuntu';
  font-size: 1.2rem;
}
</style>
