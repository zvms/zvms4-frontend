<script setup lang="ts">
import { toRefs } from 'vue'
import api from '@/api'
import { ref } from 'vue'
import type { Activity, ActivityMember } from '@/../types/v2'
import { ElResult, ElSkeleton } from 'element-plus'
import { ZActivityDetails } from '.'
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{
    _id: string
    userSession?: string
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

const { t } = useI18n()

const { _id, mode, perspective, local, userSession } = toRefs(props)

const error = ref(false)
const loading = ref(true)
const membersCount = ref(0)
const activity = ref<Activity>()
const mine = ref<ActivityMember>()

api.activity.read
  .single(_id.value)
  .then((result) => {
    activity.value = result.activity as Activity
    membersCount.value = result.members_count
    if (mode.value === 'mine' && userSession.value) {
      api.activity.member
        .read(activity.value._id, userSession.value)
        .then((res) => {
          console.log(res)
          mine.value = res
          loading.value = false
        })
        .catch(() => {
          error.value = true
          loading.value = false
        })
    } else {
      loading.value = false
    }
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
        :members-count="membersCount"
        :member-details="mine"
        :perspective="perspective"
        @refresh="refresh"
        :show-details="showDetails"
        :local="local"
      />
    </Transition>
    <ElResult
      v-else-if="error"
      icon="error"
      status="error"
      :title="t('nav.pages.SomethingWentWrong.title')"
    />
  </div>
  <ElSkeleton v-else v-model="loading" :rows="4" animated :throttle="500" />
</template>
