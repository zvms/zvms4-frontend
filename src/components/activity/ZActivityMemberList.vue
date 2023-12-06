<script setup lang="ts">
import { ZButtonOrCard, ZActivityMember, ZActivityStatus, ZActivityDuration } from '@/components'
import type { ActivityInstance } from '@/../@types/activity'
import { toRefs } from 'vue'
import { User, Minus } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import { ElTable, ElTableColumn, ElButton, ElScrollbar } from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'

const user = useUserStore()
const { t } = useI18n()
const { height, width } = useWindowSize()

const max = ref(height.value * 0.6)

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
    :title="t('activity.member.dialog.title', { name: activity.name })"
  >
    <template #text>
      {{ activity.members.length }} {{ t('activity.units.person', activity.members.length) }}
    </template>
    <template #default>
      <ElScrollbar :height="max" v-if="activity.members.length !== 0">
        <ElTable :data="activity.members" stripe>
          <ElTableColumn prop="_id" :label="t('activity.member.name')">
            <template #default="scope">
              <ZActivityMember :id="scope.row._id" with-user-class-name />
            </template>
          </ElTableColumn>
          <ElTableColumn prop="status" :label="t('activity.member.status')">
            <template #default="scope">
              <ZActivityStatus :type="scope.row.status" force="full" />
            </template>
          </ElTableColumn>
          <ElTableColumn prop="duration" :label="t('activity.form.duration')">
            <template #default="scope">
              <ZActivityDuration
                :duration="scope.row.duration"
                :mode="scope.row.mode"
                force="full"
              />
            </template>
          </ElTableColumn>
          <ElTableColumn fixed="right">
            <template #default="scope">
              <ElButton text bg round size="small" type="danger" @click="scope" :icon="Minus">
                {{ t('activity.member.dialog.actions.remove') }}
              </ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </ElScrollbar>
    </template>
  </ZButtonOrCard>
</template>
