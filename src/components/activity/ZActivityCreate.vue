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
} from '@/../@types/activity'
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
  ElUpload,
  ElIcon,
  ElRow,
  ElCol,
  ElDivider
} from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { watch, ref } from 'vue'
import {
  Refresh,
  ArrowRight,
  UploadFilled,
  Plus,
  Delete,
  Location
} from '@element-plus/icons-vue'
import { ZSelectPerson, ZInputDuration, ZSelectActivityMode } from '@/components'
import api from '@/api'

const { t } = useI18n()
const { height } = useWindowSize()
const load = ref(false)

const props = defineProps<{
  type: ActivityType
}>()

const { type } = toRefs(props)

watch(type, () => {
  console.log(type)
})

const activity = reactive<ActivityInstance | Activity>({
  _id: '',
  type: type.value,
  name: '',
  description: '',
  members: [],
  duration: undefined as unknown as number,
  date: '',
  createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  creator: '',
  status: 'pending'
})

const registration = reactive<Registration>({
  deadline: '',
  place: '',
  classes: [
    {
      class: undefined as unknown as number,
      max: undefined as unknown as number
    }
  ]
})

const modeMap = {
  specified: 'on-campus',
  social: 'off-campus',
  scale: 'large-scale'
} as Record<ActivityType, ActivityMode>

const members = reactive<ActivityMember[]>([
  {
    _id: '',
    status: type.value === 'special' ? 'effective' : 'draft',
    impression: '',
    mode: modeMap[type.value],
    duration: activity.duration ?? (undefined as unknown as number),
    history: [],
    images: []
  }
])

const membersFunctions = {
  add() {
    members.push({
      _id: '',
      status: type.value === 'special' ? 'effective' : 'draft',
      impression: '',
      mode: modeMap[type.value],
      duration: members[0].duration ?? (undefined as unknown as number),
      history: [],
      images: []
    })
  },
  remove(ord: number) {
    members.splice(ord, 1)
  }
}

const registrationFunctions = {
  add() {
    registration.classes.push({
      class: undefined as unknown as number,
      max: undefined as unknown as number
    })
  },
  remove(ord: number) {
    registration.classes.splice(ord, 1)
  }
}

const special = reactive<Special>({
  classify: '' as unknown as SpecialActivityClassification,
  mode: '' as unknown as ActivityMode
})

const classifyOfSpecial = [
  'prize',
  'import',
  'club',
  'deduction',
  'other'
] as SpecialActivityClassification[]

const scrollableCardHeight = ref((height.value - 64) * 0.6)

watch(height, () => {
  scrollableCardHeight.value = (height.value - 64) * 0.6
})

async function submit() {
  load.value = true
  await api.activity.insert(activity, members, registration, special)
  load.value = false
}

function allow(): ActivityMode[] {
  if (activity.type === 'specified') return ['on-campus']
  if (activity.type === 'social') return ['off-campus']
  if (activity.type === 'scale') return ['large-scale']
  if (activity.type === 'special') {
    if (special.classify === 'prize') ['on-campus', 'off-campus']
    return ['on-campus', 'off-campus', 'large-scale']
  }
  return []
}
</script>

<template>
  <div class="px-6 py-3">
    <div class="p-4">
      <ElCard shadow="hover" class="full">
        <ElForm label-position="right" label-width="108px">
          <ElScrollbar :height="scrollableCardHeight + 'px'">
            <ElFormItem :label="t('activity.form.name')" required>
              <ElInput v-model="activity.name" />
            </ElFormItem>
            <ElFormItem :label="t('activity.form.description')">
              <ElInput v-model="activity.description" type="textarea" :autosize="{ minRows: 2 }" />
            </ElFormItem>
            <ElFormItem :label="t('activity.form.date')" required>
              <ElDatePicker
                v-if="type !== 'specified'"
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
            >
              <ElSelect v-model="special.classify" class="full">
                <ElOption
                  v-for="classify in classifyOfSpecial"
                  :key="classify"
                  :label="t('activity.special.classify.' + classify)"
                  :value="classify"
                />
              </ElSelect>
            </ElFormItem>
            <ElFormItem
              v-if="
                type === 'special' && (special.classify === 'club' || special.classify === 'import')
              "
              :label="t('activity.form.upload.name')"
            >
              <ElUpload
                class="full"
                drag
                accept="application/vnd.ms-excel, application/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              >
                <ElIcon class="el-icon--upload"><UploadFilled /></ElIcon>
                <div class="el-upload__text">{{ t('activity.form.upload.prompt') }}</div>
                <template #tip>
                  <div class="el-upload__tip">
                    {{
                      t('activity.form.upload.allow', {
                        type: 'Excel'
                      })
                    }}
                  </div>
                </template>
              </ElUpload>
            </ElFormItem>
            <ElFormItem v-if="type === 'specified'" :label="t('activity.registration.name')">
              <ElCard shadow="hover" class="full">
                <ElForm label-position="right" label-width="96px" class="full">
                  <ElFormItem :label="t('activity.registration.location')" class="py-2" required>
                    <ElInput :prefix-icon="Location" v-model="registration.place" required />
                  </ElFormItem>
                  <ElFormItem :label="t('activity.registration.deadline')" class="py-2" required>
                    <ElDatePicker
                      style="width: 100%"
                      type="datetime"
                      v-model="registration.deadline"
                      class="full"
                    />
                  </ElFormItem>
                  <div v-for="(classification, idx) in registration.classes" :key="idx">
                    <ElFormItem :label="t('activity.registration.class')" class="py-2" required>
                      <Transition
                        enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__fadeOut"
                        appear
                      >
                        <ElRow class="full">
                          <ElCol :span="16" :xs="12" :sm="14">
                            <ElInput
                              :placeholder="t('activity.registration.single.class')"
                              v-model.number="classification.class"
                              class="full"
                            >
                              <template #prepend>
                                {{ idx + 1 }}
                              </template>
                            </ElInput>
                          </ElCol>
                          <ElCol :span="1" style="text-align: center">
                            <ElDivider direction="vertical" />
                          </ElCol>
                          <ElCol :span="7" :xs="11" :sm="9">
                            <ElInput
                              :placeholder="t('activity.registration.single.max')"
                              v-model.number="classification.max"
                              class="full"
                            >
                              <template #append>
                                <ElButton
                                  :icon="idx === 0 ? Plus : Delete"
                                  @click="
                                    idx === 0
                                      ? registrationFunctions.add()
                                      : registrationFunctions.remove(idx)
                                  "
                                />
                              </template>
                            </ElInput>
                          </ElCol>
                        </ElRow>
                      </Transition>
                    </ElFormItem>
                  </div>
                </ElForm>
              </ElCard>
            </ElFormItem>
            <ElFormItem
              v-if="
                type !== 'special' || (special.classify !== 'club' && special.classify !== 'import')
              "
              :label="t('activity.form.person', members.length)"
              :required="type !== 'specified'"
            >
              <ElCard shadow="hover" class="w-full">
                <div v-for="(member, idx) in members" :key="idx" class="py-2 px-2">
                  <Transition
                    enter-active-class="animate__animated animate__fadeIn"
                    leave-active-class="animate__animated animate__fadeOut"
                    appear
                  >
                    <ElRow class="full">
                      <ElCol :span="10" :xs="8" :sm="8">
                        <ZSelectPerson
                          v-model="member._id"
                          :placeholder="t('activity.form.person')"
                          :filter-start="2"
                          full-width
                        >
                          <template #prepend> {{ idx + 1 }} </template>
                        </ZSelectPerson>
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
                        <ZInputDuration v-model="member.duration" />
                      </ElCol>
                      <ElCol :span="1">
                        <div style="text-align: right">
                          <ElButton
                            :icon="idx === 0 ? Plus : Delete"
                            @click="
                              idx === 0 ? membersFunctions.add() : membersFunctions.remove(idx)
                            "
                            :type="idx === 0 ? 'success' : 'danger'"
                            circle
                            text
                            bg
                          />
                        </div>
                      </ElCol>
                    </ElRow>
                  </Transition>
                </div>
              </ElCard>
            </ElFormItem>
          </ElScrollbar>
          <div class="actions text-right">
            <ElButton type="warning" :icon="Refresh" text bg>{{
              t('activity.form.actions.reset')
            }}</ElButton>
            <ElButton type="primary" :icon="ArrowRight" text bg @click="submit" :loading="load">{{
              t('activity.form.actions.submit')
            }}</ElButton>
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
