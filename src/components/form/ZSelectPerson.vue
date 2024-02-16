<script setup lang="ts">
import { getClassName, getUserClass } from '@/utils/getClass'
import { ElSelect, ElOption } from 'element-plus'
import { ref, toRefs, watch } from 'vue'
import api from '@/api'

const props = defineProps<{
  modelValue: string | string[]
  filterStart: number // 位数，6-8
  fullWidth?: boolean
  disabled?: boolean
  multiple?: boolean
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()

const { modelValue, filterStart, fullWidth, disabled, multiple } = toRefs(props)

const id = ref<string | string[]>(modelValue.value)
watch(id, () => emits('update:modelValue', id.value), { immediate: true })
watch(
  () => id,
  () => emits('update:modelValue', id.value),
  { immediate: true }
)
const options = ref<
  {
    label: string
    value: string
    disabled?: boolean
    number: number
    class: string
  }[]
>([])

const load = ref(false)

async function filter(number: string) {
  load.value = true
  if (number.toString().length >= filterStart.value) {
    const result = await api.user.read(number)
    if (result) {
      console.log(result)
      options.value = result.map((x) => {
        return {
          label: x.name,
          value: x._id.toString(),
          number: x.id,
          class: getClassName(getUserClass(x.id, x.code))
        }
      })
      console.log(options, 'options')
      load.value = false
      return options
    } else {
      load.value = false
      options.value = []
    }
  } else {
    load.value = false
    options.value = []
  }
}
</script>

<template>
  <ElSelect
    v-model="id"
    :disabled="disabled"
    :style="{ width: fullWidth ? '100%' : 'auto' }"
    :filter-method="filter"
    :loading="load"
    filterable
    remote
    size="default"
    remote-show-suffix
    v-bind="$attrs"
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
      <span style="float: right; color: #aaaaaa; font-size: 13px">
        {{ item.number }}, {{ item.class }}
      </span>
    </ElOption>
    <template #prefix>
      <slot name="prepend"></slot>
    </template>
  </ElSelect>
</template>
