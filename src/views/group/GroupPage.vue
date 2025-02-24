<script lang="ts" setup>
import ZGroupUserList from '@/components/group/ZGroupUserList.vue'
import { useRoute, useRouter } from 'vue-router'
import { ElPageHeader, ElSegmented } from 'element-plus'
import { ref, onMounted, watch } from 'vue'
import api from '@/api'
import type { Group } from '@/../types'
import { useWindowSize } from '@vueuse/core'
import { useUserStore } from '@/stores/user.ts'
import { ArrowLeft } from '@element-plus/icons-vue'
import { ZActivityList } from '@/components'
import ZGroupUserTimeList from '@/components/group/ZGroupUserTimeList.vue'
import { useI18n } from 'vue-i18n'

const { height } = useWindowSize()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const id = ref<string>('')

const group = ref<Group>()

const tableHeight = ref(height.value * 0.6)

watch(height, () => {
  tableHeight.value = height.value * 0.6
})

onMounted(() => {
  api.group.readOne(id.value).then((res) => {
    group.value = res
  })
})

watch(id, () => {
  api.group.readOne(id.value).then((res) => {
    group.value = res
  })
})

watch(
  () => route.params.id,
  (value) => {
    id.value = value as string
  }
)

id.value = route.params.id as string

if (
  !(
    userStore.position.includes('admin') ||
    userStore.position.includes('department') ||
    (userStore.position.includes('secretary') && userStore.class_id === id.value)
  )
) {
  router.push('/not-found')
}

const tabs = ref([
  {
    label: 'Users',
    value: 'users'
  },
  {
    label: 'Activities',
    value: 'activities'
  },
  {
    label: 'Time',
    value: 'time'
  }
])
const tab = ref('users')
</script>

<template>
  <div class="px-16 py-8">
    <ElPageHeader v-if="group?._id" :icon="ArrowLeft" @back="() => $router.back()" class="py-4">
      <template #content>
        {{ group?.name }}
      </template>
      <template #extra>
        <ElSegmented v-model="tab" :options="tabs">
          <template #default="props">
            {{ t('manage.groupDetails.tabs.' + (props.item).value as string) }}
          </template>
        </ElSegmented>
      </template>
    </ElPageHeader>
    <ZGroupUserList v-if="tab === 'users'" :id="id" />
    <ZActivityList v-else-if="tab === 'activities'" :class-target="id" role="class" />
    <ZGroupUserTimeList v-else-if="tab === 'time'" :id="id" />
  </div>
</template>
