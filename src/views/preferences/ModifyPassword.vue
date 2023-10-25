<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import ZSelectPerson from '@/components/form/ZSelectPerson.vue'

const props = defineProps<{
  type: 'reset' | 'modify'
  header: boolean
}>()

const { type, header } = toRefs(props)

const oldPassword = ref<string>('')
const newPassword = ref<string>('')
const confirmPassword = ref<string>('')
const number = ref<number>(0)
</script>

<template>
  <div>
    <p v-if="header" class="text-xl">{{ type === 'reset' ? '重置' : '修改' }}</p>
    <ElForm>
      <ElFormItem v-if="type === 'modify'" class="py-2" label="原密码">
        <ElInput type="password" v-model="oldPassword" />
      </ElFormItem>
      <ElFormItem v-else-if="type === 'reset'" class="py-2" label="校徽号">
        <ZSelectPerson v-model="number" :filterStart="6" full-width />
      </ElFormItem>
      <ElFormItem class="py-2" label="新密码">
        <ElInput type="password" v-model="newPassword" />
      </ElFormItem>
      <ElFormItem class="py-2" label="确认密码">
        <ElInput type="password" v-model="confirmPassword" />
      </ElFormItem>
      <ElFormItem class="py-2">
        <div style="text-align: right">
          <ElButton type="primary" text bg :disabled="newPassword !== confirmPassword">
            {{ type === 'reset' ? '重置' : '修改' }}
          </ElButton>
        </div>
      </ElFormItem>
    </ElForm>
  </div>
</template>
