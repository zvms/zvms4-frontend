<script setup lang="ts">
import { ZButtonOrCard } from '@/components'
import type { ActivityInstance } from '@/../@types/activity'
import { toRefs } from 'vue'
import { User } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'

const user = useUserStore()
const { t } = useI18n()

const props = defineProps<{
  activity: ActivityInstance
}>()

const { activity } = toRefs(props)
</script>

<template>
  <ZButtonOrCard
    mode="button"
    pop-type="dialog"
    width="80%"
    size="small"
    :icon="User"
    round
    type="danger"
  >
    <template #text>
      {{ activity.members.length }} {{ t('activity.units.person', activity.members.length) }}
    </template>
    <template #default> </template>
  </ZButtonOrCard>
</template>
