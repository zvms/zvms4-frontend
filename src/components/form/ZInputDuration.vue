<script setup lang="ts">
import { Timer } from '@element-plus/icons-vue'
import { toRefs, ref, watch } from 'vue'
import { ElInput, ElForm, ElFormItem } from 'element-plus'
import { useI18n } from 'vue-i18n'
import type { InternalRuleItem } from 'async-validator';

const props = defineProps<{ modelValue: number; showUnit?: boolean }>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
const { t } = useI18n()

const { modelValue, showUnit } = toRefs(props)

const duration = ref({
  duration: modelValue.value
})

watch(
  modelValue,
  (val) => {
    duration.value.duration = val
  },
  { immediate: true }
)

watch(
  () => duration.value.duration,
  (val) => {
    emits('update:modelValue', val)
  },
  { immediate: true }
)
</script>

<template>
  <ElForm :model="duration">
    <ElFormItem
      prop="duration"
      :rules="[
        { required: true, message: t('validation.create.member.duration.required') },
        {
          validator: (_: InternalRuleItem, value: number, cb: Function) => {
            if (value < 0) {
              return cb(t('validation.create.member.duration.invalid'))
            }
            return cb()
          }
        },
        {
          validator: (_: InternalRuleItem, value: number, cb: Function) => {
            if (value > 20) {
              return cb(t('validation.create.member.duration.invalid'))
            }
            return cb()
          }
        }
      ]"
    >
      <ElInput :prefix-icon="Timer" type="number" v-model="duration.duration">
        <template #append v-if="showUnit">
          <span v-if="showUnit">{{ t('activity.units.hour', duration) }}</span>
        </template>
      </ElInput>
    </ElFormItem>
  </ElForm>
</template>
