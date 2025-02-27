<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ElResult, ElCard } from 'element-plus'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ActivityType, CreateActivityType } from '@/../types'
import { ZActivityCreate, ZActivityMerge, ZUploadFile } from '@/components'

const route = useRoute()
const { t } = useI18n()

const type = route.params?.type as CreateActivityType

const effective = ref(false)

if (
  typeof type === 'string' &&
  ['normal', 'special', 'upload', 'merge'].includes(type as string)
) {
  effective.value = true
}
</script>

<template>
  <div>
    <ElCard v-if="!effective" class="m-4">
      <ElResult
        icon="error"
        :title="t('nav.pages.NotFound.title')"
        :status="404"
        :sub-title="t('nav.pages.NotFound.description')"
      />
    </ElCard>
    <ZUploadFile v-else-if="type === 'upload'" />
    <ZActivityCreate v-else-if="type !== 'merge'" :type="type" />
    <ZActivityMerge v-else />
  </div>
</template>
