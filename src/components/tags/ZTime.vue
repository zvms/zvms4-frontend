<script setup lang="ts">
import { ref, toRefs } from 'vue'
import dayjs from 'dayjs'
import { Calendar, Clock } from '@element-plus/icons-vue'
import { ElButton } from 'element-plus'

const props = withDefaults(
  defineProps<{
    time: string
    type: 'date' | 'time' | 'datetime'
    format?: string
    size?: 'large' | 'default' | 'small'
    bg?: boolean
  }>(),
  {
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    type: 'datetime',
    format: 'YYYY-MM-DD HH:mm:ss',
    size: 'small',
    bg: true
  }
)

const { time, type, format } = toRefs(props)

const icon = ref(type.value === 'date' ? Calendar : Clock)

function getDateStatusColor(date: string) {
  const now = dayjs()
  const target = dayjs(date)
  if (target.isAfter(now, 'date')) return 'success'
  if (target.isBefore(now, 'date')) return 'warning'
  return 'primary'
}

function getFormattedTime(time: string, format: string) {
  return dayjs(time).format(format)
}
</script>

<template>
  <ElButton :icon="icon" :color="getDateStatusColor(time)" :size="size" text :bg="bg">
    {{ getFormattedTime(time, format) }}
  </ElButton>
</template>
