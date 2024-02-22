<script setup lang="ts">
import api from '@/api'
import { ref, watch } from 'vue'
import type { Trophy } from '@zvms/zvms4-types'
import { ZTrophyCard } from '@/components'
import {
  ElButton,
  ElRow,
  ElCol,
  ElPageHeader,
  ElSkeleton,
  ElScrollbar,
  ElProgress
} from 'element-plus'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
import { useUserStore } from '@/stores/user'

const { t } = useI18n()
const router = useRouter()
const { height } = useWindowSize()
const user = useUserStore()

const trophies = ref<Trophy[]>([])

const loading = ref(true)

async function refresh() {
  loading.value = true
  const trophy = await api.trophy.read()
  if (trophy) {
    trophies.value = trophy
  }
  loading.value = false
}

const area = ref(height.value * 0.54 + 'px')

watch(height, () => (area.value = height.value * 0.54 + 'px'))

const percent = ref(Math.floor((user.time.trophy / 10) * 100))

refresh()
</script>

<template>
  <div class="p-4 unscrollable">
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
    <Transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      appear
    >
      <div class="p-5">
        <ElRow>
          <ElCol :span="20" :md="18" :sm="15" :xs="12">
            <p>
              <span class="pl-8 text-xs" />{{
                t('claim.trophy.statement', { time: 10 - user.time.trophy })
              }}
            </p>
          </ElCol>
          <ElCol :span="4" :md="6" :sm="9" :xs="12" style="text-align: right">
            <ElProgress style="float: right" type="dashboard" :percentage="percent" />
          </ElCol>
        </ElRow>
      </div>
    </Transition>
    <ElSkeleton v-if="loading" :loading="loading" :rows="5" class="px-8 py-4" animated />
    <ElScrollbar :height="area" v-else>
      <ElRow class="px-4">
        <ElCol
          v-for="trophy in trophies"
          :key="trophy._id"
          :xl="6"
          :lg="8"
          :md="12"
          :sm="12"
          :xs="24"
          class="p-1"
          style="height: 100%"
        >
          <ZTrophyCard style="height: 100%" :trophy="trophy" @refresh="refresh" />
        </ElCol>
      </ElRow>
    </ElScrollbar>
  </div>
</template>

<style scoped>
.unscrollable {
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden !important;
}
</style>
