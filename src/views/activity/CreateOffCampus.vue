<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { OffCampusActivityCreate } from '@/../@types/activity'
import ObjectId from 'bson-objectid'
import {
  ElButton,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTooltip
} from 'element-plus'
import { ArrowRight, Refresh, InfoFilled, Timer } from '@element-plus/icons-vue'
import { getUser } from '@/api/user/crud'

const subtype = ref('校外义工')

const options = reactive<{ value: string; label: string }[]>([])

const activity = reactive<OffCampusActivityCreate>({
  _id: new ObjectId().toHexString(),
  name: '',
  description: '',
  members: [],
  type: 'off-campus',
  duration: undefined as unknown as number,
  time: ''
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
</script>

<template>
  <div class="px-8 py-2 full card">
    <p class="text-2xl py-2 px-4">
      创建校外义工<ElTooltip
        content="校外义工是任何人都可以创建的义工，创建时必须指定所有参加者。"
        effect="light"
        placement="top"
        ><ElButton :icon="InfoFilled" text circle size="small" />
      </ElTooltip>
    </p>
    <ElCard shadow="hover" class="px-4">
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
        <ElFormItem label="种类">
          <ElInput readonly v-model="subtype" />
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
        <ElFormItem label="时长">
          <ElInput v-model.number="activity.duration" :prefix-icon="Timer" placeholder="请输入有效时长" />
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
          <ElButton type="primary" :icon="ArrowRight" text bg>创建</ElButton>
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
