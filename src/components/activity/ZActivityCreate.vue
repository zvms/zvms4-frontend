<script lang="ts" setup>
import type { CreateActivityType } from '@/../types'
import type { Activity, ActivityMember } from '@/../types/v2'
import { reactive, ref, toRefs, watch } from 'vue'
import dayjs from '@/plugins/dayjs'
import { useI18n } from 'vue-i18n'
import {
  ElButton,
  ElCard,
  ElCol,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElInput,
  ElAlert,
  ElRadio,
  ElRadioGroup,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElCascader
} from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { ArrowLeft, ArrowRight, Location } from '@element-plus/icons-vue'
import {
  ZActivityDetails,
  ZActivityMemberList,
  ZSelectActivityMode,
  ZSelectPerson
} from '@/components'
import api from '@/api'
import { validateActivity } from './validation'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import categories from './categories.json'
import { composeDurationRecommendation } from './activityCategory'

const { t, locale } = useI18n()
const { height } = useWindowSize()
const router = useRouter()
const load = ref(false)
const userStore = useUserStore()

const props = defineProps<{
  type: CreateActivityType
}>()

const { type } = toRefs(props)

const activePage = ref<'info' | 'member' | 'review'>('info')

const activity = reactive<Activity>({
  _id: '',
  type: '' as unknown as Activity['type'],
  name: '',
  description: '',
  date: '',
  createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  creator: userStore._id,
  status: 'pending',
  place: '',
  appointee: userStore._id,
  approver: 'authority',
  origin: 'other'
})

const createdId = ref('')

const token = localStorage.getItem('token')
const remindText = ref(
  locale.value === 'zh-CN' ? '请先选择义工来源' : 'Please select a volunteer source first'
)
const remindCategory = ref<string[]>([])

const approveStudent = ref('')

const activityCategories =
  Object.getOwnPropertyDescriptor(categories, locale.value)?.value ?? categories['en-US']

const members = reactive<ActivityMember[]>([])

const scrollableCardHeight = ref((height.value - 64) * 0.6)
const origin = ref<string[]>(['others'])

// @ts-ignore
watch(origin, (newVal) => {
  while (remindCategory.value.length > 0) {
    remindCategory.value.pop()
  }
  const val = Array.from(newVal)
  // @ts-ignore
  let reminder = { children: categories[locale.value] }
  if (
    newVal.includes('off-campus') ||
    newVal.includes('social-practice') ||
    newVal.includes('others')
  ) {
    remindText.value =
      locale.value === 'zh-CN'
        ? '请确保已提交相关纸质材料并由团委审核通过。'
        : 'Please ensure that relevant paper materials have been submitted and approved by the Youth League Committee.'
    remindCategory.value = [
      // @ts-ignore
      categories[locale.value].find((item) => item.value === newVal[0])?.label
    ]
    return
  }
  while (val.length > 0) {
    const target = val.shift()
    // @ts-ignore
    const intermediate = reminder.children.find((item) => item.value === target) ?? reminder
    remindCategory.value.push(intermediate?.label ?? '')
    // @ts-ignore
    reminder = intermediate
  }
  const duration =
    // @ts-ignore
    reminder?.duration ??
    ({} as Record<
      ActivityMember['mode'] | 'hybrid',
      { lte?: number; gte?: number; unlimited?: boolean }
    >)
  const dict = {
    'on-campus':
      locale.value === 'zh-CN'
        ? '仅可计入校内义工。'
        : ' Could only count as on-campus volunteer work.',
    'off-campus':
      locale.value === 'zh-CN'
        ? '仅可计入校外义工。'
        : ' Could only count as off-campus volunteer work.',
    'social-practice':
      locale.value === 'zh-CN' ? '仅可计入社会实践。' : ' Could only count as social practice.',
    hybrid:
      locale.value === 'zh-CN'
        ? '可按个人选择计入模式。'
        : ' Could select record mode according to personal choice.'
  }
  // @ts-ignore
  const [mode, config] = Object.entries(duration)[0]
  remindText.value =
    composeDurationRecommendation({
      // @ts-ignore
      ...config,
      documented: newVal.includes('content-clubs'),
      lang: locale.value,
      ticketRequired: newVal.includes('student-activities') || newVal.includes('awards'),
      // @ts-ignore
      attachment: reminder?.attachment ?? 0
      // @ts-ignore
    }) + dict[mode]
})

watch(height, () => {
  scrollableCardHeight.value = (height.value - 64) * 0.6
})

async function nextStep() {
  load.value = true
  if (activePage.value === 'info') {
    activity.origin = 'other'
    createdId.value = await api.activity.insert(activity).catch(() => {
      load.value = false
    })
    if (!createdId.value) {
      return
    }
    activity._id = createdId.value
    activePage.value = 'member'
  } else if (activePage.value === 'member') {
  /*  activePage.value = 'review'
  } else if (activePage.value === 'review') {
    if (checkReviewAllowed()) {
      await api.activity.update.status(createdId.value, 'effective')
    }*/
    await router.push(
      '/activities/' +
        (userStore.position.includes('admin') || userStore.position.includes('department')
          ? 'campus'
          : userStore.position.includes('secretary')
            ? 'class'
            : 'mine')
    )
  }
  load.value = false
}

function prevStep() {
  if (activePage.value === 'review') {
    activePage.value = 'member'
  }
}

const validated = ref(false)

watch(
  () => activity,
  () => {
    validated.value = validateActivity(activity, activePage.value)
  },
  { deep: true, immediate: true }
)

function checkReviewAllowed() {
  if (userStore.position.includes('admin')) {
    return true
  }
  if (userStore.position.includes('department')) {
    if (activity.approver === 'authority') {
      return true
    } else {
      return userStore._id == activity.approver
    }
  }
  return false
}
</script>

<template>
  <div class="px-6 py-3">
    <div class="p-4">
      <ElCard shadow="hover" class="full">
        <ElForm label-position="right" label-width="64px" :model="activity" style="width: 100%">
          <ElScrollbar :height="scrollableCardHeight + 'px'">
            <ElFormItem
              prop="name"
              :label="t('activity.form.name')"
              required
              :rules="[{ required: true, message: t('validation.create.name.required') }]"
              v-if="activePage === 'info'"
            >
              <ElInput v-model="activity.name" />
            </ElFormItem>
            <ElFormItem :label="t('activity.form.description')" v-if="activePage === 'info'">
              <ElInput v-model="activity.description" type="textarea" :autosize="{ minRows: 2 }" />
            </ElFormItem>
            <ElFormItem
              v-if="activePage === 'info'"
              :label="t('activity.form.type')"
              required
              prop="type"
            >
              <ZSelectActivityMode v-model="activity.type" show-hybrid class="w-full" />
            </ElFormItem>
            <ElFormItem
              :label="t('activity.form.date')"
              required
              prop="date"
              :rules="[{ required: true, message: t('validation.create.date.required') }]"
              v-if="activePage === 'info'"
            >
              <ElDatePicker class="full" style="width: 100%" v-model="activity.date" />
            </ElFormItem>
            <!--<ElFormItem
              v-if="activePage === 'info'"
              :label="t('activity.origins.name')"
              required
              :rules="[{ required: true, message: t('validation.create.classify.required') }]"
            >
              <ElCascader v-model="origin" :options="activityCategories" class="w-full" />
            </ElFormItem>-->
            <!--<ElFormItem
              v-if="activePage === 'info'"
              :label="t('activity.registration.location')"
              prop="place"
            >
              <ElInput :prefix-icon="Location" v-model="activity.place" />
            </ElFormItem>-->
            <!--<ElFormItem
              v-if="activePage === 'info'"
              required
              :label="t('activity.registration.approver')"
              style="width: 100%"
            >
              <ElRow style="width: 100%">
                <ElCol :span="16">
                  <ElRadioGroup v-model="activity.approver">
                    <ElRadio border value="authority">
                      {{ t('activity.registration.approvers.authority') }}
                    </ElRadio>
                    <ElRadio border value="member">
                      {{ t('activity.registration.approvers.member') }}
                    </ElRadio>
                  </ElRadioGroup>
                </ElCol>
                <ElCol :span="8" style="width: 100%" v-if="activity.approver === 'member'">
                  <ZSelectPerson style="width: 100%" v-model="approveStudent" :filter-start="6" />
                </ElCol>
              </ElRow>
            </ElFormItem>-->
            <!--<ElFormItem v-if="activePage === 'member' || activePage === 'info'">
              <ElAlert
                :title="remindCategory.join(' / ')"
                :description="remindText"
                type="info"
                :closable="false"
                class="mb-4"
              />
            </ElFormItem>-->
            <ElFormItem
              :label="t('activity.form.person', members.length)"
              v-if="activePage === 'member'"
            >
              <div class="w-full" style="flex-grow: 1">
                <ZActivityMemberList mode="card" :activity="activity as unknown as Activity" />
              </div>
            </ElFormItem>
            <ElFormItem label="Preview" v-if="activePage === 'review'" style="width: 100%">
              <p class="text-center text-xl py-6">
                {{ t('activity.creating_guide.check.created') }}
              </p>
              <div class="w-full" style="flex-grow: 1">
                <ZActivityDetails :activity="activity as unknown as Activity" mode="campus" />
              </div>
              <p class="py-6">
                <span v-if="checkReviewAllowed()">
                  {{ t('activity.creating_guide.check.allowed') }}
                </span>
                <span v-else>
                  {{ t('activity.creating_guide.check.disallowed') }}
                </span>
              </p>
            </ElFormItem>
          </ElScrollbar>
          <span class="text-sm text-gray-500 dark:text-gray-300 px-16" v-if="activePage === 'info'">
            {{ t('activity.creating_guide.info.next') }}
          </span>
          <div class="actions text-right pt-2">
            <ElButton
              v-if="activePage !== 'info'"
              type="primary"
              :icon="ArrowLeft"
              text
              bg
              :disabled="activePage === 'member'"
              @click="prevStep"
            >
              {{ t('activity.batch.steps.prev') }}
            </ElButton>
            <ElButton
              :disabled="!validated"
              type="primary"
              :icon="ArrowRight"
              :loading="load"
              text
              bg
              @click="nextStep"
            >
              {{ t('activity.batch.steps.next') }}
            </ElButton>
          </div>
        </ElForm>
      </ElCard>
    </div>
  </div>
</template>

<style scoped>
.full {
  width: 100%;
}

.actions {
  text-align: right;
  right: 0;
}
</style>
