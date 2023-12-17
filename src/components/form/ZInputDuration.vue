<script setup lang="ts">
import { Timer } from '@element-plus/icons-vue'
import { toRefs, ref, watch } from 'vue'
import { ElInput } from 'element-plus'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ modelValue: number; showUnit?: boolean }>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
const { t } = useI18n()

const { modelValue, showUnit } = toRefs(props)

const duration = ref(modelValue.value)

watch(
  modelValue,
  (val) => {
    duration.value = val
  },
  { immediate: true }
)

watch(
  duration,
  (val) => {
    emits('update:modelValue', val)
  },
  { immediate: true }
)
</script>

<template>
  <ElInput :prefix-icon="Timer" type="number" v-model="duration">
    <template #append v-if="showUnit">
      <span v-if="showUnit">{{ t('activity.units.hour', duration) }}</span>
    </template>
  </ElInput>
</template>
