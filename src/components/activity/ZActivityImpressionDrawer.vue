<script lang="ts" setup>
import { ElDialog, ElButton } from 'element-plus'
import type { ActivityInstance } from '@zvms/zvms4-types'
import { toRefs, ref, watch } from 'vue'
import { Edit, EditPen, View } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { ZActivityImpressionManager } from '@/components'
import api from '@/api'

const props = withDefaults(
  defineProps<{
    id: string
    role: 'mine' | 'campus' | 'class'
    modelValue?: boolean
    readonly: boolean
    embed?: boolean
    onlyText?: boolean
  }>(),
  {
    embed: false,
    onlyText: false
  }
)

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'finish'): void
}>()

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
  api.activity.read.single(id.value).then((res) => {
    loading.value = false
    show.value = true
    activity.value = res
  })
}

watch(modelValue, () => {
  show.value = modelValue.value ?? false
})

function closeDialog() {
  show.value = false
  emits('finish')
}
</script>

<template>
  <ElButton
    :icon="readonly ? View : role === 'mine' ? Edit : EditPen"
    :type="readonly ? 'info' : role === 'mine' ? 'primary' : 'danger'"
    text
    :loading="loading"
    @click="openDialog"
    :size="embed ? 'small' : 'default'"
    :round="embed"
    :bg="embed"
  >
    {{
      onlyText
        ? t('activity.member.impression')
        : t(
            'activity.impression.actions.' +
              (readonly ? 'view' : role === 'mine' ? 'write' : 'reflect')
          )
    }}
  </ElButton>
  <div class="end">
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
          @finish="closeDialog"
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
          @finish="closeDialog"
        />
      </ElDialog>
    </Teleport>
  </div>
</template>
