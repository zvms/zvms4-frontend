<script setup lang="ts">
import { School, CityGate, Vacation } from '@icon-park/vue-next'
import type { ActivityMode } from '@/../@types/activity'
import { ref, toRefs, type Component as VueComponent, watch } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{ modelValue: ActivityMode; allow?: ActivityMode[] }>()
const emits = defineEmits(['update:modelValue'])

const { modelValue, allow } = toRefs(props)

const mode = ref(modelValue.value)

watch(mode, () => emits('update:modelValue', mode.value))
watch(modelValue, () => (mode.value = modelValue.value))

const modes = ['on-campus', 'off-campus', 'large-scale'] as ActivityMode[]

const icons: Record<ActivityMode, VueComponent> = {
  'on-campus': School,
  'off-campus': CityGate,
  'large-scale': Vacation
}
</script>

<template>
  <ElSelect v-model="mode" class="w-full">
    <ElOption
      v-for="mode in modes"
      :key="mode"
      :value="mode"
      :label="t(`activity.mode.${mode}.name`)"
      :disabled="!allow || !allow.includes(mode)"
    ></ElOption>
    <template #prefix>
      <component :is="icons[mode]" />
    </template>
  </ElSelect>
</template>
