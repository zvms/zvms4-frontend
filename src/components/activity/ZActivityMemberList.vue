<script setup lang="ts">
import { ZButtonOrCard, ZActivityMember, ZActivityStatus } from '@/components'
import type { ActivityInstance } from '@/../@types/activity'
import { toRefs } from 'vue'
import { User } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import { ElTable, ElTableColumn, ElButton } from 'element-plus'
import { getUserClassByCode } from '@/utils/getClass'

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
    <template #default>
      <ElTable :data="activity.members" stripe>
        <ElTableColumn prop="_id" :label="t('activity.member.name')">
          <template #default="scope">
            <ZActivityMember :id="scope.row._id" />
          </template>
        </ElTableColumn>
        <ElTableColumn prop="status" :label="t('activity.member.status')">
          <template #default="scope">
            <ZActivityStatus :type="scope.row.status" force="full" />
          </template>
        </ElTableColumn>
      </ElTable>
    </template>
  </ZButtonOrCard>
</template>
