<script lang="ts" setup>
import type {
  ActivityInstance,
  ActivityType,
  PrizeClassify,
  PrizeLevel,
  PrizeType,
  Registration,
  SpecialActivityClassification
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
  ElTooltip,
  ElCard,
  ElUpload,
  ElIcon,
  ElRow,
  ElCol,
  ElDivider
} from 'element-plus'
import { useWindowSize } from '@vueuse/core'
import { watch } from 'vue'
import { ref } from 'vue'
import {
  InfoFilled,
  Refresh,
  ArrowRight,
  UploadFilled,
  Plus,
  Delete,
  Location
} from '@element-plus/icons-vue'

const { t } = useI18n()
const { width, height } = useWindowSize()

const props = defineProps<{
  type: ActivityType
}>()

const { type } = toRefs(props)

watch(type, () => {
  console.log(type)
})

const activity = reactive<ActivityInstance>({
  _id: '',
  type: type.value,
  name: '',
  description: '',
  members: [],
  duration: undefined as unknown as number,
  date: '',
  createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
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

const special = reactive({
  classify: '' as unknown as SpecialActivityClassification,
  prize: {
    level: '' as unknown as PrizeLevel,
    type: '' as unknown as PrizeType,
    classify: '' as unknown as PrizeClassify
  }
})

const prize = {
  level: ['district', 'city', 'province', 'national', 'international'],
  type: ['personal', 'team'],
  classify: ['sports', 'academy', 'art', 'other']
}

const mode = ['on-campus', 'off-campus', 'large-scale']

const classifyOfSpecial = ['prize', 'import', 'club', 'deduction', 'other']

const scrollableCardHeight = ref((height.value - 64) * 0.6)

watch(height, () => {
  scrollableCardHeight.value = (height.value - 64) * 0.6
})
</script>

<template>
  <div class="px-6 py-3">
    <p class="pl-4 text-2xl">
      {{
        t('activity.form.title', {
          type: t('activity.type.' + type + '.name')
        })
      }}
      <ElTooltip
        :content="t('activity.type.' + type + '.description')"
        effect="light"
        placement="top"
        ><ElButton :icon="InfoFilled" text circle size="small" />
      </ElTooltip>
    </p>
    <div class="p-4">
      <ElCard shadow="hover" class="full">
        <ElForm label-position="right" label-width="96px">
          <ElScrollbar :height="scrollableCardHeight + 'px'">
            <ElFormItem :label="t('activity.form.name')" required>
              <ElInput v-model="activity.name" />
            </ElFormItem>
            <ElFormItem :label="t('activity.form.description')">
              <ElInput v-model="activity.description" type="textarea" :autosize="{ minRows: 2 }" />
            </ElFormItem>
            <ElFormItem :label="t('activity.form.date')" required>
              <ElDatePicker class="full" style="width: 100%" v-model="activity.date" />
            </ElFormItem>
            <ElFormItem v-if="type === 'special'" :label="t('activity.special.classify.name')" required>
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
              v-if="type === 'special' && special.classify === 'prize'"
              :label="t('activity.special.prize.name')"
            >
              <ElCard shadow="hover" class="full">
                <ElForm label-position="right" label-width="64px" class="full">
                  <ElFormItem :label="t('activity.special.prize.level.name')" class="py-1" required>
                    <ElSelect v-model="special.prize.level" class="full">
                      <ElOption
                        v-for="level in prize.level"
                        :key="level"
                        :label="t('activity.special.prize.level.' + level)"
                        :value="level"
                      />
                    </ElSelect>
                  </ElFormItem>
                  <ElFormItem :label="t('activity.special.prize.type.name')" class="py-1" required>
                    <ElSelect v-model="special.prize.type" class="full">
                      <ElOption
                        v-for="prizeType in prize.type"
                        :key="prizeType"
                        :label="t('activity.special.prize.type.' + prizeType)"
                        :value="prizeType"
                      />
                    </ElSelect>
                  </ElFormItem>
                  <ElFormItem :label="t('activity.special.prize.classify.name')" class="py-1" required>
                    <ElSelect v-model="special.prize.classify" class="full">
                      <ElOption
                        v-for="classify in prize.classify"
                        :key="classify"
                        :label="t('activity.special.prize.classify.' + classify)"
                        :value="classify"
                      />
                    </ElSelect>
                  </ElFormItem>
                </ElForm>
              </ElCard>
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
                <ElForm label-position="right" label-width="84px" class="full">
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
                              v-mode="classification.class"
                            >
                              <template #prepend> {{ idx + 1 }} </template>
                            </ElInput>
                          </ElCol>
                          <ElCol :span="2" style="text-align: center">
                            <ElDivider direction="vertical" />
                          </ElCol>
                          <ElCol :span="6" :xs="10" :sm="8">
                            <ElInput
                              :placeholder="t('activity.registration.single.max')"
                              v-model.number="classification.max"
                              class="full"
                            >
                              <template #append>
                                <ElButton
                                  :icon="idx === 0 ? Plus : Delete"
                                  circle
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
          </ElScrollbar>
          <div class="actions text-right">
            <ElButton type="warning" :icon="Refresh" text bg>{{
              t('activity.form.actions.reset')
            }}</ElButton>
            <ElButton type="primary" :icon="ArrowRight" text bg>{{
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
