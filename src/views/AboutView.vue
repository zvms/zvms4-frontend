<script lang="ts" setup>
import {
  ElButton,
  ElButtonGroup,
  ElCard,
  ElDrawer,
  ElSwitch,
  ElTooltip,
  ElSpace,
  ElNotification,
  ElRow,
  ElCol
} from 'element-plus'
import {
  ZhangZisu,
  LuJinxuan,
  ZhuChengyang,
  ChenChen,
  ShenLechen,
  HuangHanting,
  ZhouShengjie,
  QiuNianchu,
  XiongTongrui,
  ChenLiuchang,
  WuChengyu,
  BaoYihan,
  ZhaiYanqi,
  HuangHaojie,
  ZhangShengze,
  ZhouJirui,
  ZhangZheheng
} from './collaborators'
import { ref, type Component as VueComponent, watch } from 'vue'
import { TeckStackV0, TeckStackV1, TeckStackV2, TeckStackV3, TeckStackV4 } from '@/icons/stacks'
import { useHeaderStore } from '@/stores/header'
import { getUserClass, getClassName } from '@/utils/getClass'
import { useI18n } from 'vue-i18n'
import { pad } from '@/plugins/ua'

const header = useHeaderStore()
// const user = useUserStore()
const { t, locale } = useI18n()

const props = withDefaults(
  defineProps<{
    showRealName?: boolean
  }>(),
  {
    showRealName: true
  }
)

header.setHeader(t('nav.about'))

const collaborators = [
  {
    dispName: '张子苏',
    component: ZhangZisu,
    grade: 201800,
    name: '张子苏'
  },
  {
    dispName: 'neko_moyi',
    component: LuJinxuan,
    grade: 201900,
    name: '卢锦轩'
  },
  {
    dispName: 'Zecyel',
    component: ZhuChengyang,
    grade: 202007,
    name: '朱程炀'
  },
  {
    dispName: 'fpc5719',
    component: ChenChen,
    grade: 202000,
    name: '陈琛'
  },
  {
    dispName: 'So1aric',
    component: ShenLechen,
    grade: 202105,
    name: '沈乐宸'
  },
  {
    dispName: 'solecour',
    component: HuangHanting,
    grade: 202100,
    name: '黄瀚庭'
  },
  {
    dispName: 'dblark',
    component: ZhouShengjie,
    grade: 202100,
    name: '周圣杰'
  },
  {
    dispName: 'qnc',
    component: QiuNianchu,
    grade: 202209,
    name: '邱念楚'
  },
  {
    dispName: '_Kerman',
    component: XiongTongrui,
    grade: 202203,
    name: '熊桐睿'
  },
  {
    dispName: 'clc',
    component: ChenLiuchang,
    grade: 202204,
    name: '陈浏畅'
  },
  {
    dispName: '7086cmd',
    component: WuChengyu,
    grade: 202306,
    name: locale.value === 'zh-CN' ? '吴承宇' : 'Ethan Goh'
  },
  {
    dispName: 'Regir',
    component: BaoYihan,
    grade: 202307,
    name: '鲍屹涵'
  },
  {
    dispName: 'Dignite',
    component: ZhaiYanqi,
    grade: 202312,
    name: '翟彦棋'
  },
  {
    dispName: 'Zhang Zheheng',
    component: ZhangZheheng,
    grade: 202311,
    name: '张哲恒'
  },
  {
    dispName: 'hhj',
    component: HuangHaojie,
    grade: 202205,
    name: '黄浩杰'
  },
  {
    dispName: 'zsz',
    component: ZhangShengze,
    grade: 202200,
    name: '张圣泽'
  },
  {
    dispName: 'zjr',
    component: ZhouJirui,
    grade: 202100,
    name: '周济睿'
  }
] as Array<{ dispName: string; component: VueComponent; grade: number; name: string }>

const currentCollaborator = ref<string>('')
const currentStack = ref<number>()
const openDialog = ref<boolean>(false)
const openStackDialog = ref<boolean>(false)
const curComponent = ref<VueComponent>()

watch(openDialog, () => {
  if (openDialog.value === false) {
    header.setHeader('About')
  }
})

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

const V1List = ['neko_moyi', 'Zecyel', 'fpc5719', 'So1aric', 'solecour', 'dblark', '_Kerman', 'qnc']
const V2List = ['qnc', '_Kerman', 'clc', '7086cmd']
const V4List = ['7086cmd', 'Regir', 'Dignite', 'Zhang Zheheng']

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
    stacks: TeckStackV0,
    repos: ['zhangzisu/zvms-frontend', 'zhangzisu/zvms']
  },
  {
    version: 1,
    stacks: TeckStackV1,
    repos: ['zvms/zvms1-electron', 'zvms/zvms1-frontend', 'zvms/zvms1-backend']
  },
  {
    version: 2,
    stacks: TeckStackV2,
    repos: ['zvms/zvms']
  },
  {
    version: 3,
    stacks: TeckStackV3,
    repos: ['zvmsbackend/zvms3']
  },
  {
    version: 4,
    stacks: TeckStackV4,
    repos: ['zvms/zvms4-frontend', 'zvms/zvms4-backend']
  }
] as Array<{
  version: number
  stacks: { icon: VueComponent; name: string; classify: string }[]
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

const displayGitHubName = ref(props.showRealName)

function openGitHub() {
  if (pad()) {
    ElNotification({
      title: 'Please visit GitHub through other devices.',
      type: 'warning'
    })
  } else {
    window.open('https://github.com/zvms', '_blank')
  }
}
</script>
<template>
  <div class="full px-4">
    <div class="py-4">
      <ElCard shadow="never" class="full">
        <p class="text-xl">{{ t('about.about.project') }}</p>
        <p class="text-l pl-4">
          <span class="large">Z</span>henhai High School <span class="large">V</span>olunteer
          <span class="large">M</span>anagement <span class="large">S</span>ystem
        </p>
        <p>An open source project with a history.</p>
      </ElCard>
    </div>
    <div class="py-4">
      <ElCard shadow="never" class="full">
        <ElRow>
          <ElCol :span="12"
            ><p class="text-xl">{{ t('about.about.developers') }}</p></ElCol
          >
          <ElCol :span="12" style="text-align: right">
            <ElSwitch
              class="pt-4"
              v-if="props.showRealName"
              :active-text="t('about.switch.nick')"
              :inactive-text="t('about.switch.real')"
              v-model="displayGitHubName"
            />
          </ElCol>
        </ElRow>
        <div class="px-8">
          <div class="py-2" v-for="(version, id) in versions" :key="id">
            {{ t('about.repository.version.0') }}
            <ElButton text bg :type="useRandomColor()" @click="useStackDialog(id)" size="small">
              v{{ id }}.x
            </ElButton>
            {{ t('about.repository.version.1') }}
            <ElButtonGroup>
              <ElButton
                text
                bg
                v-for="(collaborator, idx) in version.collaborators"
                :key="idx"
                :type="useRandomColor()"
                @click="useCollaboratorDialog(collaborator)"
                size="small"
              >
                {{
                  displayGitHubName
                    ? collaborator
                    : `${collaborators.find((x) => x.dispName === collaborator)?.name}`
                }}
              </ElButton>
            </ElButtonGroup>
            {{ t('about.repository.version.2') }}
          </div>
          <p class="py-2">
            {{ t('about.repository.thank.mean') }}
            <ElButton
              text
              bg
              :type="useRandomColor()"
              @click="useCollaboratorDialog('hhj')"
              size="small"
              >{{ displayGitHubName ? 'hhj' : '黄浩杰' }}</ElButton
            >
            {{ t('about.repository.thank.icon') }}
            <ElButton
              text
              bg
              :type="useRandomColor()"
              @click="useCollaboratorDialog('zsz')"
              size="small"
              >{{ displayGitHubName ? 'zsz' : '张圣泽' }}</ElButton
            >
            {{ t('about.repository.thank.test') }}
            <ElButton
              text
              bg
              :type="useRandomColor()"
              @click="useCollaboratorDialog('zjr')"
              size="small"
              >{{ displayGitHubName ? 'zjr' : '周济睿' }}</ElButton
            >
            {{ t('about.repository.thank.end') }}
          </p>
        </div>
        We're looking for students in Senior 1 to join the development team.
        Interested parties please contact Ethan in Class 2, Class 6 (Z).
        This is a great fit for someone familiar with Vue.js and Vite.js or Python and FastAPI.
        🦀Rustaceans are also welcome - we plan to rewrite the backend in Rust.
      </ElCard>
    </div>
    <div class="py-4">
      <ElCard shadow="never" class="full">
        <p class="text-xl">{{ t('about.privacy.title') }}</p>
        <p>
          {{ t('about.privacy.content') }}
        </p>
      </ElCard>
    </div>
    <ElDrawer
      v-if="!pad()"
      direction="btt"
      size="75%"
      v-model="openDialog"
      center
      :title="`About ${currentCollaborator}${
        ' in ' +
        getClassName(
          getUserClass(
            (collaborators.find((x) => x.dispName === currentCollaborator)?.grade as number) * 100
          )
        )
      }`"
    >
      <Component class="px-8 text-xl" :is="curComponent" />
    </ElDrawer>
    <ElDrawer
      v-if="!pad()"
      direction="btt"
      size="40%"
      v-model="openStackDialog"
      center
      :title="'About ZVMS v' + currentStack + '.x'"
    >
      Technique Stacks:
      <ElButtonGroup>
        <ElTooltip
          v-for="(stack, idx) in stacks[currentStack as number].stacks"
          :key="idx"
          :content="stack.name"
          effect="light"
        >
          <ElButton :icon="stack.icon" :type="useRandomColor()" circle text bg />
        </ElTooltip>
      </ElButtonGroup>
      <br /><br />
      Repository in GitHub:
      <ElSpace>
        <img
          alt="open github"
          @click="openGitHub"
          v-for="(name, idx) in stacks[currentStack as number].repos"
          :key="idx"
          :src="`https://github-readme-stats.vercel.app/api/pin/?username=${
            name.split('/')[0]
          }&repo=${name.split('/')[1]}`"
        />
      </ElSpace>
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
