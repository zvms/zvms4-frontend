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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const subtype = ref(t('activity.columns.specifies.off-campus'))

const options = reactive<{ value: string; label: string }[]>([])

const activity = reactive<OffCampusActivityCreate>({
  _id: new ObjectId().toHexString(),
  name: '',
  description: '',
  members: [],
  type: 'off-campus',
  duration: undefined as unknown as number,
  date: ''
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
      {{
        t('activity.columns.title', {
          create: t('activity.columns.actions.create'),
          type: t('activity.columns.types.off-campus')
        })
      }}<ElTooltip
        :content="t('activity.columns.explanations.off-campus')"
        effect="light"
        placement="top"
        ><ElButton :icon="InfoFilled" text circle size="small" />
      </ElTooltip>
    </p>
    <ElCard shadow="hover" class="px-4">
      <ElForm class="py-4" label-position="right" label-width="96px">
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
          <ElInput readonly v-model="subtype" />
        </ElFormItem>
        <ElFormItem :label="t('activity.columns.person', activity.members.length)">
          <ElSelect
            v-model="activity.members"
            :placeholder="
              t('placeholder', {
                action: t('activity.columns.actions.select'),
                target: t('activity.columns.person', activity.members.length)
              })
            "
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
