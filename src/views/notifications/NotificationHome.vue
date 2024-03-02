<script lang="ts" setup>
import ZNotificationList from '@/components/notifications/ZNotificationList.vue'
import { ElRow, ElCol, ElButton } from 'element-plus'
import { Refresh, Plus } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const { t } = useI18n()

const refresh = ref(0)
</script>

<template>
  <div class="px-8 py-6">
    <ElRow>
      <ElCol :span="12" class="text-3xl mb-5"> {{ t('notification.home.title') }} </ElCol>
      <ElCol :span="12" style="text-align: right">
        <ElButton
          type="success"
          text
          bg
          circle
          class="p-1"
          :icon="Plus"
          @click="router.push('/notifications/create')"
        />
        <ElButton @click="refresh += 1" type="primary" text bg circle class="p-1" :icon="Refresh" />
      </ElCol>
    </ElRow>
    <div class="ml-4 opacity-50">{{ t('notification.home.subtitle') }}</div>
    <ZNotificationList :refresh="refresh" />
  </div>
</template>
