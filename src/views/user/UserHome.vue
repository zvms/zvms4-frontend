<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import {
  ElDescriptions,
  ElDescriptionsItem,
  ElButton,
  ElDivider,
  ElCard,
  ElSkeleton
} from 'element-plus'
import MaterialSymbolsDescriptionOutline from '@/icons/MaterialSymbolsDescriptionOutline.vue'
import { Refresh } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { ref } from 'vue'
import { useHeaderStore } from '@/stores/header'
import { useI18n } from 'vue-i18n'
import { reactive } from 'vue'
import type { UserActivityTimeSums } from '@zvms/zvms4-types'
import ZUserGroup from '@/components/tags/ZUserGroup.vue'
import ZUserTimeJudge from '@/components/activity/ZUserTimeJudge.vue'
import ZNotificationList from '@/components/notifications/ZNotificationList.vue'
import { useWindowSize } from '@vueuse/core'

const header = useHeaderStore()
const user = useUserStore()
const { t } = useI18n()
const { width, height } = useWindowSize()

header.setHeader(t('nav.home'))

const nowTime = dayjs().hour()
const greeting = ref(nowTime < 12 ? 'morning' : nowTime < 18 ? 'afternoon' : 'evening')
const loading = ref(false)

const time = reactive<Omit<UserActivityTimeSums, 'trophy'>>({
  socialPractice: user.time.socialPractice,
  onCampus: user.time.onCampus,
  offCampus: user.time.offCampus
})

async function refreshUser() {
  loading.value = true
  await user.refreshUser()
  loading.value = false
}
</script>

<template>
  <div class="px-20 fill" style="width: 100%">
    <p class="text-2xl py-8">
      {{ t('home.greeting', { greet: t('home.greetings.' + greeting), name: user.name }) }}
    </p>
    <p>
      自本周起至期中考试结束，暂停义工审计，相关义工时间将会在期中考试结束后进行审计发放。
      <br />
      From this week to the end of the midterm exam, the volunteer audit will be suspended, and the
      relevant volunteer time will be audited and distributed after the midterm exam.
      <br />
      距离期中考试只剩
      <span class="text-2xl">
        {{ dayjs('2024-04-22').isAfter(dayjs()) ? dayjs('2024-04-22').date() - dayjs().date() : 0 }}
      </span>
      天。
      <br />
      There are only
      <span class="text-2xl">{{ dayjs('2024-04-22 00:00:00').date() - dayjs().date() }}</span>
      days left until the midterm exam. (2024-04-22)
    </p>
    <div class="py-4">
      <ElCard shadow="hover">
        <ElDescriptions class="fill" border :column="width < height * 1.2 ? 2 : 3">
          <template #title>
            <p class="text-xl">{{ t('home.panels.information.title') }}</p>
          </template>
          <template #extra>
            <ElButton
              type="success"
              :icon="Refresh"
              text
              bg
              circle
              @click="refreshUser"
              :disabled="loading"
            />
            <ElDivider direction="vertical" />
            <ElButton type="info" :icon="MaterialSymbolsDescriptionOutline" text bg circle />
          </template>
          <ElSkeleton v-if="loading" :loading="true" :rows="3" />
          <ElDescriptionsItem v-if="!loading" :label="t('home.labels.name')">{{
            user.name
          }}</ElDescriptionsItem>
          <ElDescriptionsItem v-if="!loading" :label="t('home.labels.number')">{{
            user.id
          }}</ElDescriptionsItem>
          <ElDescriptionsItem v-if="!loading" :label="t('home.labels.identify')">
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
      <ZUserTimeJudge
        :user="user._id"
        :on-campus="user.time.onCampus"
        :off-campus="time.offCampus"
        :social-practice="time.socialPractice"
      />
    </div>
    <div class="pt-4 pb-8">
      <ElCard shadow="hover">
        <ZNotificationList less mode="personal" />
      </ElCard>
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
