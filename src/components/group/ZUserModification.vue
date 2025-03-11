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
  ElSelect,
  ElOption,
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
import { useI18n } from 'vue-i18n'
import { ArrowRight, Delete } from '@element-plus/icons-vue'

const userStore = useUserStore()
const router = useRouter()
const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    id: string
    mode: 'create' | 'modify'
    cid: string
  }>(),
  {
    id: '',
    mode: 'create',
    cid: ''
  }
)

const { id, mode, cid } = toRefs(props)
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
  sex: 'unknown',
  past: []
})

if (cid.value.length === 24) {
  classGroupID.value = cid.value
}

function refresh() {
  const loading = ElLoading.service({ fullscreen: true })
  if (id.value && mode.value === 'modify')
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

async function remove() {
  submission.value = true
  try {
    await api.user.removeOne(userStore._id, id.value)
  } catch (_) {
    submission.value = false
    return
  }
  ElNotification({
    title: 'Success',
    message: 'User delete successfully',
    type: 'success'
  })
  submission.value = false
}

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
      [classGroupID.value, ...permissionsID.value],
      mode.value === 'create'
    )
  } catch (_) {
    submission.value = false
    return
  }
  ElNotification({
    title: 'Success',
    message: `User ${mode.value === 'create' ? 'created' : 'modified'} successfully`,
    type: 'success'
  })
  submission.value = false
  await router.back()
}

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
  <div class="pt-12 px-4">
    <ElCard shadow="hover">
      <ElForm :model="modification" label-position="right" label-width="96px">
        <ElFormItem :label="t('manage.groupDetails.userList.columns.name')" required>
          <ElInput v-model="modification.name" />
        </ElFormItem>
        <ElFormItem :label="t('manage.groupDetails.userList.columns.id')" required>
          <ElInput v-model.number="modification.id" />
        </ElFormItem>
        <ElFormItem :label="t('manage.groupDetails.userList.columns.classid')" required>
          <ElSelect v-if="mode === 'modify'" v-model="classGroupID" remote :remote-method="remoteFetchClass" filterable>
            <ElOption v-for="group in classes" :key="group._id" :label="group.name" :value="group._id" />
          </ElSelect>
          <span v-else>
            {{ classes.find(x => x._id === classGroupID)?.name }}
          </span>
        </ElFormItem>
        <ElFormItem v-if="mode === 'modify'" :label="t('manage.groupDetails.userList.columns.permission')" required>
          <ElCheckboxGroup v-model="permissionsID">
            <ElCheckbox v-for="group in permissions" :key="group._id" :label="group._id" border>
              {{ group.name }}
            </ElCheckbox>
          </ElCheckboxGroup>
        </ElFormItem>
        <div style="text-align: right">
          <ElButton class="px-4" v-if="mode === 'modify' && userStore.position.includes('admin') && id !== userStore._id" :icon="Delete" type="danger" @click="remove" text bg :loading="submission">{{  t('manage.groupDetails.userList.columns.remove') }}</ElButton>
          <ElButton class="px-4" :icon="ArrowRight" type="primary" @click="submit" text bg :loading="submission">{{  t('manage.groupDetails.userList.columns.submit') }}</ElButton>
        </div>
      </ElForm>
    </ElCard>
  </div>
</template>
