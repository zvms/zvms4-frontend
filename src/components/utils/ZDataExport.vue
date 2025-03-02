<script setup lang="ts">
import {
  ElForm,
  ElFormItem,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElText,
  ElProgress,
  ElInput
} from 'element-plus'
import api from '@/api'
import { ref, toRefs } from 'vue'
import dayjs, { type Dayjs } from 'dayjs'
import { Box, Download } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import 'dayjs/locale/zh-cn'

const props = defineProps<{
  type: 'time' | 'users' | 'activities',
  modelValue: boolean
}>()
const emits = defineEmits(['update:modelValue'])
const { t, locale } = useI18n()
const { type } = toRefs(props)

function getDateExpression(date: Dayjs) {
  if (locale.value === 'zh-CN') {
    dayjs.locale('zh-cn')
    return date.format('YYYY 年 MM 月 DD 日')
  } else if (locale.value === 'en-US') {
    dayjs.locale('en')
    return date.format('MMMM D, YYYY')
  }
}

function getFileName(range: [Dayjs?, Dayjs?]) {
  const dateMark = (range[0] && range[1]) ? `${getDateExpression(range[0])}–${getDateExpression(range[1])}` : ''
  return locale.value === 'zh-CN' ? `${dateMark}数据导出` : `Export data of ${dateMark}`
}

const formats = [
  {
    label: 'Excel',
    value: 'excel'
  },
  {
    label: 'CSV',
    value: 'csv'
  },
  {
    label: 'JSON',
    value: 'json'
  },
  {
    label: 'LaTeX',
    value: 'latex'
  },
  {
    label: 'HTML',
    value: 'html'
  }
] as const

type FormatType = (typeof formats)[number]['value']

const name = ref('')
const range = ref<[string, string]>(['', ''])
const format = ref<FormatType>('excel')
const taskID = ref('')
const percentage = ref(0)
const color = ref<'' | 'success' | 'exception' | 'warning'>('warning')
const status = ref<'pending' | 'processing' | 'completed' | 'failed'>('pending')

async function createTask() {
  const result = await api.exports.create(
    type.value,
    format.value,
    range.value[0] ? dayjs(range.value[0]) : undefined,
    range.value[1] ? dayjs(range.value[1]) : undefined
  )
  if (result) {
    taskID.value = result
  }
  const interval = setInterval(async () => {
    const result = await api.exports.query(taskID.value).catch(() => {
      color.value = 'exception'
      clearInterval(interval)
    })
    if (result) {
      percentage.value = parseFloat(result.percentage.toFixed(2))
      status.value = result.status
      if (result.status === 'completed') {
        color.value = 'success'
        clearInterval(interval)
      } else if (result.status === 'failed') {
        color.value = 'exception'
        clearInterval(interval)
      } else if (result.status === 'pending' || percentage.value < 10.0) {
        color.value = 'warning'
      } else {
        color.value = ''
      }
    } else {
      color.value = 'exception'
      clearInterval(interval)
    }
  }, 1500)
}

function cleanup() {
  name.value = ''
  format.value = 'excel'
  status.value = 'pending'
  taskID.value = ''
  range.value = ['', '']
  color.value = 'warning'
  emits('update:modelValue', false)
}

async function download() {
  await api.exports.download(taskID.value, name.value, format.value)
  cleanup()
}
</script>

<template>
  <div>
    <ElForm label-position="right" label-width="108px">
      <ElFormItem :label="t('manage.exports.range.label')">
        <ElDatePicker
          v-model="range"
          class="w-full"
          type="datetimerange"
          @blur="name = getFileName(range.map(x => x ? dayjs(x) : undefined) as [Dayjs?, Dayjs?])"
          :range-separator="t('manage.exports.range.to')"
          :start-placeholder="t('manage.exports.range.start')"
          :end-placeholder="t('manage.exports.range.end')"
        />
      </ElFormItem>
      <ElFormItem :label="t('manage.exports.format')">
        <ElSelect v-model="format" class="w-full">
          <ElOption
            v-for="format in formats"
            :value="format.value"
            :key="format.value"
            :label="t('manage.exports.formats.' + format.value)"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem :label="t('manage.exports.name')">
        <ElInput v-model="name" />
      </ElFormItem>
      <div style="text-align: right">
        <ElButton
          @click="createTask"
          class="w-full"
          :icon="Box"
          text
          bg
          type="primary"
          style="text-align: right"
        >
          {{ t('manage.exports.actions.export') }}
        </ElButton>
      </div>
    </ElForm>
    <ElText type="info" v-if="taskID">
      {{ t('manage.exports.prompt', { task: taskID }) }}
    </ElText>
    <ElProgress
      v-if="taskID"
      :percentage="(status === 'pending' || percentage <= 10) ? 100 : percentage"
      :indeterminate="status === 'pending' || percentage <= 10"
      :duration="3"
      :status="color"
    />
    <ElButton
      class="w-full"
      :icon="Download"
      v-if="status === 'completed'"
      text
      bg
      type="success"
      @click="download"
    >
      {{ t('manage.exports.actions.download') }}
    </ElButton>
  </div>
</template>

<style scoped></style>
