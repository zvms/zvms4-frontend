<script lang="ts" setup>
import type { CreateActivityType } from '@/../types'
import type { Activity, ActivityMember } from '@/../types/v2'
import { reactive, ref, toRefs, watch } from 'vue'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import {
  ElButton,
  ElCard,
  ElCol,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElRow,
  ElScrollbar,
  ElSelect
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

const activity = reactive<Activity>({
  _id: '',
  type: type.value === 'normal' ? ('' as unknown as Activity['type']) : 'hybrid',
  name: '',
  description: '',
  date: '',
  createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  creator: userStore._id,
  status: 'effective',
  place: '',
  appointee: userStore._id,
  approver: '',
  origin: '' as unknown as Activity['origin']
})

const createdId = ref('')

const token = localStorage.getItem('token')

const approveStudent = ref('')

const members = reactive<ActivityMember[]>([])

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

const scrollableCardHeight = ref((height.value - 64) * 0.6)

watch(height, () => {
  scrollableCardHeight.value = (height.value - 64) * 0.6
})

async function nextStep() {
  if (activePage.value === 'info') {
    createdId.value = await api.activity.insert(activity)
    activity._id = createdId.value
    activePage.value = 'member'
  } else if (activePage.value === 'member') {
    activePage.value = 'review'
  }
}

function prevStep() {
  if (activePage.value === 'review') {
    activePage.value = 'member'
  }
}

async function submit() {
  await router.push(
    '/activities/' +
      (userStore.position.includes('admin') || userStore.position.includes('department')
        ? 'campus'
        : userStore.position.includes('secretary')
        ? 'class'
        : 'mine')
  )
}

const validated = ref(false)

watch(
  () => activity,
  () => {
    validated.value = validateActivity(activity, activePage.value)
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
              v-if="type !== 'special' && activity.type !== 'hybrid' && activePage === 'info'"
              :label="t('activity.form.type')"
              required
              prop="type"
            >
              <ZSelectActivityMode v-model="activity.type" class="w-full" />
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
            <ElFormItem
              v-if="activePage === 'info'"
              :label="t('activity.origins.name')"
              required
              :rules="[{ required: true, message: t('validation.create.classify.required') }]"
            >
              <ElSelect v-model="activity.origin" class="full">
                <ElOption
                  v-for="classify in origins"
                  :key="classify"
                  :label="t('activity.origins.' + classify + '.name')"
                  :value="classify"
                />
              </ElSelect>
            </ElFormItem>
            <ElFormItem
              v-if="activePage === 'info'"
              :label="t('activity.registration.location')"
              prop="place"
            >
              <ElInput :prefix-icon="Location" v-model="activity.place" required />
            </ElFormItem>
            <ElFormItem
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
            </ElFormItem>
            <ElFormItem
              :label="t('activity.form.person', members.length)"
              v-if="activePage === 'member'"
            >
              <div class="w-full" style="flex-grow: 1">
                <ZActivityMemberList mode="card" :activity="activity as unknown as Activity" />
              </div>
            </ElFormItem>
            <ElFormItem label="Preview" v-if="activePage === 'review'" style="width: 100%">
              <div class="w-full" style="flex-grow: 1">
                <ZActivityDetails :activity="activity as unknown as Activity" mode="campus" />
              </div>
            </ElFormItem>
          </ElScrollbar>
          <div class="actions text-right pt-2">
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
