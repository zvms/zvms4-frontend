<script setup lang="ts">
import { getUser } from '@/api/user/crud'
import { ElSelect, ElOption } from 'element-plus'
import { ref, toRefs } from 'vue'

const props = defineProps<{
  modelValue: number | number[]
  filterStart: number // 位数，6-8
  fullWidth?: boolean
  disabled?: boolean
  multiple?: boolean
}>()

const { modelValue, filterStart, fullWidth, disabled, multiple } = toRefs(props)

const number = ref<number | number[]>(modelValue.value)
const options = [] as Array<{ label: string; value: string; disabled?: boolean; number: number }>

const load = ref(false)

async function filter(number: number) {
  load.value = true
  while (options.length > 0) options.pop()
  if (number.toString().length >= filterStart.value) {
    const result = await getUser(number)
    if (result) {
      options.push({ label: result.name, value: result._id, number: result.id })
    }
  }
  load.value = false
}
</script>

<template>
  <ElSelect
    v-model="number"
    :disabled="disabled"
    :style="{ width: fullWidth ? '100%' : 'auto' }"
    :filter-method="filter"
    :loading="load"
  >
    <ElOption
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      filterable
      :multiple="multiple"
      remote
    >
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #aaaaaa; font-size: 13px">{{ item.number }}</span>
    </ElOption>
  </ElSelect>
</template>
