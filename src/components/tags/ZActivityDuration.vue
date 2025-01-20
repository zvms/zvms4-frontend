<script setup lang="ts">
import type { ActivityMode, MemberActivityStatus } from '@zvms/zvms4-types'
import { ref, toRefs } from 'vue'
import { ZActivityMode, ZActivityStatus, ZInputDuration } from '@/components'
import { ElButton, ElButtonGroup, ElForm, ElFormItem, ElPopover } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import api from '@/api'

const props = defineProps<{
  mode?: ActivityMode
  duration: number
  force?: 'short' | 'full'
  status?: MemberActivityStatus
  id?: string
  uid?: string
}>()

const { t } = useI18n()

const { mode, duration, force, status, id, uid } = toRefs(props)

const modification = ref(duration.value)

async function modify() {
  if (id.value && uid.value) {
    await api.activity.duration.modify(uid.value, id.value, modification.value)
  }
}
</script>

<template>
  <ElButtonGroup>
    <ZActivityMode :force="force" :mode="mode" />

    <ElPopover width="328px" trigger="click">
      <template #reference>
        <ElButton text :icon="force === 'full' ? Timer : undefined" bg round size="small" type="info">
          {{ duration }} h
        </ElButton>
      </template>
      <ElForm>
        <ElFormItem :label="t('activity.form.duration')">
          <ZInputDuration v-model="modification" class="w-full" />
        </ElFormItem>
        <div style="text-align: right">
          <ElButton text bg type="primary" @click="modify">
            {{ t('activity.form.actions.modify') }}
          </ElButton>
        </div>
      </ElForm>
    </ElPopover>
    <ZActivityStatus :force="force" v-if="status" :type="status" />
  </ElButtonGroup>
</template>
