<script lang="ts" setup>
import ZGroupUserList from '@/components/group/ZGroupUserList.vue'
import { useRoute, useRouter } from 'vue-router'
import { ElPageHeader, ElSegmented, ElIcon, ElText } from 'element-plus'
import { ref, onMounted, watch } from 'vue'
import api from '@/api'
import type { Group } from '@/../types'
import { useWindowSize } from '@vueuse/core'
import { useUserStore } from '@/stores/user.ts'
import { ArrowLeft } from '@element-plus/icons-vue'
import { ZActivityList } from '@/components'
import ZGroupUserTimeList from '@/components/group/ZGroupUserTimeList.vue'
import { useI18n } from 'vue-i18n'
import ZUserModification from '@/components/group/ZUserModification.vue'
import { AddUser, User, ViewList } from '@icon-park/vue-next'
import { TablerSum } from '@/icons'

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

async function refresh() {
  const res = await api.group.readOne(id.value)
  group.value = res
  if (res?.type !== 'class') {
    tab.value = 'users'
  }
}

onMounted(refresh)

watch(id, refresh)

watch(
  () => route.params.id,
  (value) => {
    id.value = value as string
  }
)

watch(
  () => route.params.action,
  (value) => {
    tab.value = value.toString() ?? 'users' as string
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
    value: 'users',
    icon: User
  },
  {
    label: 'Activities',
    value: 'activities',
    icon: ViewList
  },
  {
    label: 'Time',
    value: 'time',
    icon: TablerSum
  },
  {
    label: 'Create',
    value: 'create',
    icon: AddUser
  }
])

const curPage = route.params.action?.toString()

const tab = ref(curPage && curPage !== '' ? curPage : 'users')

watch(tab, () => {
  router.push('/group/' + id.value + '/' + tab.value ?? 'users')
})
</script>

<template>
  <div class="px-16 py-8">
    <ElPageHeader
      v-if="group?._id"
      :icon="ArrowLeft"
      @back="() => router.back()"
      class="py-4"
    >
      <template #content>
        {{ group?.name }}
      </template>
      <template #extra>
        <ElSegmented v-if="group?.type === 'class'" v-model="tab" :options="tabs">
          <template #default="props">
            <div class="flex flex-col items-center gap-2 p-2">
              <ElIcon :size="18" class="mt-2">
                <Component :is="props.item.icon" />
              </ElIcon>
              {{ t(('manage.groupDetails.tabs.' + props.item.value) as string) }}
            </div>
          </template>
        </ElSegmented>
      </template>
    </ElPageHeader>
    <ZGroupUserList v-if="tab === 'users'" :id="id" />
    <ZActivityList v-else-if="tab === 'activities'" :class-target="id" role="class" />
    <ZGroupUserTimeList v-else-if="tab === 'time'" :id="id" />
    <ZUserModification v-else-if="tab === 'create'" :cid="id" mode="create" id="" />
  </div>
</template>
