<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useUserStore } from '@/stores/user'
import ZActivityDescriptions from './ZActivityDescriptions.vue'
import type { ActivityInstance } from '@/../@types/activity'
import { ElCollapse, ElCollapseItem, ElInput, ElButton, ElCard } from 'element-plus'

const props = defineProps<{
  activity: ActivityInstance
  role: 'student' | 'auditor' | 'secretary'
  modelValue: string
}>()

const emits = defineEmits(['update:modelValue'])

const { activity, role, modelValue } = toRefs(props)

const impression = ref(modelValue.value)

const activeNames = ref<string[]>(['1'])
</script>

<template>
  <div>
    <ElCollapse v-model="activeNames" accordion class="py-4">
      <ElCollapseItem title="义工详情" name="1">
        <ZActivityDescriptions :activity="activity" :role="role" />
      </ElCollapseItem>
    </ElCollapse>
    <ElCard shadow="hover" v-if="role === 'student'">
      <p class="text-xl py-4">感想填写</p>
      <ElInput
        type="textarea"
        v-model="impression"
        placeholder="请输入感想"
        :autosize="{ minRows: 2 }"
        minlength="30"
        maxlength="1024"
        show-word-limit
      />
      <div style="text-align: right">
        <ElButton
          type="primary"
          @click="() => emits('update:modelValue', impression)"
          :disabled="impression.length < 30"
        >
          提交
        </ElButton>
      </div>
    </ElCard>
    <ElCard shadow="hover" v-else>
      <p class="text-xl py-4">感想</p>
      <p>{{ modelValue }}</p>
    </ElCard>
  </div>
</template>
