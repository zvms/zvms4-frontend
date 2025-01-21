<script lang="ts" setup>
import { useRouter } from 'vue-router'
import {
  ElCard,
  ElInput,
  ElLoading,
  ElForm,
  ElFormItem,
  ElRadio,
  ElRadioGroup,
  ElButton,
  ElCheckbox,
  ElCheckboxGroup,
  ElNotification
} from 'element-plus'
import { ref, onMounted, toRefs, watch } from 'vue'
import api from '@/api'
import { useUserStore } from '@/stores/user'
import type { Group, User } from '@/../types'
import { reactive } from 'vue'

const userStore = useUserStore()
const router = useRouter()

const props = withDefaults(
  defineProps<{
    id: string
    mode: 'create' | 'modify'
  }>(),
  {
    id: '',
    mode: 'create'
  }
)

const { id } = toRefs(props)
const userGroups = ref<string[]>([])
const classGroupID = ref<string>('')
const permissionsID = ref<string[]>([])
const classes = ref<Group[]>([])
const loadingClasses = ref(false)
const permissions = ref<Group[]>([])
const loadingPermissions = ref(false)
const person = ref<User>()
const submission = ref(false)
const modification = reactive<User>({
  _id: id.value,
  id: '' as unknown as number,
  name: '',
  group: [],
  sex: 'unknown'
})

function refresh() {
  const loading = ElLoading.service({ fullscreen: true })
  if (id.value)
    api.user
      .readOne(id.value)
      .then((res) => {
        person.value = res as User
        if (res) {
          userGroups.value = res.group
          modification.name = res.name
          modification.sex = res.sex
          modification.id = res.id
          return Promise.all(res.group.map((groupId) => api.group.readOne(groupId)))
        }
      })
      .then((groups) => {
        if (!groups) return
        const classGroup = groups.find((group) => group?.type === 'class')
        if (classGroup) classGroupID.value = classGroup?._id
        const permissionsGroup = groups.filter((group) => group?.type === 'permission')
        if (permissionsGroup.length)
          permissionsID.value = permissionsGroup
            .map((group) => group?._id)
            .filter(Boolean) as string[]
        loading.close()
      })
      .catch(() => {
        loading.close()
      })
  else loading.close()
}

async function refreshClasses() {
  loadingClasses.value = true
  const classesSet = await api.group.read('class', -1)
  if (classesSet) {
    classes.value = classesSet.groups
  }
  loadingClasses.value = false
}

async function refreshPermissions() {
  loadingPermissions.value = true
  const permissionsSet = await api.group.read('permission', -1)
  if (permissionsSet) {
    permissions.value = permissionsSet.groups
  }
  loadingPermissions.value = false
}

onMounted(refresh)
onMounted(refreshClasses)
onMounted(refreshPermissions)

watch(id, refresh)

async function submit() {
  submission.value = true
  if (modification.name === '') {
    return
  }
  if (classGroupID.value === '') {
    return
  }
  try {
    await api.user.update(
      userStore._id,
      modification._id,
      modification.name,
      modification.id.toString(),
      [classGroupID.value, ...permissionsID.value]
    )
  } catch (_) {
    submission.value = false
    return
  }
  ElNotification({
    title: 'Success',
    message: 'User modified successfully',
    type: 'success'
  })
  submission.value = false
  await router.push(`/user/${modification._id}`)
}
</script>

<template>
  <div class="pt-12 px-4">
    <ElCard shadow="hover">
      <ElForm :model="modification" label-position="right" label-width="96px">
        <ElFormItem label="Name" required>
          <ElInput v-model="modification.name" />
        </ElFormItem>
        <ElFormItem label="ID" required>
          <ElInput v-model.number="modification.id" />
        </ElFormItem>
        <ElFormItem label="Class" required>
          <ElRadioGroup v-model="classGroupID">
            <ElRadio v-for="group in classes" :key="group._id" :label="group._id" border>
              {{ group.name }}
            </ElRadio>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="Permissions" required>
          <ElCheckboxGroup v-model="permissionsID">
            <ElCheckbox v-for="group in permissions" :key="group._id" :label="group._id" border>
              {{ group.name }}
            </ElCheckbox>
          </ElCheckboxGroup>
        </ElFormItem>
        <div style="text-align: right">
          <ElButton type="primary" @click="submit" text bg :loading="submission">Submit</ElButton>
        </div>
      </ElForm>
    </ElCard>
  </div>
</template>
