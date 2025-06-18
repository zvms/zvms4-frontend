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
import dayjs from '@/plugins/dayjs'
import { ref } from 'vue'
import { useHeaderStore } from '@/stores/header'
import { useI18n } from 'vue-i18n'
import { reactive } from 'vue'
import type { UserActivityTimeSums } from '@/../types'
import ZUserGroup from '@/components/tags/ZUserGroup.vue'
import ZUserTimeJudge from '@/components/activity/ZUserTimeJudge.vue'
import { useWindowSize } from '@vueuse/core'
import { ZActivityList } from '@/components'

const header = useHeaderStore()
const user = useUserStore()
const { t, locale } = useI18n()
const { width, height } = useWindowSize()

header.setHeader(t('nav.home'))

const nowTime = dayjs().hour()
const greeting = ref(nowTime < 12 ? 'morning' : nowTime < 18 ? 'afternoon' : 'evening')
const loading = ref(false)

const time = reactive<UserActivityTimeSums>({
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
        <div v-if="user.position.includes('secretary')" class="py-4">
          <ElButton text bg class="w-full" @click="$router.push('/group/' + user.class_id)">
            {{ locale === 'en-US' ? 'Manage my class' : '管理班级' }}
          </ElButton>
        </div>
      </ElCard>
    </div>
    <div class="py-4">
      <ZUserTimeJudge
        :user="user._id"
        :on-campus="user.time.onCampus"
        :off-campus="time.offCampus"
        :social-practice="time.socialPractice"
        discount
      />
    </div>
    <div v-if="user.position.includes('student') && user.position.length === 1" class="py-4">
      <ZActivityList role="mine">
        <template #title>
          {{ t('activity.view.panels.mine.name') }}
        </template>
      </ZActivityList>
    </div>
  </div>
</template>

<style scoped>
.fill {
  width: 100%;
}
</style>
