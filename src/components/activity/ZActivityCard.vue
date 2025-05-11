<script setup lang="ts">
import { toRefs } from 'vue'
import api from '@/api'
import { ref } from 'vue'
import type { ActivityInstance } from '@/../types'
import { ElResult, ElSkeleton } from 'element-plus'
import { ZActivityDetails } from '.'

const props = withDefaults(
  defineProps<{
    _id: string
    mode?: 'mine' | 'class' | 'campus' | 'register'
    perspective?: string // `mine` with other's user ObjectId
    showDetails?: boolean
    local?: boolean
  }>(),
  {
    mode: 'mine',
    perspective: 'mine',
    showDetails: true,
    local: false
  }
)
const emits = defineEmits<{
  refresh: []
}>()

const { _id, mode, perspective } = toRefs(props)

const error = ref(false)
const loading = ref(true)

const activity = ref<ActivityInstance>()

api.activity.read
  .single(_id.value)
  .then((res) => {
    if (res) {
      activity.value = res as ActivityInstance
      loading.value = false
      return
    } else throw ''
  })
  .catch(() => {
    error.value = true
    loading.value = false
  })

const refresh = () => emits('refresh')
</script>

<template>
  <div v-if="!loading" v-loading="loading">
    <Transition
      v-if="!loading && !error && activity?._id"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <ZActivityDetails
        :activity="activity"
        :mode="mode"
        :perspective="perspective"
        @refresh="refresh"
        :show-details="showDetails"
      />
    </Transition>
    <ElResult v-else-if="error" icon="error" status="error" :title="t('nav.pages.SomethingWentWrong.title')" />
  </div>
  <ElSkeleton v-else v-model="loading" :rows="4" animated :throttle="500" />
</template>
