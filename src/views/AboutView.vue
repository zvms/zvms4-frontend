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
    grade: 201800,
    name: '张子苏'
  },
  {
    dispName: 'neko_moyi',
    grade: 201900,
    name: '卢锦轩'
  },
  {
    dispName: 'Zecyel',
    grade: 202007,
    name: '朱程炀'
  },
  {
    dispName: 'fpc5719',
    grade: 202000,
    name: '陈琛'
  },
  {
    dispName: 'So1aric',
    grade: 202105,
    name: '沈乐宸'
  },
  {
    dispName: 'solecour',
    grade: 202100,
    name: '黄瀚庭'
  },
  {
    dispName: 'dblark',
    grade: 202100,
    name: '周圣杰'
  },
  {
    dispName: 'qnc',
    grade: 202209,
    name: '邱念楚'
  },
  {
    dispName: '_Kerman',
    grade: 202203,
    name: '熊桐睿'
  },
  {
    dispName: 'clc',
    grade: 202204,
    name: '陈浏畅'
  },
  {
    dispName: '7086cmd',
    grade: 202306,
    name: '吴承宇'
  },
  {
    dispName: 'Regir',
    grade: 202307,
    name: '鲍屹涵'
  },
  {
    dispName: 'Dignite',
    grade: 202312,
    name: '翟彦棋'
  },
  {
    dispName: 'Zhang Zheheng',
    grade: 202311,
    name: '张哲恒'
  },
  {
    dispName: 'hhj',
    grade: 202205,
    name: '黄浩杰'
  },
  {
    dispName: 'zsz',
    grade: 202200,
    name: '张圣泽'
  },
  {
    dispName: 'zjr',
    grade: 202100,
    name: '周济睿'
  }
] as Array<{ dispName: string; grade: number; name: string }>


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

const displayGitHubName = ref(props.showRealName)

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
            <ElButton text bg size="small">
              v{{ id }}.x
            </ElButton>
            {{ t('about.repository.version.1') }}
            <ElButtonGroup>
              <ElButton
                text
                bg
                v-for="(collaborator, idx) in version.collaborators"
                :key="idx"
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
              size="small"
              >{{ displayGitHubName ? 'hhj' : '黄浩杰' }}</ElButton
            >
            {{ t('about.repository.thank.icon') }}
            <ElButton
              text
              bg
              size="small"
              >{{ displayGitHubName ? 'zsz' : '张圣泽' }}</ElButton
            >
            {{ t('about.repository.thank.test') }}
            <ElButton
              text
              bg
              size="small"
              >{{ displayGitHubName ? 'zjr' : '周济睿' }}</ElButton
            >
            {{ t('about.repository.thank.end') }}
          </p>
        </div>
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
