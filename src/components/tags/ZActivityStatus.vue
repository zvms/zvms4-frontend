<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ref, toRefs } from 'vue'
import type { MemberActivityStatus, ActivityInstance } from '@/../@types/activity'
import { ZButtonTag } from '@/components'
import classifications from './classifications'
import { ElPopover, ElButton, ElSpace, ElPopconfirm } from 'element-plus'
import api from '@/api'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    type?: MemberActivityStatus
    size?: 'large' | 'default' | 'small'
    color?: boolean
    force?: 'full' | 'short'
    modifiable?: boolean
    activity?: ActivityInstance
    refresh?: () => void
  }>(),
  {
    type: 'effective',
    size: 'small',
    color: true,
    modifiable: false,
    refresh: () => {}
  }
)

const { type, size, activity } = toRefs(props)

const effective = type?.value! in classifications.member

const results: ('effective' | 'pending' | 'refused')[] = ['effective', 'pending', 'refused']
const visible = ref(false)

function modify(status: 'effective' | 'refused' | 'pending') {
  if (!activity?.value) return
  if (!activity?.value?._id) return
  api.activity.update.status(activity?.value?._id, status).then(() => {
    props.refresh?.()
    visible.value = false
  })
}
</script>

<template>
  <ZButtonTag
    v-if="!modifiable || type !== 'pending'"
    :size="size ?? 'small'"
    :type="classifications.member[type].color"
    :icon="classifications.member[type].icon"
    :unknown="!effective"
    :force="force"
  >
    {{ t('activity.status.' + type) }}
  </ZButtonTag>
  <ElPopover
    v-else
    :title="t('activity.form.actions.modification.status', { activity: activity?.name })"
    trigger="click"
    width="384px"
    v-model:visible="visible"
    placement="right"
  >
    <template #reference>
      <ZButtonTag
        :size="size"
        :type="classifications.member.pending.color"
        :icon="classifications.member.pending.icon"
      >
        {{ t('activity.status.pending') }}
      </ZButtonTag>
    </template>
    <ElSpace>
      <ElPopconfirm
        v-for="result in results.filter(x => x !== type)"
        :key="result"
        :title="t('activity.form.actions.modification.confirm')"
        @confirm="() => modify(result)"
        width="256px"
      >
        <template #reference>
          <ElButton
            :type="classifications.member[result].color"
            :icon="classifications.member[result].icon"
            text
            bg
          >
            {{ t('activity.status.' + result) }}
          </ElButton>
        </template>
      </ElPopconfirm>
    </ElSpace>
  </ElPopover>
</template>
