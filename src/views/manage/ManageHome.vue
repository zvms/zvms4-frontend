<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.ts'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElPageHeader, ElSegmented, ElIcon } from 'element-plus'
import { ArrowLeft, Edit, Upload } from '@element-plus/icons-vue'
import type { User as UserType } from '@/../types'
import { Group, User } from '@icon-park/vue-next'
import ZGroupUserList from '@/components/group/ZGroupUserList.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { t } = useI18n()
const id = ref<string>(route.params.id as string)
const user = ref<UserType>()

if (!(userStore.position.includes('admin') || userStore.position.includes('department'))) {
  router.push('/not-found')
}

watch(
  () => route.params.id,
  (value) => {
    id.value = value as string
  }
)
const curPage = route.params.action?.toString()

const current = ref((curPage && curPage !== '') ? curPage : 'groups')

const tabs = ref([
  {
    label: 'Groups',
    value: 'groups',
    icon: Group
  },
  {
    label: 'Users',
    value: 'users',
    icon: User
  },
  {
    label: 'Import',
    value: 'import',
    icon: Upload
  }
])

watch(current, () => {
  router.push('/manage/' + current.value)
})

watch(
  () => route.params.action,
  (value) => {
    console.log(value)
    const curPage = route.params.action?.toString()
    current.value = (curPage && curPage !== '') ? curPage : 'groups'
  }
)
</script>

<template>
  <div class="px-16 py-8">
    <ElPageHeader :icon="ArrowLeft" @back="() => $router.back()" class="py-4">
      <template #content>
        {{ t('manage.manage.tabs.' + current) }}
      </template>
      <template #extra>
        <ElSegmented v-model="current" :options="tabs">
          <template #default="props">
            <div class="flex flex-col items-center gap-2 p-2">
              <ElIcon :size="18" class="mt-2">
                <Component :is="props.item.icon" />
              </ElIcon>
              {{ t('manage.manage.tabs.' + props.item.value as string) }}
            </div>
          </template>
        </ElSegmented>
      </template>
    </ElPageHeader>
    <ZGroupList v-if="current === 'groups'" />
    <ZGroupUserList v-if="current === 'users'" />
  </div>
</template>
