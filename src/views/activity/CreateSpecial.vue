<script setup lang="ts">
import { reactive } from 'vue'
import type { SpecialActivityCreate } from '@/../@types/activity'
import ObjectId from 'bson-objectid'
import {
  ElButton,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElTooltip,
ElNotification
} from 'element-plus'
import { ArrowRight, Refresh, InfoFilled } from '@element-plus/icons-vue'
import { getUser } from '@/api/user/crud'
import { createSpecialActivity } from '@/api/activity/create'

const subtypes: Array<{
  label: string
  value: SpecialActivityCreate['subtype']
  disabled?: boolean
}> = [
  {
    label: '校内义工',
    value: 'on-campus'
  },
  {
    label: '校外义工',
    value: 'off-campus'
  },
  {
    label: '大型实践',
    value: 'large-scale'
  }
]

const options = reactive<{ value: string; label: string }[]>([])

const activity = reactive<SpecialActivityCreate>({
  _id: new ObjectId().toHexString(),
  name: '',
  description: '',
  type: 'special',
  members: [],
  duration: 0,
  subtype: 'on-campus'
})

async function query(id: string) {
  while (options.length > 0) {
    options.pop()
  }
  if (id.length !== 8) return
  const result = await getUser(parseInt(id))
  if (result) {
    options.push({
      value: id,
      label: result.name
    })
  }
}

async function register() {
  const result = await createSpecialActivity(activity)
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
        content="特殊义工是管理员创建的义工，用于竞赛获奖，大型实践等场合。它的参与者无需填写感想。"
        effect="light"
        placement="top"
      >
        <p class="text-2xl py-2 px-4">创建特殊义工<ElButton :icon="InfoFilled" text size="small" circle /></p>
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
        <ElFormItem label="类型">
          <ElSelect v-model="activity.subtype" class="full">
            <ElOption
              v-for="subtype in subtypes"
              :key="subtype.value"
              :label="subtype.label"
              :value="subtype.value"
              :disabled="subtype.disabled"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="时长">
          <ElInput v-model.number="activity.duration" placeholder="请输入有效时长" />
        </ElFormItem>
        <ElFormItem label="成员">
          <ElSelect
            v-model="activity.members"
            placeholder="请输入成员"
            filterable
            allow-create
            multiple
            remote
            reserve-keyword
            remote-show-suffix
            :remote-method="query"
            class="full"
          >
            <ElOption
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
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
