<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus'
import { ref, toRefs, watch } from 'vue'
import api from '@/api'
import type { Group } from '@/../types'

const props = defineProps<{
  modelValue: string
  fullWidth: boolean
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const { modelValue, fullWidth } = toRefs(props)

const classGroupID = ref<string>(modelValue.value)
watch(classGroupID, () => emits('update:modelValue', classGroupID.value), { immediate: true })
watch(
  () => classGroupID,
  () => emits('update:modelValue', classGroupID.value),
  { immediate: true }
)
const classes = ref<
  Group[]
>([])

const load = ref(false)

async function remoteFetchClass(search: string) {
  if (search) {
    const classesSet = await api.group.read('class', 1, 5, search)
    if (classesSet) {
      classes.value = classesSet.groups
    } else {
      classes.value = []
    }
  } else if (classGroupID.value) {
    const group = await api.group.readOne(classGroupID.value)
    if (group) {
      classes.value = [group]
    } else {
      classes.value = []
    }
  } else {
    classes.value = []
  }
}
</script>

<template>
  <ElSelect
    v-model="classGroupID"
    :style="{ width: fullWidth ? '100%' : 'auto' }"
    :filter-method="remoteFetchClass"
    :loading="load"
    filterable
    remote
    class="w-full"
    size="default"
    remote-show-suffix
    v-bind="$attrs"
  >
    <ElOption
      v-for="item in classes"
      :key="item._id"
      :label="item.name"
      :value="item._id"
      filterable
      remote
    >
      <span style="float: left">{{ item.name }}</span>
    </ElOption>
    <template #prefix>
      <slot name="prepend"></slot>
    </template>
  </ElSelect>
</template>
