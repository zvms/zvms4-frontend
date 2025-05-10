<script lang="ts" setup>
import type {
  ActivityMember,
  ActivityInstance,
  ActivityType,
  Registration,
  SpecialActivityClassification,
  ActivityMode,
  Special,
  Activity,
  CreateActivityType
} from '@/../types'
import { reactive, toRefs } from 'vue'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import {
  ElFormItem,
  ElForm,
  ElInput,
  ElSelect,
  ElOption,
  ElScrollbar,
  ElDatePicker,
  ElButton,
  ElCard,
  ElRow,
  ElCol,
  ElRadioGroup,
  ElRadio
} from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { watch, ref } from 'vue'
import { ArrowLeft, ArrowRight, Location } from '@element-plus/icons-vue'
import { ZActivityDetails, ZActivityMemberList, ZSelectPerson } from '@/components'
import api from '@/api'
import { validateActivity } from './validation'
import { generateActivity } from '@/utils/generate'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const { t } = useI18n()
const { height } = useWindowSize()
const router = useRouter()
const load = ref(false)
const userStore = useUserStore()

const props = defineProps<{
  type: CreateActivityType
}>()

const { type } = toRefs(props)

const activePage = ref<'info' | 'member' | 'review'>('info')

const activity = reactive<ActivityInstance | Activity>({
  _id: '',
  type: type.value === 'special' ? 'special' : ('' as unknown as ActivityType),
  name: '',
  description: '',
  members: [],
  date: '',
  createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  creator: userStore._id,
  status: 'effective',
  approver: '',
  special: {
    classify: '' as unknown as SpecialActivityClassification
  }
})

const token = localStorage.getItem('token')

const approveStudent = ref('')

const registration = reactive<Registration>({
  place: ''
})

const modeMap = {
  specified: 'on-campus',
  social: 'off-campus',
  scale: 'social-practice'
} as Record<ActivityType, ActivityMode>

const members = reactive<ActivityMember[]>([
  {
    _id: '',
    status: 'effective',
    mode: modeMap[activity.type],
    duration: undefined as unknown as number
  }
])

const special = reactive<Special>({
  classify: '' as unknown as SpecialActivityClassification
})

const classifyOfSpecial = ['prize', 'club', 'other'] as SpecialActivityClassification[]

const scrollableCardHeight = ref((height.value - 64) * 0.6)

watch(height, () => {
  scrollableCardHeight.value = (height.value - 64) * 0.6
})

function nextStep() {
  if (activePage.value === 'info') {
    activePage.value = 'member'
  } else if (activePage.value === 'member') {
    activePage.value = 'review'
  }
}

function prevStep() {
  if (activePage.value === 'member') {
    activePage.value = 'info'
  } else if (activePage.value === 'review') {
    activePage.value = 'member'
  }
}

async function submit() {
  load.value = true
  try {
    await api.activity.insert(
      activity,
      activity.members,
      registration,
      activity.special,
      approveStudent.value
    )
    load.value = false
    await router.push(
      '/activities/' +
        (userStore.position.includes('admin') || userStore.position.includes('department')
          ? 'campus'
          : userStore.position.includes('secretary')
          ? 'class'
          : 'mine')
    )
  } finally {
    load.value = false
  }
}

function allow(): ActivityMode[] {
  if (activity.type === 'specified') return ['on-campus']
  if (activity.type === 'social') return ['off-campus']
  if (activity.type === 'scale') return ['social-practice']
  if (activity.type === 'special') {
    if (special.classify !== 'other') return ['on-campus', 'off-campus']
    return ['on-campus', 'off-campus', 'social-practice']
  }
  return []
}

const validated = ref(false)

watch(
  () =>
    generateActivity(
      activity,
      activity.members,
      approveStudent.value,
      registration,
      activity.special
    ),
  () => {
    const act = generateActivity(
      activity,
      activity.members,
      approveStudent.value,
      registration,
      activity.special
    )
    if (act !== null) {
      validated.value = validateActivity(act)
    }
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <div class="px-6 py-3">
    <div class="p-4">
      <ElCard shadow="hover" class="full">
        <ElForm label-position="right" label-width="108px" :model="activity" style="width: 100%">
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
              v-if="type !== 'special' && activePage === 'info'"
              :label="t('activity.form.type')"
              required
              prop="type"
            >
              <ElSelect v-model="activity.type" class="full">
                <ElOption
                  v-for="type in ['specified', 'social', 'scale']"
                  :key="type"
                  :label="t('activity.type.' + type + '.short')"
                  :value="type"
                />
              </ElSelect>
            </ElFormItem>
            <ElFormItem
              :label="t('activity.form.date')"
              required
              prop="date"
              :rules="[{ required: true, message: t('validation.create.date.required') }]"
              v-if="activePage === 'info'"
            >
              <ElDatePicker
                v-if="activity.type !== 'specified'"
                class="full"
                style="width: 100%"
                v-model="activity.date"
              />
              <ElDatePicker
                v-else
                class="full"
                style="width: 100%"
                v-model="activity.date"
                type="datetime"
              />
            </ElFormItem>
            <ElFormItem
              v-if="type === 'special' && activePage === 'info'"
              :label="t('activity.special.classify.name')"
              required
              :rules="[{ required: true, message: t('validation.create.classify.required') }]"
            >
              <ElSelect v-model="activity.special.classify" class="full">
                <ElOption
                  v-for="classify in classifyOfSpecial"
                  :key="classify"
                  :label="t('activity.special.classify.' + classify)"
                  :value="classify"
                />
              </ElSelect>
            </ElFormItem>
            <ElFormItem
              v-if="activity.type === 'specified' && activePage === 'info'"
              :label="t('activity.registration.location')"
              prop="registration.place"
            >
              <ElInput :prefix-icon="Location" v-model="registration.place" required />
            </ElFormItem>
            <ElFormItem
              v-if="type === 'normal' && activePage === 'info'"
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
            </ElFormItem>
            <ElFormItem
              :label="t('activity.form.person', members.length)"
              :required="activity.type !== 'specified'"
              v-if="activePage === 'member'"
            >
              <div class="w-full" style="flex-grow: 1">
                <ZActivityMemberList
                  mode="card"
                  local
                  :activity="activity as unknown as ActivityInstance"
                />
              </div>
            </ElFormItem>
            <ElFormItem label="Preview" v-if="activePage === 'review'" style="width: 100%">
              <ZActivityDetails
                style="width: 100%"
                :activity="activity as unknown as ActivityInstance"
                mode="campus"
              />
            </ElFormItem>
          </ElScrollbar>
          <div class="actions text-right pt-2">
            <ElButton
              v-if="activePage === 'review'"
              type="primary"
              :icon="ArrowRight"
              text
              bg
              @click="submit"
              :loading="load"
              :disabled="!validated"
            >
              {{ t('activity.form.actions.submit') }}
            </ElButton>
            <ElButton
              v-if="activePage !== 'info'"
              type="primary"
              :icon="ArrowLeft"
              text
              bg
              @click="prevStep"
            >
              {{ t('activity.batch.steps.prev') }}
            </ElButton>
            <ElButton
              v-if="activePage !== 'review'"
              :disabled="!validated"
              type="primary"
              :icon="ArrowRight"
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
