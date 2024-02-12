<script setup lang="ts">
import api from '@/api'
import { ref } from 'vue'
import type { Trophy } from '@zvms/zvms4-types'
import { ZTrophyCard } from '@/components'
import { ElButton, ElSpace } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const trophies = ref<Trophy[]>([])

async function refresh() {
  const trophy = await api.trophy.read()
  if (trophy) {
    trophies.value = trophy
  }
}

refresh()
</script>

<template>
  <div>
    <p class="text-2xl py-2 px-4">{{ t('activity.trophy.name') }}</p>
    <ElSpace>
      <ZTrophyCard v-for="trophy in trophies" :key="trophy._id" :trophy="trophy" />
    </ElSpace>
  </div>
</template>
