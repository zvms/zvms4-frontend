<script setup lang="ts">
import { getUser } from '@/api/user/crud'
import { ElSelect, ElOption } from 'element-plus'
import { ref, watch, toRefs } from 'vue'

const props = defineProps<{
  modelValue: number
  filterStart: number // 位数，6-8
  fullWidth: boolean
  disabled: boolean
}>()

const { modelValue, filterStart, fullWidth, disabled } = toRefs(props)

const number = ref<number>(modelValue.value)
const options = [] as Array<{ label: string; value: string; disabled?: boolean; number: number }>

watch(number, async () => {
  while (options.length > 0) options.pop()
  if (number.value?.toString().length >= filterStart.value) {
    const result = await getUser(number.value)
    if (result) {
      options.push({ label: result.name, value: result._id, number: result.id })
    }
  }
})
</script>

<template>
  <ElSelect v-model="number" :disabled="disabled" :style="{ width: fullWidth ? '100%' : 'auto' }">
    <ElOption
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      filterable
      multiple
      remote
    >
      <span style="float: left;">{{ item.label }}</span>
      <span style="float: right; color: #aaaaaa; font-size: 13px">{{ item.number }}</span>
    </ElOption>
  </ElSelect>
</template>
