<script lang="ts" setup>
import type {
  ActivityMember,
  ActivityInstance,
  ActivityType,
  Registration,
  SpecialActivityClassification,
  ActivityMode,
  Special,
  Activity
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
  ElDivider,
  ElRadioGroup,
  ElRadio,
  ElUpload
} from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { watch, ref } from 'vue'
import { Refresh, ArrowRight, Plus, Delete, Location, UploadFilled } from '@element-plus/icons-vue'
import { ZSelectPerson, ZInputDuration, ZSelectActivityMode } from '@/components'
import api from '@/api'
import { validateActivity } from './validation'
import { generateActivity } from '@/utils/generate'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { baseURL } from '@/plugins/axios'

const { t } = useI18n()
const { height } = useWindowSize()
const router = useRouter()
const load = ref(false)
const userStore = useUserStore()

const props = defineProps<{
  type: ActivityType
}>()

const { type } = toRefs(props)

const activity = reactive<ActivityInstance | Activity>({
  _id: '',
  type: type.value,
  name: '',
  description: '',
  members: [],
  date: '',
  createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  creator: '',
  status: 'effective',
  approver: ''
})

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
    mode: modeMap[type.value],
    duration: undefined as unknown as number
  }
])

const membersFunctions = {
  add() {
    members.push({
      _id: '',
      status: 'effective',
      mode: modeMap[type.value],
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

const classifyOfSpecial = ['prize', 'import', 'club', 'other'] as SpecialActivityClassification[]

const scrollableCardHeight = ref((height.value - 64) * 0.6)

watch(height, () => {
  scrollableCardHeight.value = (height.value - 64) * 0.6
})

async function submit() {
  load.value = true
  await api.activity.insert(activity, members, registration, special)
  load.value = false
  router.push(
    '/activities/' +
    (userStore.position.includes('admin') || userStore.position.includes('department')
      ? 'campus'
      : userStore.position.includes('secretary')
        ? 'class'
        : 'mine')
  )
}

function allow(): ActivityMode[] {
  if (activity.type === 'specified') return ['on-campus']
  if (activity.type === 'social') return ['off-campus']
  if (activity.type === 'scale') return ['social-practice']
  if (activity.type === 'special') {
    if (special.classify === 'prize') return ['on-campus', 'off-campus']
    return ['on-campus', 'off-campus', 'social-practice']
  }
  return []
}

const validated = ref(false)

watch(
  () => generateActivity(activity, members, approveStudent.value, registration, special),
  () => {
    validated.value = validateActivity(
      generateActivity(activity, members, approveStudent.value, registration, special)
    )
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
            <ElFormItem prop="name" :label="t('activity.form.name')" required
              :rules="[{ required: true, message: t('validation.create.name.required') }]">
              <ElInput v-model="activity.name" />
            </ElFormItem>
            <ElFormItem :label="t('activity.form.description')">
              <ElInput v-model="activity.description" type="textarea" :autosize="{ minRows: 2 }" />
            </ElFormItem>
            <ElFormItem v-if="type !== 'special'" :label="t('activity.form.type')" required prop="type">
              <ElSelect v-model="activity.type" class="full" disabled>
                <ElOption v-for="type in ['specified', 'social', 'scale']" :key="type"
                  :label="t('activity.form.type.' + type)" :value="type" />
              </ElSelect>
            </ElFormItem>
            <ElFormItem :label="t('activity.form.date')" required prop="date"
              :rules="[{ required: true, message: t('validation.create.date.required') }]">
              <ElDatePicker v-if="type !== 'specified'" class="full" style="width: 100%" v-model="activity.date" />
              <ElDatePicker v-else class="full" style="width: 100%" v-model="activity.date" type="datetime" />
            </ElFormItem>
            <ElFormItem v-if="type === 'special'" :label="t('activity.special.classify.name')" required
              :rules="[{ required: true, message: t('validation.create.classify.required') }]">
              <ElSelect v-model="special.classify" class="full">
                <ElOption v-for="classify in classifyOfSpecial" :key="classify"
                  :label="t('activity.special.classify.' + classify)" :value="classify" />
              </ElSelect>
            </ElFormItem>
            <ElFormItem v-if="type === 'specified'" :label="t('activity.registration.location')"
              prop="registration.place">
              <ElInput :prefix-icon="Location" v-model="registration.place" required />
            </ElFormItem>
            <ElFormItem required :label="t('activity.registration.approver')" style="width: 100%">
              <ElRow style="width: 100%">
                <ElCol :span="8">
                  <ElRadioGroup v-model="activity.approver">
                    <ElRadio border value="authority">
                      {{ t('activity.registration.approvers.authority') }}
                    </ElRadio>
                    <ElRadio border value="member">
                      {{ t('activity.registration.approvers.member') }}
                    </ElRadio>
                  </ElRadioGroup>
                </ElCol>
                <ElCol :span="16" style="width: 100%" v-if="activity.approver === 'member'">
                  <ZSelectPerson style="width: 100%" v-model="approveStudent" :filter-start="6" />
                </ElCol>
              </ElRow>
            </ElFormItem>
            <ElFormItem v-if="type !== 'special' || special.classify !== 'import'"
              :label="t('activity.form.person', members.length)" :required="type !== 'specified'">
              <ElCard shadow="hover" class="w-full">
                <div v-for="(member, idx) in members" :key="idx" class="py-2 px-2">
                  <Transition enter-active-class="animate__animated animate__fadeIn"
                    leave-active-class="animate__animated animate__fadeOut" appear>
                    <ElForm :model="member">
                      <ElRow class="full">
                        <ElCol :span="10" :xs="8" :sm="8">
                          <ElFormItem prop="_id" :rules="[
                            {
                              required: true,
                              message: t('validation.create.member.person.required')
                            }
                          ]">
                            <ZSelectPerson v-model="member._id" :placeholder="t('activity.form.person')"
                              :filter-start="6" full-width>
                              <template #prepend> {{ idx + 1 }}</template>
                            </ZSelectPerson>
                          </ElFormItem>
                        </ElCol>
                        <ElCol :span="1" style="text-align: center">
                          <ElDivider direction="vertical" />
                        </ElCol>
                        <ElCol :span="8" :xs="6" :sm="6">
                          <ZSelectActivityMode v-model="member.mode" :allow="allow()" />
                        </ElCol>
                        <ElCol :span="1" style="text-align: center">
                          <ElDivider direction="vertical" />
                        </ElCol>
                        <ElCol :span="5" :xs="7" :sm="7">
                          <ZInputDuration v-model.number="member.duration" />
                        </ElCol>
                        <ElCol :span="1">
                          <div style="text-align: right">
                            <ElButton :icon="idx === 0 ? Plus : Delete" @click="
                              idx === 0 ? membersFunctions.add() : membersFunctions.remove(idx)
                              " :type="idx === 0 ? 'success' : 'danger'" circle text bg />
                          </div>
                        </ElCol>
                      </ElRow>
                    </ElForm>
                  </Transition>
                </div>
              </ElCard>
            </ElFormItem>
            <ElFormItem v-else label="Upload" required>
              <ElUpload ref="uploadRef" drag :action="baseURL + '/activity/upload'" multiple :auto-upload="false">
                <el-icon class="el-icon--upload">
                  <UploadFilled />
                </el-icon>
                <div class="el-upload__text">
                  Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    xls/xlsx files with a size less than 2 MB.
                  </div>
                </template>
              </ElUpload>
            </ElFormItem>
          </ElScrollbar>
          <div class="actions text-right">
            <ElButton type="warning" :icon="Refresh" text bg>
              {{ t('activity.form.actions.reset') }}
            </ElButton>
            <ElButton type="primary" :icon="ArrowRight" text bg @click="submit" :loading="load" :disabled="!validated">
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
