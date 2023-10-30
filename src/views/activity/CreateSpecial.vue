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
  ElNotification,
  ElDatePicker
} from 'element-plus'
import { ArrowRight, Refresh, InfoFilled, Timer, Star } from '@element-plus/icons-vue'
import { getUser } from '@/api/user/crud'
import { createActivity } from '@/api/activity/create'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const subtypes: Array<{
  value: SpecialActivityCreate['subtype']
  disabled?: boolean
}> = [
  {
    value: 'on-campus'
  },
  {
    value: 'off-campus'
  },
  {
    value: 'large-scale'
  }
]

const classifies: Array<{
  label: string
  value: SpecialActivityCreate['classify']
  disabled?: boolean
}> = [
  {
    label: t('activity.columns.specials.prize'),
    value: 'prize'
  },
  {
    label: t('activity.columns.specials.import'),
    value: 'import'
  },
  {
    label: t('activity.columns.specials.scale'),
    value: 'scale'
  },
  {
    label: t('activity.columns.specials.club'),
    value: 'club'
  },
  {
    label: t('activity.columns.specials.other'),
    value: 'other'
  }
]

const options = reactive<{ value: string; label: string }[]>([])

const activity = reactive<SpecialActivityCreate>({
  _id: new ObjectId().toHexString(),
  name: '',
  description: '',
  type: 'special',
  members: [],
  duration: undefined as unknown as number,
  subtype: '' as unknown as 'on-campus' | 'off-campus' | 'large-scale',
  date: '',
  classify: '' as unknown as SpecialActivityCreate['classify']
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
  const result = await createActivity(activity)
  if (result) {
    ElNotification({
      title: '创建成功',
      message: ('义工 ID：' + result) as string,
      type: 'success'
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
          type: t('activity.columns.types.special')
        })
      }}<ElTooltip
        :content="t('activity.columns.explanations.special')"
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
        <ElFormItem :label="t('activity.columns.classify')">
          <ElSelect
            v-model="activity.classify"
            class="full"
            :prefix-icon="Star"
            :placeholder="
              t('placeholder', {
                action: t('activity.columns.actions.select'),
                target: t('activity.columns.classify')
              })
            "
          >
            <ElOption
              v-for="classify in classifies"
              :key="classify.value"
              :label="t('activity.columns.specials.' + classify.value)"
              :value="classify.value"
              :disabled="classify.disabled"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem :label="t('activity.columns.type')">
          <ElSelect
            v-model="activity.subtype"
            class="full"
            :prefix-icon="Star"
            :placeholder="
              t('placeholder', {
                action: t('activity.columns.actions.select'),
                target: t('activity.columns.type')
              })
            "
          >
            <ElOption
              v-for="subtype in subtypes"
              :key="subtype.value"
              :label="t('activity.columns.specifies.' + subtype.value)"
              :value="subtype.value"
              :disabled="subtype.disabled"
            />
          </ElSelect>
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
