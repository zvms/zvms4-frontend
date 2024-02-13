<script setup lang="ts">
import type { Trophy } from '@zvms/zvms4-types'
import { Delete, Plus, Timer, User } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElSelect,
  ElOption,
  ElSwitch,
  ElIcon,
  ElNotification,
  ElCard,
  ElRow,
  ElCol,
  ElDatePicker,
} from 'element-plus'
import { useI18n } from 'vue-i18n'
import { trophyLevelMap, trophyTypeMap } from './trophy'
import { ArrowRight, Refresh } from '@element-plus/icons-vue'
import api from '@/api'
import {
  calculateLevelsOfArtAwards,
  calculateLevelsOfAcademicSubjects,
  calculateLevelsOfSportsAwards
} from './auto'
import { watch, toRefs, reactive } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const user = useUserStore()
const { t, locale } = useI18n()
const router = useRouter()

const props = withDefaults(
  defineProps<{
    autoCreate?: boolean
  }>(),
  {
    autoCreate: true
  }
)

const { autoCreate } = toRefs(props)

const trophy = reactive<Omit<Trophy, '_id'>>({
  name: '',
  type: '' as unknown as Trophy['type'],
  level: '' as unknown as Trophy['level'],
  awards: [
    {
      name: '',
      duration: undefined as unknown as number
    }
  ],
  team: false,
  status: 'pending',
  members: [],
  creator: user._id,
  instructor: '',
  time: '',
  deadline: '',
  createdAt: dayjs().toISOString(),
})

function calculate() {
  if (!autoCreate.value) {
    trophy.awards = [
      {
        name: '',
        duration: undefined as unknown as number
      }
    ]
    return
  }
  if (trophy.type && trophy.level && autoCreate.value) {
    trophy.awards = []
    if (trophy.type === 'art') {
      trophy.awards.push(
        ...calculateLevelsOfArtAwards(trophy.level, trophy.team, locale.value as 'zh-CN' | 'en-US')
      )
    } else if (trophy.type === 'academic') {
      trophy.awards.push(
        ...calculateLevelsOfAcademicSubjects(trophy.level, locale.value as 'zh-CN' | 'en-US')
      )
    } else if (trophy.type === 'sports') {
      trophy.awards.push(
        ...calculateLevelsOfSportsAwards(trophy.level, locale.value as 'zh-CN' | 'en-US')
      )
    }
  }
}

watch(() => trophy.type, calculate)
watch(() => trophy.level, calculate)
watch(autoCreate, calculate)
watch(locale, calculate)

async function createTrophy() {
  const result = await api.trophy.insert(trophy)
  if (result) {
    ElNotification({
      title: 'Trophy Created',
      message: 'Trophy has been created successfully',
      type: 'success'
    })
  } else {
    ElNotification({
      title: 'Trophy Creation Failed',
      message: 'Trophy creation failed',
      type: 'error'
    })
  }
  resetForm()
  router.push('/trophy')
}

function resetForm() {
  trophy.name = ''
  trophy.type = '' as unknown as Trophy['type']
  trophy.level = '' as unknown as Trophy['level']
  trophy.awards = [
    {
      name: '',
      duration: undefined as unknown as number
    }
  ]
  trophy.team = false
  trophy.instructor = ''
}
</script>

<template>
  <Transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    appear
  >
    <div class="px-16">
      <ElCard shadow="never">
        <ElForm label-position="right" label-width="96px">
          <ElFormItem :label="t('activity.trophy.field.name')" required>
            <ElInput v-model="trophy.name" />
          </ElFormItem>
          <ElFormItem :label="t('activity.form.date')" required>
            <ElDatePicker type="date" v-model="trophy.time" style="width: 100%" />
          </ElFormItem>
          <ElFormItem :label="t('activity.trophy.field.type')" required>
            <ElSelect v-model="trophy.type">
              <ElOption
                v-for="item in trophyTypeMap"
                :key="item.value"
                :label="t(`activity.trophy.type.${item.value}`)"
                :value="item.value"
              />
            </ElSelect>
            <template #prefix>
              <ElIcon>
                <component :is="trophyTypeMap.find((x) => x.value === trophy.type)?.icon" />
              </ElIcon>
            </template>
          </ElFormItem>
          <ElFormItem :label="t('activity.trophy.field.level')" required>
            <ElSelect v-model="trophy.level">
              <ElOption
                v-for="item in trophyLevelMap"
                :key="item.value"
                :label="t(`activity.trophy.level.${item.value}`)"
                :value="item.value"
              />
            </ElSelect>
            <template #prefix>
              <ElIcon>
                <component :is="trophyLevelMap.find((x) => x.value === trophy.level)?.icon" />
              </ElIcon>
            </template>
          </ElFormItem>
          <ElFormItem :label="t('activity.trophy.field.awards', trophy.awards.length)" required>
            <Transition
              v-for="(item, idx) in trophy.awards"
              :key="idx"
              enter-active-class="animate__animated animate__fadeIn"
              leave-active-class="animate__animated animate__fadeOut"
              appear
            >
              <ElRow :class="['w-full', idx === 0 ? '' : 'pt-2']">
                <ElCol :xs="10" :sm="10" :span="10" :lg="9" :xl="8">
                  <ElInput v-model="item.name" :placeholder="t('activity.form.name')">
                    <template #prefix>
                      <span class="px-1">{{ idx + 1 }}</span>
                    </template>
                  </ElInput>
                </ElCol>
                <ElCol :span="1" :lg="2" :xl="4" />
                <ElCol :xs="10" :sm="10" :span="10" :lg="9" :xl="8">
                  <ElInput
                    v-model="item.duration"
                    type="number"
                    :prefix-icon="Timer"
                    :placeholder="t('activity.impression.reward')"
                    @keydown.enter="
                      trophy.awards.push({ name: '', duration: undefined as unknown as number })
                    "
                  >
                    <template #append>{{ item.duration <= 1 ? 'hr' : 'hrs' }}</template>
                  </ElInput>
                </ElCol>
                <ElCol style="text-align: right" :xs="3" :sm="2" :md="3" :lg="4" :xl="4">
                  <ElButton
                    text
                    bg
                    circle
                    :type="idx === 0 ? 'success' : 'danger'"
                    :icon="idx === 0 ? Plus : Delete"
                    tabindex="-1"
                    :disabled="trophy.awards.length >= 10 && idx === 0"
                    @click="
                      idx === 0
                        ? trophy.awards.push({ name: '', duration: undefined as unknown as number })
                        : trophy.awards.splice(idx, 1)
                    "
                  />
                </ElCol>
              </ElRow>
            </Transition>
          </ElFormItem>
          <ElFormItem
            :label="t('activity.trophy.field.team')"
            v-if="trophy.type === 'art'"
            required
          >
            <ElSwitch v-model="trophy.team" />
          </ElFormItem>
          <ElFormItem :label="t('activity.trophy.instructor')" required>
            <ElInput v-model="trophy.instructor" :prefix-icon="User" />
          </ElFormItem>
          <ElFormItem :label="t('activity.registration.deadline')" required>
            <ElDatePicker type="datetime" v-model="trophy.deadline" style="width: 100%" />
          </ElFormItem>
          <div class="flex justify-end">
            <ElButton class="px-2" text bg type="warning" :icon="Refresh" @click="resetForm">
              {{ t('activity.form.actions.reset') }}
            </ElButton>
            <ElButton class="px-2" text bg type="primary" :icon="ArrowRight" @click="createTrophy">
              {{ t('activity.form.actions.submit') }}
            </ElButton>
          </div>
        </ElForm>
      </ElCard>
    </div>
  </Transition>
</template>
