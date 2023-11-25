<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import {
  ElCol,
  ElDescriptions,
  ElDescriptionsItem,
  ElRow,
  ElButton,
  ElDivider,
  ElCard,
  ElSwitch
} from 'element-plus'
import MaterialSymbolsDescriptionOutline from '@/icons/MaterialSymbolsDescriptionOutline.vue'
import { Refresh } from '@element-plus/icons-vue'
import TablerSum from '@/icons/TablerSum.vue'
import dayjs from 'dayjs'
import { ref } from 'vue'
import ZTimeJudge from '@/components/activity/ZTimeJudge.vue'
import { useHeaderStore } from '@/stores/header'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { reactive, watch } from 'vue'
import ZUserPosition from '@/components/tags/ZUserPosition.vue'

const { width, height } = useWindowSize()
const header = useHeaderStore()
const user = useUserStore()
const { t } = useI18n()

header.setHeader(t('nav.home'))

const nowTime = dayjs().hour()
const greeting = ref(nowTime < 12 ? 'morning' : nowTime < 18 ? 'afternoon' : 'evening')

const useTransform = ref(true)

console.log(user)

function transform() {
  if (user.time.onCampus <= 30) return 0
  const result = Math.floor((user.time.onCampus - 30) / 3)
  return result > 6 ? 6 : result
}

const time = reactive({
  largeScale: 0,
  onCampus: 0,
  offCampus: 0
})

refreshSumTime()

function refreshSumTime() {
  user.getUserActivityTime().then(() => {
    time.largeScale = user.time.largeScale
    time.onCampus = user.time.onCampus
    time.offCampus = user.time.offCampus
    if (useTransform.value) {
      time.offCampus += transform()
    }
  })
}

watch(useTransform, () => {
  refreshSumTime()
})
</script>

<template>
  <div class="px-20 fill" style="width: 100%">
    <p class="text-2xl py-8">
      {{ t('home.greeting', { greet: t('home.greetings.' + greeting), name: user.name }) }}
    </p>
    <div class="py-4">
      <ElCard shadow="hover">
        <ElDescriptions class="fill" border>
          <template #title>
            <p class="text-xl">{{ t('home.panels.information.title') }}</p>
          </template>
          <template #extra>
            <ElButton type="success" :icon="Refresh" text bg circle @click="user.refreshUser" />
            <ElDivider direction="vertical" />
            <ElButton type="info" :icon="MaterialSymbolsDescriptionOutline" text bg circle />
          </template>
          <ElDescriptionsItem :label="t('home.labels.name')">{{ user.name }}</ElDescriptionsItem>
          <ElDescriptionsItem :label="t('home.labels.number')">{{ user.id }}</ElDescriptionsItem>
          <ElDescriptionsItem :label="t('home.labels.class')">{{ user.class }}</ElDescriptionsItem>
          <ElDescriptionsItem :label="t('home.labels.identify')">
            <ZUserPosition :position="user.position" group />
          </ElDescriptionsItem>
        </ElDescriptions>
      </ElCard>
    </div>
    <div class="py-4">
      <ElCard shadow="hover">
        <ElRow>
          <ElCol :span="12">
            <p class="text-xl">{{ t('home.panels.time.title') }}</p>
          </ElCol>
          <ElCol :span="12" style="text-align: right">
            <ElButton
              type="success"
              :icon="Refresh"
              text
              bg
              circle
              @click="user.getUserActivityTime"
            />
            <ElDivider direction="vertical" />
            <ElButton type="info" :icon="TablerSum" text bg circle />
          </ElCol>
        </ElRow>
        <ElRow class="fill py-4 statistic">
          <ElCol v-if="width > height" :span="2" />
          <ElCol :span="width < height ? 10 : 4">
            <ZTimeJudge type="large-scale" :realTime="user.time.largeScale" />
            <ElDivider v-if="width < height" />
          </ElCol>
          <ElCol :span="2"><ElDivider direction="vertical" class="height-full" /></ElCol>
          <ElCol :span="width < height ? 10 : 4">
            <ZTimeJudge type="on-campus" :realTime="user.time.onCampus" />
            <ElDivider v-if="width < height" />
          </ElCol>
          <ElCol v-if="width > height" :span="1"
            ><ElDivider direction="vertical" class="height-full"
          /></ElCol>
          <ElCol :span="width < height ? 10 : 4">
            <ZTimeJudge
              type="off-campus"
              :realTime="user.time.offCampus + (useTransform ? transform() : 0)"
            />
          </ElCol>
          <ElCol :span="2"><ElDivider direction="vertical" class="height-full" /></ElCol>
          <ElCol v-if="width < height" :span="1" />
          <ElCol :span="width < height ? 8 : 4">
            {{ t('home.panels.time.discount') }}<br />
            <ElSwitch v-model="useTransform" />
          </ElCol>
          <ElCol v-if="width > height" :span="2" />
        </ElRow>
      </ElCard>
    </div>
  </div>
</template>

<style scoped>
.fill {
  width: 100%;
}

.height-full {
  height: 100%;
}

.subtitle {
  position: relative;
  top: 0;
  transform: translateY(-10%);
}

.statistic {
  text-align: center;
}
</style>
