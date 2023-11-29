<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ElResult, ElCard } from 'element-plus'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ActivityType } from '@/../@types/activity'
import { ZActivityCreate } from '@/components'

const route = useRoute()
const { t } = useI18n()

const type = route.params?.type as ActivityType

const effective = ref(false)

if (
  typeof type === 'string' &&
  ['specified', 'special', 'social', 'scale'].includes(type as string)
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
    <ZActivityCreate v-else :type="type" />
  </div>
</template>
