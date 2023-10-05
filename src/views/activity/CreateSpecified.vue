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
  ElTooltip
} from 'element-plus'
import { ArrowRight, Delete, InfoFilled, Plus, Refresh } from '@element-plus/icons-vue'
import { createSpecifiedActivity } from '@/api/activity/create'

const activity = reactive<SpecifiedActivity>({
  _id: new ObjectId().toHexString(),
  name: '',
  description: '',
  type: 'specified',
  members: [],
  duration: 0,
  registration: {
    deadline: '',
    place: '',
    classes: [
      {
        class: 0,
        max: 0,
        min: 0
      }
    ]
  },
  time: ''
})

function createClass() {
  activity.registration.classes.push({
    class: 0,
    max: 0,
    min: 0
  })
}

function removeClass(id: number) {
  activity.registration.classes.splice(id, 1)
}

const inSchool = ref('校内义工')

async function register() {
  const result = await createSpecifiedActivity(activity)
  if (result.errorn === 1) {
    ElNotification({
      title: '创建成功',
      message: '义工 ID：' + result.data,
      type: 'success'
    })
  }
}
</script>

<template>
  <div class="px-24 full card">
    <ElCard shadow="hover" class="px-4">
      <ElTooltip
        content="指定义工是管理员创建的义工，以招募的形式发布，需要指定每个班可报名的最大人数。"
        effect="light"
        placement="top"
      >
        <p class="text-2xl py-2 px-4">
          创建指定义工<ElButton :icon="InfoFilled" text size="small" circle />
        </p>
      </ElTooltip>
      <ElForm class="py-4">
        <ElFormItem label="名称">
          <ElInput v-model="activity.name" placeholder="请输入名称" />
        </ElFormItem>
        <ElFormItem label="描述">
          <ElInput
            type="textarea"
            :autosize="{ minRows: 2 }"
            v-model="activity.description"
            placeholder="请输入描述"
          />
        </ElFormItem>
        <ElFormItem label="时间">
          <ElDatePicker
            class="full"
            style="width: 100%"
            type="datetime"
            v-model="activity.time"
            placeholder="请选择时间"
          />
        </ElFormItem>
        <ElFormItem label="子类">
          <ElInput v-model="inSchool" readonly />
        </ElFormItem>
        <ElFormItem label="报名" class="full">
          <ElCard shadow="hover" class="full">
            <ElForm label-position="left">
              <ElFormItem label="截止时间" class="py-2">
                <ElDatePicker
                  class="full"
                  style="width: 100%"
                  type="datetime"
                  v-model="activity.registration.deadline"
                  placeholder="请选择截止时间"
                />
              </ElFormItem>
              <ElFormItem label="义工地点" class="py-2">
                <ElInput v-model="activity.registration.place" placeholder="请输入义工地点" />
              </ElFormItem>
              <ElFormItem
                v-for="(classes, idx) in activity.registration.classes"
                :key="idx"
                label="参与班级"
                class="py-2"
              >
                <Transition
                  enter-active-class="animate__animated animate__fadeIn"
                  leave-active-class="animate__animated animate__fadeOut"
                  appear
                >
                  <ElRow class="full">
                    <ElCol :span="1">{{ idx + 1 }}</ElCol>
                    <ElCol :span="6">
                      <ElFormItem label="班级">
                        <ElInput v-model="classes.class" placeholder="请输入班级" />
                      </ElFormItem>
                    </ElCol>
                    <ElCol :span="1" />
                    <ElCol :span="6">
                      <ElFormItem label="最少人数">
                        <ElInput v-model.number="classes.min" placeholder="请输入最小人数" />
                      </ElFormItem>
                    </ElCol>
                    <ElCol :span="1" />
                    <ElCol :span="6">
                      <ElFormItem label="最多人数">
                        <ElInput v-model.number="classes.max" placeholder="请输入最大人数" />
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
        <ElFormItem label="名称">
          <ElInput v-model="activity.name" placeholder="请输入名称" />
        </ElFormItem>
        <div class="actions text-right">
          <ElButton type="warning" :icon="Refresh" text bg>重置</ElButton>
          <ElButton type="primary" :icon="ArrowRight" text bg @click="register">创建</ElButton>
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
