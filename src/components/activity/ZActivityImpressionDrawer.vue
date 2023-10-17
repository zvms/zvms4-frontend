<script lang="ts" setup>
import { ElDialog, ElButton } from 'element-plus'
import ZActivityImpressionManager from './ZActivityImpressionManager.vue'
import type { ActivityInstance } from '@/../@types/activity'
import { toRefs, ref } from 'vue'
import { Edit, EditPen } from '@element-plus/icons-vue'

const props = defineProps<{
  activity: ActivityInstance
  role: 'student' | 'auditor' | 'secretary'
}>()

const { activity, role } = toRefs(props)

const show = ref(false)
</script>

<template>
  <div class="end">
    <ElButton
      :icon="role === 'student' ? Edit : EditPen"
      :type="role === 'student' ? 'primary' : 'danger'"
      text
      @click="show = true"
    >
      {{ role === 'student' ? '填写' : '审批' }}
    </ElButton>
    <Teleport to="body">
      <ElDialog
        v-if="role === 'student'"
        v-model="show"
        fullscreen
        center
        title="填写义工感想"
      >
        <ZActivityImpressionManager
          :activity="activity"
          :role="role"
          submitable
          @finish="show = false"
        />
      </ElDialog>
      <ElDialog
        v-else
        v-model="show"
        center
        fullscreen
        :title="`审批义工感想（${role === 'auditor' ? '终审' : '初审'}）`"
      >
        <ZActivityImpressionManager
          :activity="activity"
          :role="role"
          submitable
          @finish="show = false"
        />
      </ElDialog>
    </Teleport>
  </div>
</template>
