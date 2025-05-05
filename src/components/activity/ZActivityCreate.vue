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
import { ArrowRight, Location } from '@element-plus/icons-vue'
import { ZSelectPerson } from '@/components'
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

const activity = reactive<ActivityInstance | Activity>({
  _id: '',
  type: type.value === 'special' ? 'special' : ('' as unknown as ActivityType),
  name: '',
  description: '',
  members: [],
  date: '',
  createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  creator: '',
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

const membersFunctions = {
  add() {
    members.push({
      _id: '',
      status: 'effective',
      mode: modeMap[activity.type],
      duration: members[0].duration ?? (undefined as unknown as number)
    })
  },
  remove(ord: number) {
    members.splice(ord, 1)
  }
}

const special = reactive<Special>({
  classify: '' as unknown as SpecialActivityClassification
})

const classifyOfSpecial = ['prize', 'club', 'other'] as SpecialActivityClassification[]

const scrollableCardHeight = ref((height.value - 64) * 0.6)

watch(height, () => {
  scrollableCardHeight.value = (height.value - 64) * 0.6
})

async function submit() {
  load.value = true
  try {
    await api.activity.insert(activity, activity.members, registration, activity.special, approveStudent.value)
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
  () => generateActivity(activity, activity.members, approveStudent.value, registration, activity.special),
  () => {
    const act = generateActivity(activity, activity.members, approveStudent.value, registration, activity.special)
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
        <ElForm label-position="right" label-width="108px" :model="activity">
          <ElScrollbar :height="scrollableCardHeight + 'px'">
            <ElFormItem
              prop="name"
              :label="t('activity.form.name')"
              required
              :rules="[{ required: true, message: t('validation.create.name.required') }]"
            >
              <ElInput v-model="activity.name" />
            </ElFormItem>
            <ElFormItem :label="t('activity.form.description')">
              <ElInput v-model="activity.description" type="textarea" :autosize="{ minRows: 2 }" />
            </ElFormItem>
            <ElFormItem
              v-if="type !== 'special'"
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
              v-if="type === 'special'"
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
              v-if="activity.type === 'specified'"
              :label="t('activity.registration.location')"
              prop="registration.place"
            >
              <ElInput :prefix-icon="Location" v-model="registration.place" required />
            </ElFormItem>
            <ElFormItem
              v-if="type === 'normal'"
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
            >
              <div class="w-full" style="flex-grow: 1"><ZActivityMemberList mode="card" local :activity="activity" /></div>
            </ElFormItem>
          </ElScrollbar>
          <div class="actions text-right">
            <ElButton
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
