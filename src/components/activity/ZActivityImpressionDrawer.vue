<script lang="ts" setup>
import { ElDialog, ElButton } from 'element-plus'
import type { ActivityInstance } from '@/../@types/activity'
import { toRefs, ref, watch } from 'vue'
import { Edit, EditPen, View } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { getActivity } from '@/api/activity/read'
import { ZActivityImpressionManager } from '@/components'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

const props = defineProps<{
  id: string
  role: 'mine' | 'campus'
  modelValue?: boolean
  readonly: boolean
}>()

const emits = defineEmits(['update:modelValue'])

const { t } = useI18n()

const { role, modelValue, id, readonly } = toRefs(props)

const activity = ref<ActivityInstance>()
const loading = ref(false)

const show = ref(modelValue.value ?? false)

watch(show, () => {
  emits('update:modelValue', show.value)
})

function openDialog() {
  loading.value = true
  getActivity(id.value).then((res) => {
    loading.value = false
    show.value = true
    activity.value = res
  })
}

watch(modelValue, () => {
  show.value = modelValue.value ?? false
})
</script>

<template>
  <div class="end">
    <ElButton
      :icon="readonly ? View : role === 'mine' ? Edit : EditPen"
      :type="readonly ? 'info' : role === 'mine' ? 'primary' : 'danger'"
      text
      :loading="loading"
      @click="openDialog"
    >
      {{
        t(
          'activity.impression.actions.' +
            (readonly ? 'view' : role === 'mine' ? 'write' : 'reflect')
        )
      }}
    </ElButton>
    <Teleport to="body">
      <ElDialog
        v-if="role === 'mine' && activity"
        v-model="show"
        fullscreen
        center
        :title="t('activity.impression.page.write.title')"
      >
        <ZActivityImpressionManager
          :activity="activity"
          :role="role"
          :submitable="!readonly"
          :readonly="readonly"
          @finish="show = false"
        />
      </ElDialog>
      <ElDialog
        v-else-if="activity"
        v-model="show"
        center
        fullscreen
        :title="t('activity.impression.page.reflect.title')"
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
