<script setup lang="ts">
import api from '@/api'
import { ref } from 'vue'
import type { Trophy } from '@zvms/zvms4-types'
import { ZTrophyCard } from '@/components'
import { ElButton, ElRow, ElCol, ElPageHeader, ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const trophies = ref<Trophy[]>([])

async function refresh() {
  const trophy = await api.trophy.read()
  console.log(trophy)
  if (trophy) {
    trophies.value = trophy
  }
}

refresh()
</script>

<template>
  <div class="p-4">
    <ElPageHeader
      :icon="ArrowLeft"
      class="text-xl px-12 py-4"
      @back="router.push('/activities/mine')"
    >
      <template #content>
        {{ t(`activity.view.panels.trophy.name`) }}
      </template>
      <template #extra>
        <ElButton
          text
          bg
          circle
          type="success"
          :icon="Plus"
          @click="router.push('/trophy/create')"
        />
      </template>
    </ElPageHeader>
    <ElRow class="px-4">
      <ElCol v-for="trophy in trophies" :key="trophy._id" :xl="6" :lg="8" :md="12" :sm="12" :xs="24" class="p-1">
        <ZTrophyCard :trophy="trophy" />
      </ElCol>
    </ElRow>
  </div>
</template>
