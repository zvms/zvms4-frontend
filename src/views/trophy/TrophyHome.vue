<script setup lang="ts">
import api from '@/api'
import { ref } from 'vue'
import type { Trophy } from '@zvms/zvms4-types'
import { ZTrophyCard } from '@/components'
import { ElButton, ElRow, ElCol, ElPageHeader, ElSkeleton } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const trophies = ref<Trophy[]>([])

const loading = ref(true)

async function refresh() {
  const trophy = await api.trophy.read()
  if (trophy) {
    trophies.value = trophy
  }
  loading.value = false
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
    <ElSkeleton v-if="loading" :loading="loading" :rows="5" class="px-8 py-4" animated />
    <ElRow class="px-4" v-else>
      <ElCol v-for="trophy in trophies" :key="trophy._id" :xl="6" :lg="8" :md="12" :sm="12" :xs="24" class="p-1">
        <ZTrophyCard :trophy="trophy" />
      </ElCol>
    </ElRow>
  </div>
</template>
