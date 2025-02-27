<script setup lang="ts">
import { ZActivityList } from '.'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElCard,
  ElRadio,
  ElRadioGroup,
  ElAlert,
  ElSwitch,
  ElScrollbar,
  ElTooltip
} from 'element-plus'
import { ref, reactive, watch } from 'vue'
import type { ActivityType, ActivityInstance } from '@/../types'
import { useI18n } from 'vue-i18n'
import api from '@/api'
import { useWindowSize, useDark } from '@vueuse/core'
import { useUserStore } from '@/stores/user.ts'
import { InfoFilled } from '@element-plus/icons-vue'

const { t } = useI18n()
const user = useUserStore()
const { height } = useWindowSize()
const dark = useDark()

const typesOfActivity = ref<ActivityType[]>(['specified', 'social', 'scale'])

const tableMaxHeight = ref(height.value * 0.56)

watch(height, () => {
  tableMaxHeight.value = height.value * 0.56
})

const mergeForm = reactive({
  name: '',
  type: '' as unknown as ActivityType,
  list: [] as ActivityInstance[]
})

const overwriteTime = ref(false)

function updateStatus(percent: number, message: string) {
  // WHO KNOWS WHAT AM I DOING?
  void percent
  void message.length
}

async function mergeActivity() {
  await api.activity.merge(
    mergeForm.list,
    mergeForm.name,
    {
      duplicateUser: overwriteTime.value ? 'overwrite' : 'add'
    },
    user._id,
    updateStatus
  )
}
</script>

<template>
  <div class="py-6 px-12">
    <ElCard shadow="never">
      <ElForm class="px-2" label-position="right" label-width="96px">
        <ElScrollbar ElScrollbar :height="tableMaxHeight + 'px'">
          <ElFormItem :label="t('manage.merge.form.name')">
            <ElInput v-model="mergeForm.name" class="w-full" />
          </ElFormItem>
          <ElFormItem :label="t('manage.merge.form.type')">
            <ElRadioGroup v-model="mergeForm.type">
              <ElRadio
                v-for="type in typesOfActivity"
                border
                :key="type"
                :value="type"
                :label="t('activity.type.' + type + '.short')"
              ></ElRadio>
            </ElRadioGroup>
          </ElFormItem>
          <ElFormItem :label="t('manage.merge.form.list')">
            <ElAlert
              :title="t('manage.merge.form.prompt')"
              show-icon
              type="info"
              class="mb-4"
              :closable="false"
            />
            <ZActivityList
              :select-target="mergeForm.type"
              v-model="mergeForm.list"
              class="w-full"
              role="campus"
            />
          </ElFormItem>
          <ElFormItem :label="t('manage.merge.form.overwrite')">
            <ElSwitch
              class="px-2"
              v-model="overwriteTime"
              :active-text="t('manage.merge.form.overwritePrompt.yes')"
              :inactive-text="t('manage.merge.form.overwritePrompt.no')"
            />
            <ElTooltip
              class="px-3"
              :content="t('manage.merge.form.overwriteInfo')"
              placement="right"
              :effect="dark ? undefined : 'light'"
              style="width: 384px"
            >
              <ElButton size="small" text bg circle :icon="InfoFilled" />
            </ElTooltip>
          </ElFormItem>
        </ElScrollbar>
        <div style="text-align: right" class="py-2">
          <ElButton text bg type="primary" @click="mergeActivity">{{ t('manage.merge.form.action') }}</ElButton>
        </div>
      </ElForm>
    </ElCard>
  </div>
</template>

<style scoped></style>
