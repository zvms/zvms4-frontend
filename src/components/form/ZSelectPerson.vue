<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus'
import { ref, toRefs, watch } from 'vue'
import api from '@/api'
import { extractHanCharacters, extractNonHanCharacters } from '@/utils/extraChars'
import type { User } from '@/../types'

const props = defineProps<{
  modelValue: string | string[]
  filterStart: number // Digits, 6-8
  fullWidth?: boolean
  disabled?: boolean
  multiple?: boolean
  departmentOnly?: boolean
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()

const { modelValue, filterStart, fullWidth, disabled, multiple, departmentOnly } = toRefs(props)

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
  const extra = extractNonHanCharacters(number).replace(/[0-9]/g, '').length
  const digits = number.replace(/[^0-9]/g, '').length
  const han = extractHanCharacters(number).length
  if (extra > 0 || (digits > 0 && han > 0)) {
    load.value = false
    return []
  }
  if (filterStart.value && digits <= (filterStart.value ? filterStart.value : 5) && han < 2 && !departmentOnly.value) {
    load.value = false
    return []
  }
  const result0 = (await api.user.read(number, 1, departmentOnly.value ? 20 : 5))?.users
  if (result0) {
    const result = departmentOnly.value
      ? result0.filter((x) => !!x.group.find((gr) => gr === '65e6fa210edc81d012ec41b6'))
      : result0
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
    if (modelValue.value) {
      const userData = await api.user.readOne(modelValue.value)
      if (userData) {
        options.value = [userData]
      } else {
        options.value = []
      }
      load.value = false
      return options
    }
    options.value = []
    load.value = false
    return options
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
    class="w-full"
    size="default"
    remote-show-suffix
    popper-class="z-select-person__selector"
    :popper-append-to-body="true"
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

<style>
.z-select-person__selector .el-select-dropdown__wrap {
  max-height: 182px;
}
</style>
