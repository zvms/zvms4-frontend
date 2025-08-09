<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import type { ActivityMember } from '@/../types/activity.v2'
import { ElSegmented, ElProgress, ElStatistic, ElCard, ElDivider } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { ZActivityMemberTimeJudge } from '.'
import api from '@/api'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    id: string
  }>(),
  {
    id: ''
  }
)

const { id } = toRefs(props)

const mode = ref<ActivityMember['mode']>('on-campus')
const loading = ref(false)

const data = ref<{
  time: number
  percentile: {
    grade: number
    group: number
    completion: number
  }
}>({
  time: 0,
  percentile: {
    grade: 0,
    group: 0,
    completion: 0
  }
})

function getTargetsOfDuration() {
  return {
    'on-campus': 25,
    'off-campus': 15,
    'social-practice': 18
  }
}

async function refresh() {
  if (!id.value) return
  loading.value = true
  const percentiles = await api.user.time.percentile(id.value)
  console.log(percentiles)
  const categ = percentiles[mode.value]
  console.log(categ)
  data.value.percentile.grade = categ.grade
  data.value.percentile.group = categ.group
  data.value.time = categ.value
  data.value.percentile.completion = Math.min(
    mode?.value ? Math.floor((data.value.time / getTargetsOfDuration()[mode.value]) * 100) : 0,
    100
  )
  loading.value = false
}

refresh()

watch(
  mode,
  () => {
    refresh()
  },
  { immediate: true }
)

const speech_skills = {
  '0': "You have not recorded any time in this mode yet. If you didn't record any time, you will be graded as 0 in your assessment and will affect your overall grade.",
  '1': "You have recorded some time in this mode, but it doesn't meet the standard yet and requires more effort.",
  '2': 'You have recorded a good amount of time in this mode, yet it is still below the target and you need to keep pushing.',
  '3': 'You are reaching the target in this mode, keep up the good work!',
  '4': 'You have reached the target in this mode, great job! You are welcomed to continue your efforts!'
} as Record<string, string>

function getDescOfPercentile(range: 'grade' | 'group', percentile: number) {
  if (percentile !== 100) return `In your ${range}, you are in the ${percentile}th percentile, which means you are better than ${percentile}% of your peers, yet there are still ${100 - percentile}% of your peers who are better than you. Keep up the good work!`
  else return `You've met the requirements in this mode, so we don't have any percentile data for you to avoid exaggerated data.`
}

function getPercentileProgressColor(percentile: number) {
  if (percentile === 100) return 'success'
  else if (percentile >= 60) return ''
  else if (percentile >= 30) return 'warning'
  else return 'exception'
}

watch(id, () => {
  refresh()
}, { immediate: true })
</script>

<template>
  <div class="mx-12 sm:mx-6 xs:mx-4" v-loading="loading">
    <div class="text-right">
      <ElSegmented
        v-model="mode"
        :options="['on-campus', 'off-campus', 'social-practice']"
        class="mb-4"
      >
        <template #default="option">
          {{ t('activity.mode.' + option.item + '.name') }}
        </template>
      </ElSegmented>
    </div>
    <p class="text-left text-xl mb-4 ml-2">
      {{ t('activity.mode.' + mode + '.name') }}
    </p>
    <ElRow>
      <ElCol :span="7" :sm="11" :xs="24" class="m-2 text-center">
        <ElCard shadow="hover" class="text-left">
          <p class="text-left text-sm text-gray-600 dark:text-gray-400">
            Your total time in this recording mode:
          </p>
          <ElDivider />
          <ZActivityMemberTimeJudge class="ml-2" :type="mode" :real-time="data.time" />
          <ElDivider />
          <ElRow>
            <ElCol :span="8">
              <ElProgress
                type="dashboard"
                :percentage="data.percentile.completion"
                :status="getPercentileProgressColor(data.percentile.completion)"
              >
                <p class="text-2xl">{{ data.percentile.completion }}%</p>
                <p v-if="data.time < getTargetsOfDuration()[mode]" class="text-sm">
                  {{ data.time }} h / {{ getTargetsOfDuration()[mode] }} h
                </p>
                <p v-else>{{ data.time }} h</p>
              </ElProgress>
            </ElCol>
            <ElCol :span="16" class="text-left">
              {{ speech_skills[Math.floor(data.percentile.grade / 25).toString()] }}
            </ElCol>
          </ElRow>
        </ElCard>
      </ElCol>
      <ElCol :span="7" :sm="11" :xs="24" class="m-2 text-center">
        <ElCard shadow="hover" class="text-left">
          <p class="text-left text-sm text-gray-600 dark:text-gray-400">
            Your percentile in your grade in this recording mode:
          </p>
          <ElDivider />
          <ElStatistic :value="data.percentile.grade" title="Your Grade Percentile" />
          <ElDivider />
          <ElRow>
            <ElCol :span="8">
              <ElProgress
                type="dashboard"
                :percentage="data.percentile.grade"
                :status="getPercentileProgressColor(data.percentile.grade)"
              >
                <p class="text-2xl">{{ data.percentile.grade }}%</p>
              </ElProgress>
            </ElCol>
            <ElCol :span="16" class="text-left">
              {{ getDescOfPercentile('grade', data.percentile.grade) }}
            </ElCol>
          </ElRow>
        </ElCard>
      </ElCol>
      <ElCol :span="7" :sm="11" :xs="24" class="m-2 text-center">
        <ElCard shadow="hover" class="text-left">
          <p class="text-left text-sm text-gray-600 dark:text-gray-400">
            Your percentile in your group in this recording mode:
          </p>
          <ElDivider />
          <ElStatistic :value="data.percentile.group" title="Your Group Percentile" />
          <ElDivider />
          <ElRow>
            <ElCol :span="8">
              <ElProgress
                type="dashboard"
                :percentage="data.percentile.group"
                :status="getPercentileProgressColor(data.percentile.group)"
              >
                <p class="text-2xl">{{ data.percentile.group }}%</p>
              </ElProgress>
            </ElCol>
            <ElCol :span="16" class="text-left">
              {{ getDescOfPercentile('group', data.percentile.group) }}
            </ElCol>
          </ElRow>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>
