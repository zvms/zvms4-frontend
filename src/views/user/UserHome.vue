<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import {
  ElDescriptions,
  ElDescriptionsItem,
  ElButton,
  ElCard,
  ElSkeleton
} from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import dayjs from '@/plugins/dayjs'
import { ref } from 'vue'
import { useHeaderStore } from '@/stores/header'
import { useI18n } from 'vue-i18n'
import { reactive, watch } from 'vue'
import ZUserGroup from '@/components/tags/ZUserGroup.vue'
import ZUserTimeJudge from '@/components/activity/ZUserTimeJudge.vue'
import { useWindowSize } from '@vueuse/core'
import { useRouter } from 'vue-router'

const header = useHeaderStore()
const user = useUserStore()
const { t } = useI18n()
const { width, height } = useWindowSize()
const router = useRouter()

if (!user.isLogin) {
  router.replace('/user/login')
}

header.setHeader(t('nav.home'))

const nowTime = dayjs().hour()
const greeting = ref(nowTime < 12 ? 'morning' : nowTime < 18 ? 'afternoon' : 'evening')
const loading = ref(false)

const time = reactive({
  socialPractice: user.time.socialPractice,
  onCampus: user.time.onCampus,
  offCampus: user.time.offCampus
})

async function refreshUser() {
  loading.value = true
  await user.refreshUser()
  loading.value = false
}

watch(
  () => user.isLogin,
  (v) => {
    if (v) {
      return
    }
    router.replace('/user/login')
  }
)
</script>

<template>
  <div class="px-20 fill" style="width: 100%" v-if="user.isLogin">
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
            <!--<ElDivider direction="vertical" />
            <ElButton type="info" :icon="MaterialSymbolsDescriptionOutline" text bg circle />-->
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
            管理班级
          </ElButton>
        </div>
      </ElCard>
    </div>
    <div :class="['py-4', user.shouldResetPassword ? 'z-blur' : '']">
      <ZUserTimeJudge
        :user="user._id"
        :on-campus="user.time.onCampus"
        :off-campus="time.offCampus"
        :social-practice="time.socialPractice"
        discount
      />
    </div>
  </div>
</template>

<style scoped>
.fill {
  width: 100%;
}
.z-blur {
  filter: blur(2rem);
}
</style>
