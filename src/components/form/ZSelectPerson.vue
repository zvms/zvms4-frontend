<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus'
import { ref, toRefs, watch } from 'vue'
import api from '@/api'
import { extractHanCharacters } from '@/utils/extraChars'
import type { User } from '@zvms/zvms4-types'

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
  const digits = number.replace(/[^0-9]/g, '').length
  const han = extractHanCharacters(number).length
  if (filterStart.value && digits <= (filterStart.value ? filterStart.value : 5) && han < 2) {
    load.value = false
    return []
  }
  const result = await api.user.read(number)
  if (result) {
    options.value = await Promise.all(
      result.map(
        (x) =>
          new Promise((resolve) => {
            async function getUserGroups(user: User) {
              return await Promise.all(user.group.map(async (group) => api.group.readOne(group)))
            }
            getUserGroups(x)
              .then((groups) => {
                const className =
                  groups.filter((group) => group?._id).find((group) => group?.type === 'class')
                    ?.name || ''
                resolve({
                  label: `${x.name}`,
                  value: x._id,
                  number: x.id,
                  class: className
                })
              })
              .catch(() =>
                resolve({
                  label: `${x.name}`,
                  value: x._id,
                  number: x.id,
                  class: ''
                })
              )
          })
      ) as Promise<{
        label: string
        value: string
        number: number
        class: string
      }>[]
    )
    load.value = false
    return options
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
    :multiple="multiple"
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
