<script setup lang="ts">
import ZActivityMember from '@/components/activity/ZActivityMember.vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.ts'
import { ref, watch } from 'vue'
import { ElButton, ElPageHeader, ElSegmented, ElLoading } from 'element-plus'
import { ZActivityList } from '@/components'
import { ArrowLeft } from '@element-plus/icons-vue'
import type { User } from '@/../types'
import api from '@/api'
import ZUserModification from '@/components/group/ZUserModification.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const id = ref<string>(route.params.id as string)
const user = ref<User>()

if (!(userStore.position.includes('admin') || userStore.position.includes('department'))) {
  router.push('/not-found')
}

watch(
  () => route.params.id,
  (value) => {
    id.value = value as string
    getUser()
  }
)

async function getUser() {
  const loading = ElLoading.service({ fullscreen: true, text: `Fetching user...` })
  user.value = await api.user.readOne(id.value)
  loading.close()
}

getUser()

const current = ref(route.params.page.toString() ?? '')

const tabs = ref([
  {
    label: 'Info',
    value: 'info'
  },
  {
    label: 'Activity',
    value: 'activity'
  },
  {
    label: 'Modify',
    value: 'modify'
  }
])
</script>

<template>
  <div class="px-16 py-8">
    <ElPageHeader v-if="userStore?._id" :icon="ArrowLeft" @back="() => $router.back()" class="py-4">
      <template #content>
        {{ user?.name }}
      </template>
      <template #extra>
        <ElSegmented v-model="current" :options="tabs" />
      </template>
    </ElPageHeader>
    <div v-if="current === 'info'">
      <ZActivityMember :id="id" mode="card" />
    </div>
    <div v-else-if="current === 'activity'">
      <ZActivityList :perspective="id" role="mine" />
    </div>
    <div v-else-if="current === 'modify'">
      <ZUserModification :id="id" mode="modify" />
    </div>
  </div>
</template>
