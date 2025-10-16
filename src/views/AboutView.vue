<script setup lang="ts">
import { ElResult, ElButton, ElCard } from 'element-plus'
import { useHeaderStore } from '@/stores/header'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const header = useHeaderStore()
header.setHeader(t('nav.about'))
</script>

<template>
  <div class="p-4">
    <ElCard shadow="never">
      <ElResult
        icon="info"
        title="ZVMS 4"
        sub-title="v4.1.7.20251016"
      >
        <template #icon>
            <img src="/favicon.png" alt="logo" style="width: 128px; height: 128px; border-radius: .75rem;"/>
        </template>
        <template #extra>
          <!--<ElButton text bg type="primary" disabled>{{
            '检查更新'
          }}</ElButton>-->
          <div style="opacity: .5;">
            &copy; 2018-2025 | {{ t('about.footer') }} | {{ t('about.license') }}
          </div>
        </template>
      </ElResult>
    </ElCard>
  </div>
</template>

<style scoped></style>
