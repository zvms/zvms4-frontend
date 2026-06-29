<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ElResult, ElCard } from 'element-plus'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CreateActivityType } from '@/../types'
import { ZActivityCreate, ZUploadFile } from '@/components'
import { useHeaderStore } from '@/stores/header'

const route = useRoute()
const { t } = useI18n()
const header = useHeaderStore()

header.setHeader(t('nav.create'))

const type = (route.params?.type as CreateActivityType) ?? 'normal'

const effective = ref(false)

if (typeof type === 'string' && ['normal', 'upload'].includes(type as string)) {
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
    <ZActivityCreate v-else :type="type" />
  </div>
</template>
