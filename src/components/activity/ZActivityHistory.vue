<script lang="ts" setup>
import { ElButton, ElStep, ElSteps, ElScrollbar, ElCol, ElRow, ElEmpty } from 'element-plus'
import type {
  ActivityMemberHistory,
  MemberActivityStatus,
  ActivityMode
} from '@zvms/zvms4-types'
import { toRefs, type Component as VueComponent, ref, watch } from 'vue'
import dayjs from 'dayjs'
import { ZActivityDuration, ZActivityMember, ZButtonOrCard } from '@/components'
import { memberActivityStatuses } from '@/icons/status'
import { useI18n } from 'vue-i18n'
import { Clock, Timer } from '@element-plus/icons-vue'
import { useWindowSize } from '@vueuse/core'
import { History, User } from '@icon-park/vue-next'

const props = withDefaults(
  defineProps<{
    history?: ActivityMemberHistory[]
    mode?: ActivityMode
    display?: 'button' | 'card'
  }>(),
  {
    mode: 'on-campus',
    display: 'button'
  }
)

const { history, mode, display } = toRefs(props)
const { width, height } = useWindowSize()
const { t } = useI18n()

const min = ref(height.value * 0.6)

watch(width, () => {
  min.value = height.value * 0.6
})

const statusMap: Record<
  MemberActivityStatus,
  {
    type: '' | 'wait' | 'process' | 'finish' | 'error' | 'success'
    icon: VueComponent
  }
> = {
  draft: {
    type: 'wait',
    icon: memberActivityStatuses.draft.icon
  },
  pending: {
    type: '',
    icon: memberActivityStatuses.pending.icon
  },
  rejected: {
    type: 'process',
    icon: memberActivityStatuses.rejected.icon
  },
  refused: {
    type: 'error',
    icon: memberActivityStatuses.refused.icon
  },
  effective: {
    type: 'success',
    icon: memberActivityStatuses.effective.icon
  }
}
</script>

<template>
  <ZButtonOrCard
    :icon="History"
    :mode="display"
    center
    pop-type="dialog"
    direction="rtl"
    width="80%"
    type="warning"
    text
    bg
    round
    size="small"
    :title="t('activity.impression.page.reflect.history.title')"
  >
    <template #text>
      {{ t('activity.impression.page.reflect.history.title') }}
    </template>
    <template #default>
      <ElScrollbar :height="min" v-if="history?.length !== 0">
        <ElSteps direction="vertical" :space="100" :active="history?.length" style="width: 100%">
          <ElStep
            v-for="(item, idx) in history"
            :key="idx"
            :status="statusMap[item.action].type"
            :icon="statusMap[item.action].icon"
            style="width: 100%"
          >
            <template #title>
              <ElRow>
                <ElCol :span="4">
                  <p class="text-xl w-full">
                    {{ t('activity.status.' + item.action) }}
                  </p>
                </ElCol>
                <ElCol :span="20" style="text-align: right">
                  <ElButton class="px-2" text bg round size="small" type="info" :icon="Clock">
                    {{ dayjs(item.time).format('YYYY-MM-DD HH:mm:ss') }}
                  </ElButton>
                  <ZActivityDuration class="px-2" :mode="mode" :duration="item.duration" />
                  <ZActivityMember :id="item.actioner" :icon="User" />
                </ElCol>
              </ElRow>
            </template>
            <template #description>
              <p class="py-2 pl-4 text-sm text-gray-500 w-full">
                {{ item.impression }}
              </p>
            </template>
          </ElStep>
        </ElSteps>
      </ElScrollbar>
      <ElEmpty v-else :content="t('activity.history.empty')" />
    </template>
  </ZButtonOrCard>
</template>
