<script lang="ts" setup>
import { ElButton, ElStep, ElSteps } from 'element-plus'
import type { ActivityMemberHistory, MemberActivityStatus } from '@/../@types/activity'
import { toRefs, type Component as VueComponent } from 'vue'
import dayjs from 'dayjs'
import { statuses } from '@/icons/status'
import ZActivityStatus from '../tags/ZActivityStatus.vue'
import ZActivityMember from './ZActivityMember.vue'
import StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite from '@/icons/StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite.vue'
import { useI18n } from 'vue-i18n'
import { Clock } from '@element-plus/icons-vue'
import ZButtonOrCard from '../utils/ZButtonOrCard.vue'
import MaterialSymbolsLightHistoryRounded from '@/icons/MaterialSymbolsLightHistoryRounded.vue'
import { useWindowSize } from '@vueuse/core'

const props = defineProps<{ history: ActivityMemberHistory[] }>()

const { history } = toRefs(props)
const { width, height } = useWindowSize()
const { t } = useI18n()

const statusMap: Record<
  MemberActivityStatus,
  {
    type: '' | 'wait' | 'process' | 'finish' | 'error' | 'success'
    icon: VueComponent
  }
> = {
  registered: {
    type: 'wait',
    icon: statuses.registered.icon
  },
  draft: {
    type: '',
    icon: statuses.draft.icon
  },
  'first-instance': {
    type: 'process',
    icon: statuses['first-instance'].icon
  },
  'first-instance-rejected': {
    type: 'error',
    icon: statuses['first-instance-rejected'].icon
  },
  'last-instance': {
    type: 'process',
    icon: statuses['last-instance'].icon
  },
  'last-instance-rejected': {
    type: 'error',
    icon: statuses['last-instance-rejected'].icon
  },
  rejected: {
    type: 'error',
    icon: statuses['rejected'].icon
  },
  effective: {
    type: 'success',
    icon: statuses.effective.icon
  }
}
</script>

<template>
  <ZButtonOrCard
    :icon="MaterialSymbolsLightHistoryRounded"
    :mode="width < height * 1.2 ? 'card' : 'button'"
  >
    <template #default>
      <ElSteps direction="vertical" :space="100" :active="history.length">
        <ElStep
          v-for="(item, idx) in history"
          :key="idx"
          :status="statusMap[item.action].type"
          :icon="statusMap[item.action].icon"
        >
          <template #title>
            <p class="text-xl">
              {{ t('activity.status.' + item.action) }}
              <ZActivityStatus :type="item.action" size="small" />
              <ElButton text bg round type="info" :icon="Clock">
                {{ dayjs(item.time).format('YYYY-MM-DD HH:mm:ss') }}
              </ElButton>
            </p>
          </template>
          <template #description>
            <p class="py-2 pl-4 text-sm text-gray-500">
              {{ item.impression }}
            </p>
            <div class="py-2 pl-4" style="text-align: right">
              <ZActivityMember
                :id="item.actioner"
                :icon="
                  StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite
                "
              />
            </div>
          </template>
        </ElStep>
      </ElSteps>
    </template>
  </ZButtonOrCard>
</template>
