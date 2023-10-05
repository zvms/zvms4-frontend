<script lang="ts" setup>
import { ElButton, ElButtonGroup, ElCard, ElDrawer } from 'element-plus'
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
import TablerBrandJavascript from '@/icons/stacks/TablerBrandJavascript.vue'
import TablerBrandTypescript from '@/icons/stacks/TablerBrandTypescript.vue'
import TablerBrandVue from '@/icons/stacks/TablerBrandVue.vue'
import MdiElectronFramework from '@/icons/stacks/MdiElectronFramework.vue'
import SimpleIconsVuetify from '@/icons/stacks/SimpleIconsVuetify.vue'
import TablerBrandPython from '@/icons/stacks/TablerBrandPython.vue'
import SimpleIconsWebpack from '@/icons/stacks/SimpleIconsWebpack.vue'
import SimpleIconsFlask from '@/icons/stacks/SimpleIconsFlask.vue'
import SimpleIconsSqlite from '@/icons/stacks/SimpleIconsSqlite.vue'
import TablerBrandVite from '@/icons/stacks/TablerBrandVite.vue'
import TablerBrandBootstrap from '@/icons/stacks/TablerBrandBootstrap.vue'
import SimpleIconsFastapi from '@/icons/stacks/SimpleIconsFastapi.vue'
import EpElementPlus from '@/icons/stacks/EpElementPlus.vue'
import TablerBrandMongodb from '@/icons/stacks/TablerBrandMongodb.vue'
import TablerBrandNodejs from '@/icons/stacks/TablerBrandNodejs.vue'

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
const currentStack = ref<number>()
const openDialog = ref<boolean>(false)
const openStackDialog = ref<boolean>(false)
const curComponent = ref<VueComponent>()

watch(currentCollaborator, (newVal) => {
  const target = collaborators.find((item) => item.dispName === newVal)
  if (target) {
    curComponent.value = target.component
  }
})

watch(currentStack, (newVal) => {
  if (newVal !== undefined) {
    openStackDialog.value = true
  }
})

function useCollaboratorDialog(dispName: string) {
  currentCollaborator.value = dispName
  openDialog.value = true
}

function useStackDialog(version: number) {
  currentStack.value = version
  openStackDialog.value = true
}

const V1List = ['张子苏', 'neko_moyi', 'Zecyle', 'fpc5719', 'So1aric', 'solecour', 'dblark']
const V2List = ['qnc', '_Kerman', 'clc', '7086cmd']
const V4List = ['qnc', 'clc', '7086cmd', 'byh', 'zyq']

const stacksV0 = [
  TablerBrandTypescript,
  TablerBrandJavascript,
  TablerBrandVue,
  SimpleIconsVuetify,
  TablerBrandNodejs
]
const stacksV1 = [
  TablerBrandTypescript,
  TablerBrandPython,
  TablerBrandVue,
  MdiElectronFramework,
  SimpleIconsVuetify,
  SimpleIconsSqlite,
  SimpleIconsFlask,
  SimpleIconsWebpack
]
const stacksV2 = [
  TablerBrandTypescript,
  TablerBrandPython,
  TablerBrandVue,
  TablerBrandVite,
  SimpleIconsVuetify,
  SimpleIconsSqlite,
  SimpleIconsFlask
]
const stacksV3 = [TablerBrandPython, SimpleIconsFlask, SimpleIconsSqlite, TablerBrandBootstrap]
const stacksV4 = [
  TablerBrandTypescript,
  TablerBrandPython,
  TablerBrandVue,
  TablerBrandVite,
  EpElementPlus,
  TablerBrandMongodb,
  SimpleIconsFastapi
]

const versions = [
  { collaborators: ['张子苏'] },
  { collaborators: V1List },
  { collaborators: V2List },
  { collaborators: ['qnc'] },
  { collaborators: V4List }
]

const stacks = [
  {
    version: 0,
    stacks: stacksV0,
    repos: ['zhangzisu/zvms-frontend', 'zhangzisu/zvms']
  },
  {
    version: 1,
    stacks: stacksV1,
    repos: ['zvms/zvms-electron', 'zvms/zvms-backend']
  },
  {
    version: 2,
    stacks: stacksV2,
    repos: ['zvms/zvms']
  },
  {
    version: 3,
    stacks: stacksV3,
    repos: ['zvmsbackend/zvms3']
  },
  {
    version: 4,
    stacks: stacksV4,
    repos: ['zvms/zvms4-frontend', 'zvms/zvms4-backend']
  }
] as Array<{
  version: number
  stacks: VueComponent[]
  repos: string[]
}>

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
        <p>Open-Source Project, with a long history.</p>
      </ElCard>
    </div>
    <div class="py-4">
      <ElCard shadow="never" class="full">
        <p class="text-xl">关于开发者</p>
        <div class="px-8">
          <div class="py-2" v-for="(version, id) in versions" :key="id">
            本项目
            <ElButton text bg :type="useRandomColor()" @click="useStackDialog(id)" size="small">
              v{{ id }}.x
            </ElButton>
            版本由
            <ElButtonGroup>
              <ElButton
                text
                v-for="(collaborator, idx) in version.collaborators"
                :key="idx"
                :type="useRandomColor()"
                @click="useCollaboratorDialog(collaborator)"
                size="small"
              >
                {{ collaborator }}
              </ElButton>
            </ElButtonGroup>
            设计。
          </div>
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
    <ElDrawer
      direction="btt"
      size="75%"
      v-model="openDialog"
      center
      :title="'关于 ' + currentCollaborator"
    >
      <Component class="px-8 text-xl" :is="curComponent" />
    </ElDrawer>
    <ElDrawer
      direction="btt"
      size="40%"
      v-model="openStackDialog"
      center
      :title="'关于 ZVMS v' + currentStack + '.x'"
    >
      技术栈：
      <ElButtonGroup>
        <ElButton
          v-for="(stack, idx) in stacks[currentStack as number].stacks"
          :key="idx"
          :icon="stack"
          :type="useRandomColor()"
          circle
          text
          bg
        />
      </ElButtonGroup>
      <br /><br />
      仓库：
      <ElButtonGroup>
        <ElButton
          v-for="(repo, idx) in stacks[currentStack as number].repos"
          text
          bg
          :key="idx"
          :type="useRandomColor()"
          >{{ repo }}</ElButton
        >
      </ElButtonGroup>
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
