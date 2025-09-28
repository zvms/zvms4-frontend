<script setup lang="ts">
import { ref, toRefs, reactive, watch } from 'vue'
import {
  ElCard,
  ElRow,
  ElCol,
  ElButton,
  ElDivider,
  ElSwitch,
  ElSpace,
  ElResult,
  ElTooltip,
  ElSkeleton,
  ElDialog
} from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import { ZActivityMemberTimeJudge } from '..'
import { Refresh } from '@element-plus/icons-vue'
import { TablerSum } from '@/icons'
import api from '@/api'
import { Certificate, TableReport } from '@icon-park/vue-next'
import { pad } from '@/plugins/ua.ts'
import ZDetailedAnalysis from './ZDetailedAnalysis.vue'

const { width, height } = useWindowSize()
const userStore = useUserStore()
const { t } = useI18n()
const loading = ref(false)

const props = withDefaults(
  defineProps<{
    user: string
    onCampus?: number
    offCampus?: number
    socialPractice?: number
    discount?: boolean
  }>(),
  {
    user: '',
    onCampus: 0,
    offCampus: 0,
    socialPractice: 0,
    discount: false
  }
)

const { user, onCampus, offCampus, socialPractice, discount } = toRefs(props)

const base = reactive({
  onCampus: 0,
  offCampus: 0,
  socialPractice: 0
})

const exceed = ref(discount.value)

function getDiscount(on: number, exceed: number, rate: number) {
  if (on <= exceed) return 0
  const result = Math.round((on - exceed) / rate)
  return result > 6 ? 6 : result
}

base.onCampus = onCampus.value
base.offCampus = offCampus.value
base.socialPractice = socialPractice.value

async function getTime() {
  loading.value = true
  const result = await api.user.time.read(user.value)
  console.log(result)
  if (result) {
    base.onCampus = result['on-campus']
    base.offCampus = result['off-campus']
    base.socialPractice = result['social-practice']
    off.value = base.offCampus + (exceed.value ? getDiscount(base.onCampus, 25, 3) : 0)
    on.value = base.onCampus + (exceed.value ? getDiscount(base.offCampus, 15, 2) : 0)
    if (user.value === userStore._id) {
      userStore.setTime(
        result as unknown as {
          onCampus: number
          offCampus: number
          socialPractice: number
        }
      )
    }
  }
  loading.value = false
}

getTime()

const off = ref(base.offCampus)
const on = ref(base.onCampus)

watch(
  exceed,
  () => {
    off.value = base.offCampus + (exceed.value ? getDiscount(base.onCampus, 25, 3) : 0)
    on.value = base.onCampus + (exceed.value ? getDiscount(base.offCampus, 15, 2) : 0)
  },
  { immediate: true }
)

const reportPage = ref(false)
</script>

<template>
  <div>
    <!--<ElDialog fullscreen title="User Activity Time Report" v-model="reportPage">
      <ZDetailedAnalysis :id="user" mode="on-campus" />
    </ElDialog>-->
    <ElCard
      shadow="hover"
      v-if="
        userStore.position.includes('admin') ||
        userStore.position.includes('department') ||
        userStore._id === user
      "
    >
      <ElRow>
        <ElCol :span="12">
          <p class="text-lg">{{ t('home.panels.time.title') }}</p>
        </ElCol>
        <ElCol :span="12" style="text-align: right">
          <!--<ElButton :icon="TableReport" text bg circle @click="reportPage = true"> </ElButton>
          <ElDivider v-if="user === userStore._id" direction="vertical" />-->
          <ElButton
            type="success"
            :disabled="loading"
            :icon="Refresh"
            text
            bg
            circle
            @click="getTime"
          />
          <!--<ElDivider direction="vertical" />
          <ElButton type="info" :icon="TablerSum" text bg circle />-->
        </ElCol>
      </ElRow>
      <ElRow class="fill py-2 statistic" v-if="!loading">
        <ElCol v-if="width > height" :span="2" />
        <ElCol :span="width < height ? 10 : 4">
          <ZActivityMemberTimeJudge type="on-campus" :realTime="on" />
          <ElDivider v-if="width < height" />
        </ElCol>
        <ElCol :span="2">
          <ElDivider direction="vertical" class="height-full" />
        </ElCol>
        <ElCol :span="width < height ? 10 : 4">
          <ZActivityMemberTimeJudge type="off-campus" :realTime="off" />
          <ElDivider v-if="width < height" />
        </ElCol>
        <ElCol v-if="width > height" :span="1">
          <ElDivider direction="vertical" class="height-full" />
        </ElCol>
        <ElCol :span="width < height ? 10 : 4">
          <ZActivityMemberTimeJudge type="social-practice" :realTime="base.socialPractice" />
        </ElCol>
        <ElCol :span="2">
          <ElDivider direction="vertical" class="height-full" />
        </ElCol>
        <ElCol v-if="width < height" :span="1" />
        <ElCol :span="width < height ? 8 : 4">
          <ElSpace direction="vertical">
            <span>{{ t('home.panels.time.discount') }}</span>
            <ElSwitch v-model="exceed" />
          </ElSpace>
        </ElCol>
        <ElCol v-if="width > height" :span="2" />
      </ElRow>
      <ElSkeleton v-else :throttle="200" :rows="4" animated />
    </ElCard>
    <ElResult v-else type="error"></ElResult>
  </div>
</template>

<style scoped>
.statistic {
  text-align: center;
}

.height-full {
  height: 100%;
}
</style>
