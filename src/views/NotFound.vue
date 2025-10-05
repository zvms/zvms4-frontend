<script setup lang="ts">
import { ElResult, ElButton, ElCard } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="p-4">
    <ElCard shadow="never">
      <ElResult
        status="404"
        icon="error"
        :title="t('nav.pages.NotFound.title')"
        :sub-title="t('nav.pages.NotFound.description')"
      >
        <template #extra>
          <ElButton text bg type="primary" @click="$router.push('/')">{{
            t('nav.pages.NotFound.action.back')
          }}</ElButton>
        </template>
      </ElResult>
    </ElCard>
  </div>
</template>

<style scoped></style>
