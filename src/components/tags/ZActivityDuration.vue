<script setup lang="ts">
import type { ActivityMode, ActivityMember } from '@/../types'
import { ref, toRefs } from 'vue'
import { ZActivityMode, ZInputDuration } from '@/components'
import { ElButton, ElButtonGroup, ElForm, ElFormItem, ElPopover } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import api from '@/api'
import { useUserStore } from '@/stores/user'

const props = defineProps<{
  mode?: ActivityMode
  duration: number
  force?: 'short' | 'full'
  id?: string
  uid?: string
  record?: string
  max?: number //reserved for future use
}>()
const emits = defineEmits<{
  (e: 'update:duration', value: number): void
}>()

const { t } = useI18n()

const { mode, duration, force, id, uid, record } = toRefs(props)

const user = useUserStore()

const modification = ref(duration.value)

async function modify() {
  if (
    id.value &&
    uid.value &&
    record.value &&
    modification.value > 0 &&
    modification.value <= 30 &&
    mode.value
  ) {
    await api.activity.duration.modify(record.value, id.value, modification.value, mode.value as ActivityMember['mode'])
    emits('update:duration', modification.value)
  }
}
</script>

<template>
  <ElButtonGroup>
    <ZActivityMode :force="force" :mode="mode as ActivityMode" v-if="mode" />

    <ElPopover
      width="328px"
      trigger="click"
      v-if="
        (user.position.includes('admin') || user.position.includes('department') || user.position.includes('secretary')) &&
        id &&
        uid &&
        record
      "
    >
      <template #reference>
        <ElButton
          text
          :icon="force === 'full' ? Timer : undefined"
          bg
          round
          size="small"
          type="info"
        >
          {{ duration }} h
        </ElButton>
      </template>
      <ElForm>
        <ElFormItem :label="t('activity.form.duration')">
          <ZInputDuration v-model="modification" class="w-full" />
        </ElFormItem>
        <div style="text-align: right">
          <ElButton
            text
            bg
            type="primary"
            @click="modify"
            :disabled="modification <= 0 || modification > 30"
          >
            {{ t('activity.form.actions.modify') }}
          </ElButton>
        </div>
      </ElForm>
    </ElPopover>
    <ElButton
      v-else
      text
      :icon="force === 'full' ? Timer : undefined"
      bg
      round
      size="small"
      type="info"
    >
      {{ duration }} h
    </ElButton>
  </ElButtonGroup>
</template>
