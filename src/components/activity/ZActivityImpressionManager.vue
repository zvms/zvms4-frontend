<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useUserStore } from '@/stores/user'
import type {
  ActivityInstance,
} from '@zvms/zvms4-types'
import {
  ElCollapse,
  ElCollapseItem,
  ElImage,
  ElDialog,
  ElScrollbar
} from 'element-plus'
import { useI18n } from 'vue-i18n'
import { ZActivityDetails, ZActivityMemberList } from '@/components'
import { useWindowSize } from '@vueuse/core'

const props = defineProps<{
  activity: ActivityInstance
  role: 'mine' | 'campus' | 'class'
  perspective?: string
}>()

const user = useUserStore()
const { t } = useI18n()
const { height } = useWindowSize()

const { activity } = toRefs(props)

const preview = ref(false)
const previewUrl = ref('')
const activeNames = ref<string[]>(['1', '2'])

</script>

<template>
  <div class="dialog">
    <ElCollapse v-model="activeNames" class="py-4">
      <ElCollapseItem :title="t('activity.form.details')" name="1">
        <ZActivityDetails
          :activity="activity"
          :mode="activity.members.map((x) => x._id).includes(user._id) ? 'mine' : 'campus'"
          :perspective="user._id"
          :show-details="false"
        />
      </ElCollapseItem>
      <ElCollapseItem :title="t('activity.member.dialog.title', { name: activity.name })" name="2">
        <ZActivityMemberList :activity="activity" mode="card" />
      </ElCollapseItem>
    </ElCollapse>
    <ElDialog v-model="preview">
      <ElScrollbar :max-height="height * 0.6">
        <ElImage :src="previewUrl" />
      </ElScrollbar>
    </ElDialog>
  </div>
</template>
