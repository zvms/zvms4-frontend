<script lang="ts" setup>
import ZNotificationList from '@/components/notifications/ZNotificationList.vue'
import { ElRow, ElCol, ElButton } from 'element-plus'
import { Refresh, Plus, ArrowRight } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()

const { t } = useI18n()

const user = useUserStore()

const mode = ref<'global' | 'personal'>('personal')

const refresh = ref(0)

const toggleMode = () => {
  if (mode.value === 'global') mode.value = 'personal'
  else mode.value = 'global'
}
</script>

<template>
  <div class="px-8 py-6">
    <ElRow>
      <ElCol :span="12" class="text-3xl mb-5"> {{ t('notification.home.title') }} </ElCol>
      <ElCol :span="12" style="text-align: right">
        <ElButton
          v-if="
            user.position.includes('admin') ||
            user.position.includes('department') ||
            user.position.includes('auditor')
          "
          type="success"
          text
          bg
          round
          class="p-1 pr-3"
          :icon="ArrowRight"
          @click="
            user.position.includes('admin') ||
            user.position.includes('department') ||
            user.position.includes('auditor')
              ? toggleMode()
              : undefined
          "
        >
          {{ t('notification.home.' + mode) }}
        </ElButton>
        <ElButton
          type="success"
          text
          bg
          circle
          class="p-1"
          :icon="Plus"
          @click="router.push('/notifications/create')"
          v-if="
            user.position.includes('admin') ||
            user.position.includes('department') ||
            user.position.includes('auditor')
          "
        />
        <ElButton @click="refresh += 1" type="primary" text bg circle class="p-1" :icon="Refresh" />
      </ElCol>
    </ElRow>
    <div class="ml-4 opacity-50">{{ t('notification.home.subtitle') }}</div>
    <ZNotificationList :refresh="refresh" :mode="mode" />
  </div>
</template>
