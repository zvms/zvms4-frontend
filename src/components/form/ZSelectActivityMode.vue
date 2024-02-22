<script setup lang="ts">
import { School, CityGate, Vacation } from '@icon-park/vue-next'
import type { ActivityMode } from '@zvms/zvms4-types'
import { ref, toRefs, type Component as VueComponent, watch } from 'vue'
import { ElSelect, ElOption, ElForm, ElFormItem } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{ modelValue: ActivityMode; allow?: ActivityMode[] }>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: ActivityMode): void
}>()

const { modelValue, allow } = toRefs(props)

const mode = ref({
  mode: modelValue.value
})

watch(
  () => mode.value.mode,
  () => emits('update:modelValue', mode.value.mode)
)
watch(modelValue, () => (mode.value.mode = modelValue.value))

const modes = ['on-campus', 'off-campus', 'social-practice'] as ActivityMode[]

const icons: Record<ActivityMode, VueComponent> = {
  'on-campus': School,
  'off-campus': CityGate,
  'social-practice': Vacation
}
</script>

<template>
  <ElForm :model="mode">
    <ElFormItem
      prop="mode"
      :rules="[{ required: true, message: t('validation.create.activity.mode.required') }]"
    >
      <ElSelect v-model="mode.mode" class="w-full">
        <ElOption
          v-for="mode in modes"
          :key="mode"
          :value="mode"
          :label="t(`activity.mode.${mode}.name`)"
          :disabled="!allow || !allow.includes(mode)"
        ></ElOption>
        <template #prefix>
          <component :is="icons[mode.mode]" />
        </template>
      </ElSelect>
    </ElFormItem>
  </ElForm>
</template>
