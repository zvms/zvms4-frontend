<script setup lang="ts">
import type { Trophy } from '@zvms/zvms4-types'
import { useUserStore } from '@/stores/user';
import { ref, toRefs } from 'vue';
import { ElPopover, ElButton, ElTable } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { User } from '@element-plus/icons-vue';
import { watch } from 'vue';
import { useWindowSize } from '@vueuse/core';

const user = useUserStore()
const { t } = useI18n()
const { width, height } = useWindowSize()

const useUnits = ref(width.value > height.value * 1.2)

watch(width, () => (useUnits.value = width.value > height.value * 1.2))
watch(height, () => (useUnits.value = width.value > height.value * 1.2))

const props = withDefaults(
  defineProps<{
    trophy: Trophy
    awardName: string
  }>(), {}
)

const { trophy, awardName } = toRefs(props)

const allowToEdit = ref(user.position.includes('admin') || user._id === trophy.value.creator)

const members = ref(trophy.value.members.filter(member => member.award === awardName.value))

watch(() => trophy.value, () => {
  allowToEdit.value = user.position.includes('admin') || user._id === trophy.value.creator
  members.value = trophy.value.members.filter(member => member.award === awardName.value)
})
</script>

<template>
  <ElPopover :title="t('activity.member.dialog.title', { name: trophy.name })" width="384px">
    <template #reference>
      <ElButton type="danger" text bg round size="small" :icon="User">
        {{ members.length }} {{ useUnits ? t('activity.units.person', members.length) : '' }}
      </ElButton>
    </template>
  </ElPopover>
</template>
