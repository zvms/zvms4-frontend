<script lang="ts" setup>
import {
  ElButton,
  ElButtonGroup,
  ElCard,
  ElRow,
  ElCol
} from 'element-plus'
import { ref } from 'vue'
import { useHeaderStore } from '@/stores/header'
import { useI18n } from 'vue-i18n'
import { pad } from '@/plugins/ua.ts'

const header = useHeaderStore()
const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    showRealName?: boolean
  }>(),
  {
    showRealName: !pad()
  }
)

header.setHeader(t('nav.about'))

const collaborators = [
  {
    display: '张子苏',
    grade: 201800,
    name: '张子苏'
  },
  {
    display: 'neko_moyi',
    grade: 201900,
    name: '卢锦轩'
  },
  {
    display: 'Zecyel',
    grade: 202007,
    name: '朱程炀'
  },
  {
    display: 'fpc5719',
    grade: 202000,
    name: '陈琛'
  },
  {
    display: 'So1aric',
    grade: 202105,
    name: '沈乐宸'
  },
  {
    display: 'solecour',
    grade: 202100,
    name: '黄瀚庭'
  },
  {
    display: 'dblark',
    grade: 202100,
    name: '周圣杰'
  },
  {
    display: 'qnc',
    grade: 202209,
    name: '邱念楚'
  },
  {
    display: '_Kerman',
    grade: 202203,
    name: '熊桐睿'
  },
  {
    display: 'clc',
    grade: 202204,
    name: '陈浏畅'
  },
  {
    display: '7086cmd',
    grade: 202306,
    name: '吴承宇'
  },
  {
    display: 'Regir',
    grade: 202307,
    name: '鲍屹涵'
  },
  {
    display: 'Dignite',
    grade: 202312,
    name: '翟彦棋'
  },
  {
    display: 'Zhang Zheheng',
    grade: 202311,
    name: '张哲恒'
  },
  {
    display: 'hhj',
    grade: 202205,
    name: '黄浩杰'
  },
  {
    display: 'zsz',
    grade: 202200,
    name: '张圣泽'
  },
  {
    display: 'zjr',
    grade: 202100,
    name: '周济睿'
  },
  {
    display: '2008-LXL',
    grade: 202407,
    name: '李心磊'
  },
  {
    display: 'Zcraft_',
    grade: 202410,
    name: '章正杰'
  },
  {
    display: 'ljj',
    grade: 202400,
    name: '陆蒋俊'
  }
] as Array<{ display: string; grade: number; name: string }>


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

const v4ExtraMaintainers = ['2008-LXL', 'Zcraft_', 'ljj']

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
          <span class="large px-2">
            {{ t('about.alternative') }}
          </span>
        </p>
        <p>{{ t('about.bio') }}</p>
      </ElCard>
    </div>
    <div class="py-4">
      <ElCard shadow="never" class="full">
        <ElRow>
          <ElCol :span="12"
            ><p class="text-xl">{{ t('about.about.developers') }}</p></ElCol
          >
          <ElCol :span="12" style="text-align: right">
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
                    : `${collaborators.find((x) => x.display === collaborator)?.name}`
                }}
              </ElButton>
            </ElButtonGroup>
            {{ t('about.repository.version.2') }}
          </div>
          <p class="pb-2">
            {{ t('about.repository.v4More.0') }}
            <ElButtonGroup>
              <ElButton
                text
                bg
                v-for="(collaborator, idx) in v4ExtraMaintainers"
                :key="idx"
                size="small"
              >
                {{
                  displayGitHubName
                    ? collaborator
                    : `${collaborators.find((x) => x.display === collaborator)?.name}`
                }}
              </ElButton>
              {{ t('about.repository.v4More.1') }}
            </ElButtonGroup>
          </p>
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
