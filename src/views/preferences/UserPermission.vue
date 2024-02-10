<script lang="ts" setup>
import ZSelectPerson from '@/components/form/ZSelectPerson.vue'
import { ElCheckbox, ElCheckboxGroup, ElButton, ElForm, ElFormItem } from 'element-plus'
import { ref, toRefs } from 'vue'

const props = defineProps<{
  header: boolean
}>()

const { header } = toRefs(props)

const number = ref<string>('')
const permissions = ref<
  Array<{
    label: string
    value: number
    disabled?: boolean
    key: string
  }>
>([
  {
    label: '学生',
    value: 0,
    key: 'student'
  },
  {
    label: '团支书',
    value: 1,
    key: 'secretary'
  },
  {
    label: '实践部',
    value: 2,
    key: 'department'
  },
  {
    label: '审计部',
    value: 4,
    key: 'auditor'
  },
  {
    label: '管理员',
    value: 8,
    key: 'admin'
  },
  {
    label: '系统',
    value: 16,
    key: 'system'
  }
])

const userPermissions = ref<string[]>([])
</script>

<template>
  <div>
    <p v-if="header" class="text-xl">修改用户权限</p>
    <ElForm>
      <ElFormItem label="学号" class="py-2">
        <ZSelectPerson v-model="number" :filterStart="6" full-width />
      </ElFormItem>
      <ElFormItem label="权限" class="py-2">
        <ElCheckboxGroup v-model="userPermissions">
          <ElCheckbox v-for="permission in permissions" :key="permission.key" border />
        </ElCheckboxGroup>
      </ElFormItem>
      <ElFormItem class="py-2">
        <div style="text-align: right">
          <ElButton type="primary" text bg> 修改 </ElButton>
        </div>
      </ElFormItem>
    </ElForm>
  </div>
</template>
