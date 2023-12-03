<script setup lang="ts">
import { toRefs } from 'vue'
import api from '@/api'
import { ref } from 'vue'
import type { ActivityInstance } from '@/../@types/activity'
import { ElResult } from 'element-plus'
import { ZActivityDetails } from '.'

const props = defineProps<{
  _id: string
  mode: 'mine' | 'class' | 'campus' | 'register'
  perspective?: string // `mine` with other's user ObjectId
}>()

const { _id, mode, perspective } = toRefs(props)

const error = ref(false)
const loading = ref(true)

const activity = ref<ActivityInstance>()

api.activity.read.single(_id.value).then((res) => {
  if (res) {
    activity.value = res as ActivityInstance
    loading.value = false
    return
  } else throw('')
}).catch(() => {
  error.value = true
  loading.value = false
})
</script>

<template>
  <div v-if="!loading" v-loading="loading">
    <ZActivityDetails
      v-if="!loading && !error && activity?._id"
      :activity="activity"
      :mode="mode"
      :perspective="perspective"
    />
    <ElResult v-else-if="error" status="error" title="404" sub-title="活动不存在" />
  </div>
</template>
