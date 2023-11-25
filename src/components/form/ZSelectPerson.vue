<script setup lang="ts">
import { getUsers } from '@/api/user/crud'
import { getClassName, getUserClass } from '@/utils/getClass'
import { ElSelect, ElOption } from 'element-plus'
import { ref, toRefs } from 'vue'

const props = defineProps<{
  modelValue: string | string[]
  filterStart: number // 位数，6-8
  fullWidth?: boolean
  disabled?: boolean
  multiple?: boolean
}>()

const { modelValue, filterStart, fullWidth, disabled, multiple } = toRefs(props)

const id = ref<string | string[]>(modelValue.value)
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
    const result = await getUsers(number)
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
  </ElSelect>
</template>
