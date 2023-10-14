<script setup lang="ts">
import { ElButton, ElButtonGroup, ElNotification } from 'element-plus'
import type { Component as VueComponent } from 'vue'
import ArcticonsGenshinImpact from '@/icons/wcy/ArcticonsGenshinImpact.vue'
import ArcticonsHonkaiStarRail from '@/icons/wcy/ArcticonsHonkaiStarRail.vue'
import ArcticonsPhigros from '@/icons/wcy/ArcticonsPhigros.vue'
import MdiGithub from '@/icons/wcy/MdiGithub.vue'
import TablerBrandVscode from '@/icons/wcy/TablerBrandVscode.vue'
import IcOutlineApple from '@/icons/wcy/IcOutlineApple.vue'
import ArcticonsKfc from '@/icons/wcy/ArcticonsKfc.vue'
import SimpleIconsStarbucks from '@/icons/wcy/SimpleIconsStarbucks.vue'
import TablerBrandNeteaseMusic from '@/icons/wcy/TablerBrandNeteaseMusic.vue'
import TablerBrandVue from '@/icons/stacks/TablerBrandVue.vue'
import TablerBrandVite from '@/icons/stacks/TablerBrandVite.vue'
import SimpleIconsQuasar from '@/icons/stacks/SimpleIconsQuasar.vue'
import SimpleIconsKoa from '@/icons/stacks/SimpleIconsKoa.vue'
import TablerBrandSocketIo from '@/icons/stacks/TablerBrandSocketIo.vue'
import TablerBrandNodejs from '@/icons/stacks/TablerBrandNodejs.vue'
import EpElementPlus from '@/icons/stacks/EpElementPlus.vue'
import SimpleIconsRollupdotjs from '@/icons/stacks/SimpleIconsRollupdotjs.vue'
import SimpleIconsEsbuild from '@/icons/stacks/SimpleIconsEsbuild.vue'
import MdiElectronFramework from '@/icons/stacks/MdiElectronFramework.vue'
import TablerBrandJavascript from '@/icons/stacks/TablerBrandJavascript.vue'
import TablerBrandTypescript from '@/icons/stacks/TablerBrandTypescript.vue'
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

const teckStacksJCVer1 = [
  TablerBrandVue,
  SimpleIconsQuasar,
  SimpleIconsKoa,
  TablerBrandSocketIo,
  TablerBrandNodejs,
  TablerBrandJavascript
] as VueComponent[]

const teckStacksJCVer2 = [
  TablerBrandVue,
  TablerBrandVite,
  EpElementPlus,
  SimpleIconsKoa,
  TablerBrandSocketIo,
  SimpleIconsRollupdotjs,
  SimpleIconsEsbuild,
  MdiElectronFramework,
  TablerBrandTypescript
]

const interests = [
  ArcticonsGenshinImpact,
  ArcticonsHonkaiStarRail,
  ArcticonsPhigros,
  MdiGithub,
  TablerBrandVscode,
  IcOutlineApple,
  ArcticonsKfc,
  SimpleIconsStarbucks,
  TablerBrandNeteaseMusic
] as VueComponent[]
</script>
<template>
  <p class="text-2xl">
    2023 级 吴承宇
    <ElButtonGroup>
      <ElButton
        text
        bg
        :type="randomColor()"
        circle
        v-for="(interest, idx) in interests"
        :key="idx"
        :icon="interest"
      />
    </ElButtonGroup>
  </p>
  <br />
  <ElButton text bg @click="openGitHub" type="primary"
    >View me on GitHub: https://github.com/7086cmd/</ElButton
  >
  <code> // Never write comments. </code>
  <p class="self-introd">
    Participated in great projects: 蛟川书院纪检部管理平台
    <sup>
      <ElButtonGroup>
        <ElButton
          text
          bg
          :type="randomColor()"
          circle
          size="small"
          v-for="(stack, idx) in teckStacksJCVer1"
          :key="idx"
          :icon="stack"
        />
      </ElButtonGroup>
    </sup>
    蛟川书院学生会管理平台
    <sup>
      <ElButtonGroup>
        <ElButton
          text
          bg
          :type="randomColor()"
          circle
          size="small"
          v-for="(stack, idx) in teckStacksJCVer2"
          :key="idx"
          :icon="stack"
        />
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
