<script lang="ts" setup>
import { ElButton, ElCard, ElDrawer } from 'element-plus'
import ZhangZisu from '@/views/collaborators/ZhangZisu.vue'
import LuJinxuan from '@/views/collaborators/LuJinxuan.vue'
import ZhuChengyang from '@/views/collaborators/ZhuChengyang.vue'
import ChenChen from '@/views/collaborators/ChenChen.vue'
import ShenLechen from '@/views/collaborators/ShenLechen.vue'
import HuangHanting from '@/views/collaborators/HuangHanting.vue'
import ZhouShengjie from '@/views/collaborators/ZhouShengjie.vue'
import QiuNianchu from '@/views/collaborators/QiuNianchu.vue'
import XiongTongrui from '@/views/collaborators/XiongTongrui.vue'
import ChenLiuchang from '@/views/collaborators/ChenLiuchang.vue'
import WuChengyu from '@/views/collaborators/WuChengyu.vue'
import BaoYihan from '@/views/collaborators/BaoYihan.vue'
import ZhaiYanqi from '@/views/collaborators/ZhaiYanqi.vue'
import HuangHaojie from '@/views/collaborators/HuangHaojie.vue'
import ZhangShengze from '@/views/collaborators/ZhangShengze.vue'
import ZhouJirui from '@/views/collaborators/ZhouJirui.vue'
import { ref, type Component as VueComponent, watch } from 'vue'

const collaborators = [
  {
    dispName: '张子苏',
    component: ZhangZisu
  },
  {
    dispName: 'neko_moyi',
    component: LuJinxuan
  },
  {
    dispName: 'Zecyle',
    component: ZhuChengyang
  },
  {
    dispName: 'fpc5719',
    component: ChenChen
  },
  {
    dispName: 'So1aric',
    component: ShenLechen
  },
  {
    dispName: 'solecour',
    component: HuangHanting
  },
  {
    dispName: 'dblark',
    component: ZhouShengjie
  },
  {
    dispName: 'qnc',
    component: QiuNianchu
  },
  {
    dispName: '_Kerman',
    component: XiongTongrui
  },
  {
    dispName: 'clc',
    component: ChenLiuchang
  },
  {
    dispName: '7086cmd',
    component: WuChengyu
  },
  {
    dispName: 'byh',
    component: BaoYihan
  },
  {
    dispName: 'zyq',
    component: ZhaiYanqi
  },
  {
    dispName: 'haojie',
    component: HuangHaojie
  },
  {
    dispName: 'zsz',
    component: ZhangShengze
  },
  {
    dispName: 'zjr',
    component: ZhouJirui
  },
  {
    dispName: 'hhj',
    component: HuangHaojie
  },
  {
    dispName: 'zsz',
    component: ZhangShengze
  },
  {
    dispName: 'zjr',
    component: ZhouJirui
  }
] as Array<{ dispName: string; component: VueComponent }>

const currentCollaborator = ref<string>('')
const openDialog = ref<boolean>(false)
const curComponent = ref<VueComponent>()

watch(currentCollaborator, (newVal) => {
  const target = collaborators.find((item) => item.dispName === newVal)
  if (target) {
    curComponent.value = target.component
  }
})

function useCollaboratorDialog(dispName: string) {
  currentCollaborator.value = dispName
  openDialog.value = true
}

const V1List = ['张子苏', 'neko_moyi', 'Zecyle', 'fpc5719', 'So1aric', 'solecour', 'dblark']
const V2List = ['qnc', '_Kerman', 'clc', '7086cmd']
const V4List = ['qnc', 'clc', '7086cmd', 'byh', 'zyq']

function useRandomColor(): 'primary' | 'success' | 'warning' | 'danger' | 'info' {
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
  <div class="full px-4">
    <div class="py-4">
      <ElCard shadow="never" class="full">
        <p class="text-xl">关于 ZVMS</p>
        <p class="text-l pl-4">
          <span class="large">Z</span>henhai High School <span class="large">V</span>olunteer
          <span class="large">M</span>anagement <span class="large">S</span>ystem
        </p>
        <p>Open-Sourced Project, with a long history.</p>
      </ElCard>
    </div>
    <div class="py-4">
      <ElCard shadow="never" class="full">
        <p class="text-xl">关于开发者</p>
        <div class="px-8">
          <p class="py-2">
            本项目 v0.x 版本由
            <ElButton
              text
              bg
              :type="useRandomColor()"
              @click="useCollaboratorDialog('张子苏')"
              size="small"
              >张子苏</ElButton
            >
            设计。
          </p>
          <p class="py-2">
            本项目 v1.x 版本由
            <ElButton
              v-for="name in V1List"
              :key="name"
              text
              bg
              :type="useRandomColor()"
              @click="useCollaboratorDialog(name)"
              size="small"
              >{{ name }}</ElButton
            >
            设计开发。
          </p>
          <p class="py-2">
            本项目 v2.x 版本由
            <ElButton
              v-for="name in V2List"
              :key="name"
              text
              bg
              :type="useRandomColor()"
              @click="useCollaboratorDialog(name)"
              size="small"
              >{{ name }}</ElButton
            >
            设计开发。
          </p>
          <p class="py-2">
            本项目 v3.x 版本由
            <ElButton
              text
              bg
              :type="useRandomColor()"
              @click="useCollaboratorDialog('qnc')"
              size="small"
              >qnc</ElButton
            >
            开发。
          </p>
          <p class="py-2">
            本项目 v4.x 版本由
            <ElButton
              v-for="name in V4List"
              :key="name"
              text
              bg
              :type="useRandomColor()"
              @click="useCollaboratorDialog(name)"
              size="small"
              >{{ name }}</ElButton
            >
            设计开发。
          </p>
          <p class="py-2">
            同时，感谢
            <ElButton
              text
              bg
              :type="useRandomColor()"
              @click="useCollaboratorDialog('hhj')"
              size="small"
              >hhj</ElButton
            >
            提供和部署的校外服务器、
            <ElButton
              text
              bg
              :type="useRandomColor()"
              @click="useCollaboratorDialog('zsz')"
              size="small"
              >zsz</ElButton
            >
            的新版（Version 2.0 - latest）图标以及
            <ElButton
              text
              bg
              :type="useRandomColor()"
              @click="useCollaboratorDialog('zjr')"
              size="small"
              >zjr</ElButton
            >
            的疯狂测试。
          </p>
        </div>
      </ElCard>
    </div>
    <ElDrawer direction="btt" size="60%" v-model="openDialog" :title="'关于 ' + currentCollaborator">
      <Component class="px-8 text-xl" :is="curComponent" />
    </ElDrawer>
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
