<script lang="ts" setup>
import { ElButton, ElStep, ElSteps, ElScrollbar } from 'element-plus'
import type { ActivityMemberHistory, MemberActivityStatus } from '@/../@types/activity'
import { toRefs, type Component as VueComponent, ref, watch } from 'vue'
import dayjs from 'dayjs'
import { statuses } from '@/icons/status'
import ZActivityStatus from '../tags/ZActivityStatus.vue'
import ZActivityMember from './ZActivityMember.vue'
import { useI18n } from 'vue-i18n'
import { Clock, Timer } from '@element-plus/icons-vue'
import ZButtonOrCard from '../utils/ZButtonOrCard.vue'
import { useWindowSize } from '@vueuse/core'
import { History, User } from '@icon-park/vue-next'

const props = defineProps<{ history?: ActivityMemberHistory[] }>()

const { history } = toRefs(props)
const { width, height } = useWindowSize()
const { t } = useI18n()

const min = ref(height.value * 0.45)

watch(width, () => {
  min.value = height.value * 0.45
})

const statusMap: Record<
  MemberActivityStatus,
  {
    type: '' | 'wait' | 'process' | 'finish' | 'error' | 'success'
    icon: VueComponent
  }
> = {
  draft: {
    type: '',
    icon: statuses.draft.icon
  },
  pending: {
    type: 'process',
    icon: statuses.pending.icon
  },
  rejected: {
    type: 'wait',
    icon: statuses.rejected.icon
  },
  refused: {
    type: 'error',
    icon: statuses.refused.icon
  },
  effective: {
    type: 'success',
    icon: statuses.effective.icon
  }
}
</script>

<template>
  <ZButtonOrCard
    :icon="History"
    mode="button"
    center
    pop-type="dialog"
    direction="rtl"
    width="60%"
    type="warning"
    text
    bg
    round
    size="small"
  >
    <template #text>
      {{ t('activity.impression.page.reflect.history.title') }}
    </template>
    <template #default>
      <ElScrollbar :height="min">
        <ElSteps direction="vertical" :space="100" :active="history?.length" style="width: 100%">
          <ElStep
            v-for="(item, idx) in history"
            :key="idx"
            :status="statusMap[item.action].type"
            :icon="statusMap[item.action].icon"
          >
            <template #title>
              <p class="text-xl">
                {{ t('activity.status.' + item.action) }}
                <ElButton class="px-2" text bg round size="small" type="info" :icon="Clock">
                  {{ dayjs(item.time).format('YYYY-MM-DD HH:mm:ss') }}
                </ElButton>
                <ElButton class="px-2" text bg round size="small" type="warning" :icon="Timer">
                  {{ item.duration }} h
                </ElButton>
              </p>
            </template>
            <template #description>
              <p class="py-2 pl-4 text-sm text-gray-500">
                {{ item.impression }}
              </p>
              <div class="py-2 pl-4" style="text-align: right">
                <ZActivityMember :id="item.actioner" :icon="User" />
              </div>
            </template>
          </ElStep>
        </ElSteps>
      </ElScrollbar>
    </template>
  </ZButtonOrCard>
</template>
