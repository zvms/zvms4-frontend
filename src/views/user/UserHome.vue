<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import {
  ElDescriptions,
  ElDescriptionsItem,
  ElButton,
  ElDivider,
  ElCard,
} from 'element-plus'
import MaterialSymbolsDescriptionOutline from '@/icons/MaterialSymbolsDescriptionOutline.vue'
import { Refresh } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { ref } from 'vue'
import { useHeaderStore } from '@/stores/header'
import { useI18n } from 'vue-i18n'
import { reactive, watch } from 'vue'
import type { UserActivityTimeSums } from '@zvms/zvms4-types'
import ZUserGroup from '@/components/tags/ZUserGroup.vue'
import ZUserTimeJudge from '@/components/activity/ZUserTimeJudge.vue'

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

const time = reactive<Omit<UserActivityTimeSums, 'trophy'>>({
  socialPractice: 0,
  onCampus: 0,
  offCampus: 0
})

refreshSumTime()

function refreshSumTime() {
  user.getUserActivityTime().then(() => {
    time.socialPractice = user.time.socialPractice
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
          <ElDescriptionsItem :label="t('home.labels.identify')">
            <ZUserGroup
              v-for="group in user.groups"
              :key="group"
              class="px-1"
              :group="group"
              :grouping="false"
            />
          </ElDescriptionsItem>
        </ElDescriptions>
      </ElCard>
    </div>
    <div class="py-4">
      <ZUserTimeJudge :user="user._id" />
    </div>
  </div>
</template>

<style scoped>
.fill {
  width: 100%;
}

.subtitle {
  position: relative;
  top: 0;
  transform: translateY(-10%);
}

</style>
