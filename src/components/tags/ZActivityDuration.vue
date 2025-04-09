<script setup lang="ts">
import type { ActivityMode, MemberActivityStatus } from '@/../types'
import { ref, toRefs } from 'vue'
import { ZActivityMode, ZActivityStatus, ZInputDuration } from '@/components'
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
}>()
const emits = defineEmits<{
  (e: 'update:duration', value: number): void
}>()

const { t } = useI18n()

const { mode, duration, force, id, uid } = toRefs(props)

const user = useUserStore()

const modification = ref(duration.value)

async function modify() {
  if (id.value && uid.value && modification.value > 0 && modification.value <= 18) {
    await api.activity.duration.modify(uid.value, id.value, modification.value)
    emits('update:duration', modification.value)
  }
}
</script>

<template>
  <ElButtonGroup>
    <ZActivityMode :force="force" :mode="mode" />

    <ElPopover
      width="328px"
      trigger="click"
      v-if="(user.position.includes('admin') || user.position.includes('department')) && id && uid"
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
          <ElButton text bg type="primary" @click="modify" :disabled="modification <= 0 || modification > 18">
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
