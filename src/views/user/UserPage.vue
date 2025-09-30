<script setup lang="ts">
import ZActivityMember from '@/components/activity/ZActivityMember.vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.ts'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElPageHeader, ElSegmented, ElLoading, ElIcon } from 'element-plus'
import { ZActivityList } from '@/components'
import { ArrowLeft, Edit } from '@element-plus/icons-vue'
import type { User } from '@/../types'
import api from '@/api'
import ZUserModification from '@/components/group/ZUserModification.vue'
import { Info, Log, ViewList } from '@icon-park/vue-next'
import ZLogList from '@/components/log/ZLogList.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { t } = useI18n()
const id = ref<string>(route.params.id as string)
const user = ref<User>()

watch(
  () => route.params.id,
  (value) => {
    id.value = value as string
    getUser()
  }
)

async function getUser() {
  const loading = ElLoading.service({ fullscreen: true})
  const result = await api.user.readOne(id.value).catch(() => {
    loading.close()
  })
  if (result) {
    user.value = result
  }
  loading.close()
}

getUser()

if (!(userStore.position.includes('admin') || userStore.position.includes('department') || userStore.position.includes('secretary') && user.value.group[0] === userStore.class_id)) {
  router.replace('/not-found')
}

const curPage = route.params.action?.toString()

const current = ref(curPage && curPage !== '' ? curPage : 'info')

const tabs = ref(
  [
    {
      label: 'Info',
      value: 'info',
      icon: Info
    },
    {
      label: 'Activity',
      value: 'activity',
      icon: ViewList
    },
    {
      label: 'Modify',
      value: 'modify',
      icon: Edit,
      display: userStore.position.includes('admin')
    },
    {
      label: 'Logs',
      value: 'logs',
      icon: Log,
      display: userStore.position.includes('admin')
    }
  ].filter((x) => x.display ?? true)
)

watch(current, () => {
  router.replace('/user/' + id.value + '/' + current.value)
})

watch(
  () => route.params.action,
  (value) => {
    console.log(value)
    const curPage = route.params.action?.toString()
    current.value = curPage && curPage !== '' ? curPage : 'info'
  }
)
</script>

<template>
  <div class="px-16 py-8">
    <ElPageHeader v-if="id" :icon="ArrowLeft" @back="router.back()" class="py-4">
      <template #content>
        {{ user?.name }}
      </template>
      <template #extra>
        <ElSegmented v-model="current" :options="tabs">
          <template #default="props">
            <div class="flex flex-col items-center gap-2 p-2">
              <ElIcon :size="18" class="mt-2">
                <Component :is="props.item.icon" />
              </ElIcon>
              {{ t(('manage.personalPanel.tabs.' + props.item.value) as string) }}
            </div>
          </template>
        </ElSegmented>
      </template>
    </ElPageHeader>
    <div v-if="current === 'info'">
      <ZActivityMember :id="id" mode="card" />
    </div>
    <div v-else-if="current === 'activity'">
      <ZActivityList :perspective="id" role="mine" :key="id" />
    </div>
    <div v-else-if="current === 'modify'">
      <ZUserModification :id="id" mode="modify" cid="" />
    </div>
    <div v-else-if="current === 'logs'">
      <ZLogList :user="id" />
    </div>
  </div>
</template>
