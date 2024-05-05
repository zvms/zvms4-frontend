<script setup lang="ts">
import { ElButton, ElButtonGroup, ElCol, ElRow, ElTooltip } from 'element-plus'
import { PersonalPreferences, TeckStackMagV0, TeckStackMagV1 } from '@/icons/wcy'
import { useHeaderStore } from '@/stores/header'
import { pad } from '@/plugins/ua'

const header = useHeaderStore()

header.setHeader('About Ethan Goh')

function randomColor() {
  const list = ['primary', 'success', 'warning', 'danger', 'info']
  return list[Math.floor(Math.random() * list.length)] as
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
}
</script>
<template>
  <p class="text-2xl">
    Ethan Goh (Wú Chéng yǔ), or alias `7086cmd`, in Uranus.
    <ElButtonGroup>
      <ElTooltip
        :content="interest.name"
        effect="light"
        v-for="(interest, idx) in PersonalPreferences.filter(
          (x) => x.classify !== 'game' || !pad()
        )"
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
  <ElRow v-if="!pad()">
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
  <p>Individual Anarchism & Liberal. LaTeX & Rust enthusiast. Learning Deep Learning</p>
</template>

<style scoped>
.self-introd {
  font-family: 'Ubuntu';
  font-size: 1.2rem;
}
</style>
