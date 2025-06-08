<script setup lang="ts">
import { ZActivityList } from '@/components/activity'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElCard,
  ElCheckbox,
  ElCheckboxGroup,
  ElAlert,
  ElSwitch,
  ElScrollbar,
  ElTooltip, ElSelect, ElOption
} from 'element-plus'
import { ref, reactive, watch } from 'vue'
// import type { ActivityType, ActivityInstance } from '@/../types'
import type { Activity } from '@/../types/v2'
import { useI18n } from 'vue-i18n'
import api from '@/api'
import { useWindowSize, useDark } from '@vueuse/core'
import { useUserStore } from '@/stores/user.ts'
import { InfoFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const user = useUserStore()
const { height } = useWindowSize()
const dark = useDark()
const router = useRouter()

const typesOfActivity = ref<Activity['type'][]>(['on-campus', 'off-campus', 'social-practice', 'hybrid'])

const tableMaxHeight = ref(height.value * 0.56)

watch(height, () => {
  tableMaxHeight.value = height.value * 0.56
})

const mergeForm = reactive({
  name: '',
  type: [] as Activity['type'][],
  list: [] as Activity[],
  origin: '' as unknown as Activity['origin']
})
const allowed = ref('')

watch(mergeForm.list, (newList) => {
  if (newList.length > 0) {
    allowed.value = newList.map((item) => item.name).join(',')
  } else {
    allowed.value = ''
  }
}, { immediate: true, deep: true })

const overwriteTime = ref(false)

const origins = [
  'labor',
  'organization',
  'tasks',
  'occasions',
  'import',
  'activities',
  'practice',
  'club',
  'prize',
  'other'
]

async function mergeActivity() {
  await api.activity.merge(
    mergeForm.list,
    mergeForm.name,
    '',
    mergeForm.origin,
    {
      duplicateUser: overwriteTime.value ? 'max' : 'sum',
      proceedPending: false
    },
    user._id
  )

  await router.push('/activities/campus')
}
</script>

<template>
  <div class="py-6 px-12">
    <ElCard shadow="never">
      <ElForm class="px-2" label-position="right" label-width="80px">
        <ElScrollbar ElScrollbar :height="tableMaxHeight + 'px'">
          <ElFormItem
            :label="t('manage.merge.form.name')"
            required
            :rules="[{ required: true, message: t('validation.create.name.required') }]"
          >
            <ElInput v-model="mergeForm.name" class="w-full" />
          </ElFormItem>
          <ElFormItem :label="t('manage.merge.form.type')" required>
            <ElCheckboxGroup v-model="mergeForm.type">
              <ElCheckbox
                v-for="type in typesOfActivity"
                border
                :key="type"
                :value="type"
                :label="t('activity.mode.' + type + '.name')"
              ></ElCheckbox>
            </ElCheckboxGroup>
          </ElFormItem>
          <ElFormItem
            :label="t('activity.origins.name')"
            required
            :rules="[{ required: true, message: t('validation.create.classify.required') }]"
          >
            <ElSelect v-model="mergeForm.origin" class="full">
              <ElOption
                v-for="classify in origins"
                :key="classify"
                :label="t('activity.origins.' + classify + '.name')"
                :value="classify"
              />
            </ElSelect>
          </ElFormItem>
          <ElFormItem :label="t('manage.merge.form.list')" required>
            <ElAlert
              :title="t('manage.merge.form.prompt')"
              show-icon
              type="info"
              class="mb-4"
              :closable="false"
            />
            <ZActivityList
              select
              v-if="mergeForm.type"
              :select-target="allowed"
              v-model="mergeForm.list"
              class="w-full"
              role="campus"
              embed
            />
          </ElFormItem>
          <ElFormItem :label="t('manage.merge.form.overwrite')" required>
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
          <ElButton text bg type="primary" @click="mergeActivity">{{
            t('manage.merge.form.action')
          }}</ElButton>
        </div>
      </ElForm>
    </ElCard>
  </div>
</template>

<style scoped></style>
