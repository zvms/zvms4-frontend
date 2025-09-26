<script setup lang="ts">
import { ElResult, ElButton, ElCard } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="p-4">
    <ElCard shadow="never">
      <ElResult
        icon="info"
        title="ZVMS 4"
        sub-title="v4.1.1.20250926"
      >
        <template #extra>
          <ElButton text bg type="primary" disabled>{{
            '检查更新'
          }}</ElButton>
        </template>
      </ElResult>
    </ElCard>
  </div>
</template>

<style scoped></style>
