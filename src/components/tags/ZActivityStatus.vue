<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ref, toRefs, h } from 'vue'
import type { MemberActivityStatus, ActivityInstance } from '@zvms/zvms4-types'
import { ZButtonTag } from '@/components'
import classifications from './classifications'
import { ElPopover, ElButton, ElSpace, ElPopconfirm, ElDivider } from 'element-plus'
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
    bg?: boolean
  }>(),
  {
    type: 'effective',
    size: 'small',
    color: true,
    modifiable: false,
    refresh: () => {},
    bg: true
  }
)

const { type, size, activity } = toRefs(props)

const effective = type?.value! in classifications.member

const results: ('effective' | 'refused')[] = ['refused', 'effective']
const visible = ref(false)

function modify(status: 'effective' | 'refused') {
  if (!activity?.value) return
  if (!activity?.value?._id) return
  api.activity.update.status(activity?.value?._id, status).then(() => {
    props.refresh?.()
    visible.value = false
  })
}

const divider = h(ElDivider, { direction: 'vertical' })
</script>

<template>
  <ZButtonTag
    v-if="!modifiable || type !== 'pending'"
    :size="size ?? 'small'"
    :type="classifications.member[type].color"
    :icon="classifications.member[type].icon"
    :unknown="!effective"
    :force="force"
    :bg="bg"
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
        :bg="bg"
      >
        {{ t('activity.status.pending') }}
      </ZButtonTag>
    </template>
    <div class="flex justify-end py-1">
      <ElSpace :spacer="divider">
        <ElPopconfirm
          v-for="result in results.filter((x) => x !== type)"
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
              :bg="bg"
              size="small"
            >
              {{ t('activity.form.actions.modification.' + result) }}
            </ElButton>
          </template>
        </ElPopconfirm>
      </ElSpace>
    </div>
  </ElPopover>
</template>
