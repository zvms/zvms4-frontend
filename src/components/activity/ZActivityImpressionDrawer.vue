<script lang="ts" setup>
import { ElDialog, ElButton } from 'element-plus'
import ZActivityImpressionManager from './ZActivityImpressionManager.vue'
import type { ActivityInstance } from '@/../@types/activity'
import { toRefs, ref } from 'vue'
import { Edit, EditPen } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  activity: ActivityInstance
  role: 'student' | 'auditor' | 'secretary'
}>()

const { t } = useI18n()

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
      {{
        role === 'student'
          ? t('activity.columns.impression-page.actions.write')
          : t('activity.columns.impression-page.actions.reflect')
      }}
    </ElButton>
    <Teleport to="body">
      <ElDialog
        v-if="role === 'student'"
        v-model="show"
        fullscreen
        center
        :title="t('activity.columns.impression-page.write.title')"
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
        :title="
          t('activity.columns.impression-page.reflect.title', {
            mode: role === 'auditor' ? 'Global' : 'Class'
          })
        "
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
