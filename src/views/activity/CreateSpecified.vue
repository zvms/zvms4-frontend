<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { SpecifiedActivity } from '@/../@types/activity'
import ObjectId from 'bson-objectid'
import {
  ElButton,
  ElCard,
  ElCol,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElInput,
  ElNotification,
  ElRow,
  ElTooltip,
  ElScrollbar
} from 'element-plus'
import {
  ArrowRight,
  Delete,
  InfoFilled,
  Plus,
  Refresh,
  Timer,
  Location
} from '@element-plus/icons-vue'
import { createActivity } from '@/api/activity/create'
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const activity = reactive<SpecifiedActivity>({
  _id: new ObjectId().toHexString(),
  name: '',
  description: '',
  type: 'specified',
  members: [],
  duration: undefined as unknown as number,
  registration: {
    deadline: '',
    place: '',
    classes: [
      {
        class: undefined as unknown as number,
        max: undefined as unknown as number,
        min: 0
      }
    ]
  },
  date: ''
})

function createClass() {
  activity.registration.classes.push({
    class: undefined as unknown as number,
    max: undefined as unknown as number,
    min: 0
  })
}

function removeClass(id: number) {
  activity.registration.classes.splice(id, 1)
}

const inSchool = ref(t('activity.columns.specifies.on-campus'))

async function register() {
  const result = await createActivity(activity)
  if (result) {
    ElNotification({
      title: '创建成功',
      message: '义工 ID：' + result,
      type: 'success'
    })
  }
}

const { width, height } = useWindowSize()
const scrollableCardHeight = (height.value - 64) * 0.6
</script>

<template>
  <div class="px-8 py-2 full card">
    <p class="text-2xl py-2 px-4">
      {{
        t('activity.columns.title', {
          create: t('activity.columns.actions.create'),
          type: t('activity.columns.types.specified')
        })
      }}<ElTooltip
        :content="t('activity.columns.explanations.specified')"
        effect="light"
        placement="top"
        ><ElButton :icon="InfoFilled" text circle size="small" />
      </ElTooltip>
    </p>
    <ElCard shadow="hover" class="px-4">
      <ElForm class="py-4" label-position="right" label-width="96px">
        <ElScrollbar :height="scrollableCardHeight + 'px'">
          <ElFormItem :label="t('activity.columns.name')">
            <ElInput
              v-model="activity.name"
              :placeholder="
                t('placeholder', {
                  action: t('activity.columns.actions.input'),
                  target: t('activity.columns.name')
                })
              "
            />
          </ElFormItem>
          <ElFormItem :label="t('activity.columns.description')">
            <ElInput
              type="textarea"
              :autosize="{ minRows: 2 }"
              v-model="activity.description"
              :placeholder="
                t('placeholder', {
                  action: t('activity.columns.actions.input'),
                  target: t('activity.columns.description')
                })
              "
            />
          </ElFormItem>
          <ElFormItem :label="t('activity.columns.time')">
            <ElDatePicker
              class="full"
              style="width: 100%"
              type="datetime"
              v-model="activity.date"
              :placeholder="
                t('placeholder', {
                  action: t('activity.columns.actions.pick'),
                  target: t('activity.columns.time')
                })
              "
            />
          </ElFormItem>
          <ElFormItem :label="t('activity.columns.duration')">
            <ElInput
              v-model.number="activity.duration"
              :prefix-icon="Timer"
              :placeholder="
                t('placeholder', {
                  action: t('activity.columns.actions.input'),
                  target: t('activity.columns.duration')
                })
              "
            />
          </ElFormItem>
          <ElFormItem :label="t('activity.columns.type')">
            <ElInput readonly v-model="inSchool" />
          </ElFormItem>
          <ElFormItem :label="t('activity.columns.registration.title')" class="full">
            <ElCard shadow="hover" class="full">
              <ElForm label-position="left">
                <ElFormItem :label="t('activity.columns.registration.deadline')" class="py-2">
                  <ElDatePicker
                    class="full"
                    style="width: 100%"
                    type="datetime"
                    v-model="activity.registration.deadline"
                    :placeholder="
                      t('placeholder', {
                        action: t('activity.columns.actions.input'),
                        target: t('activity.columns.registration.deadline')
                      })
                    "
                  />
                </ElFormItem>
                <ElFormItem :label="t('activity.columns.registration.location')" class="py-2">
                  <ElInput
                    v-model="activity.registration.place"
                    :prefix-icon="Location"
                    :placeholder="
                      t('placeholder', {
                        action: t('activity.columns.actions.input'),
                        target: t('activity.columns.registration.location')
                      })
                    "
                  />
                </ElFormItem>
                <ElFormItem
                  v-for="(classes, idx) in activity.registration.classes"
                  :key="idx"
                  :label="
                    t('activity.columns.registration.class', activity.registration.classes.length)
                  "
                  class="py-2"
                >
                  <Transition
                    enter-active-class="animate__animated animate__fadeIn"
                    leave-active-class="animate__animated animate__fadeOut"
                    appear
                  >
                    <ElRow class="full">
                      <ElCol :span="1">{{ idx + 1 }}</ElCol>
                      <ElCol :span="width > height ? 6 : 8">
                        <ElFormItem>
                          <ElInput
                            v-model="classes.class"
                            :placeholder="
                              t('placeholder', {
                                action: t('activity.columns.actions.input'),
                                target: t('activity.columns.registration.single-class.class')
                              })
                            "
                          />
                        </ElFormItem>
                      </ElCol>
                      <ElCol :span="1" />
                      <ElCol v-if="width > height" :span="6">
                        <ElFormItem :label="t('activity.columns.registration.single-class.min')">
                          <ElInput
                            v-model.number="classes.min"
                            :placeholder="
                              t('placeholder', {
                                action: t('activity.columns.actions.input'),
                                target: t('activity.columns.registration.single-class.min-text')
                              })
                            "
                          />
                        </ElFormItem>
                      </ElCol>
                      <ElCol v-if="width > height" :span="1" />
                      <ElCol :span="width > height ? 6 : 8">
                        <ElFormItem :label="t('activity.columns.registration.single-class.max')">
                          <ElInput
                            v-model.number="classes.max"
                            :placeholder="
                              t('placeholder', {
                                action: t('activity.columns.actions.input'),
                                target: t('activity.columns.registration.single-class.max-text')
                              })
                            "
                          />
                        </ElFormItem>
                      </ElCol>
                      <ElCol :span="1" />
                      <ElCol :span="2" class="full text-right">
                        <ElButton
                          text
                          bg
                          circle
                          :type="idx === 0 ? 'success' : 'danger'"
                          :icon="idx === 0 ? Plus : Delete"
                          @click="idx === 0 ? createClass() : removeClass(idx)"
                        />
                      </ElCol>
                    </ElRow>
                  </Transition>
                </ElFormItem>
              </ElForm>
            </ElCard>
          </ElFormItem>
        </ElScrollbar>
        <div class="actions text-right">
          <ElButton type="warning" :icon="Refresh" text bg>{{
            t('activity.columns.actions.reset')
          }}</ElButton>
          <ElButton type="primary" :icon="ArrowRight" text bg>{{
            t('activity.columns.actions.create')
          }}</ElButton>
        </div>
      </ElForm>
    </ElCard>
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
