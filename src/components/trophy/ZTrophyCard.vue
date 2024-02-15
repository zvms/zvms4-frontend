<script setup lang="ts">
import type { Trophy } from '@zvms/zvms4-types'
import { ref, toRefs } from 'vue'
import {
  ZButtonOrCard,
  ZTrophyType,
  ZTrophyLevel,
  ZTrophyMemberList,
  ZTrophyRegistrationButton
} from '..'
import { Trophy as TrophyIcon } from '@icon-park/vue-next'
import { useUserStore } from '@/stores/user'
import { ElForm, ElFormItem, ElButton, ElScrollbar, ElRow, ElCol } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { useWindowSize } from '@vueuse/core'
import { watch } from 'vue'

const user = useUserStore()
const { width, height } = useWindowSize()
const { t } = useI18n()

const active = ref(height.value * 0.18 + 'px')

watch(height, () => (active.value = height.value * 0.18 + 'px'))

const props = withDefaults(
  defineProps<{
    trophy: Trophy
    mode?: 'card' | 'button'
  }>(),
  {
    mode: 'card'
  }
)

const emits = defineEmits(['refresh'])

const refresh = () => emits('refresh')

const { trophy, mode } = toRefs(props)

const userRegistered = ref(
  trophy.value.members.filter((member) => member._id === user._id).length > 0
)
</script>

<template>
  <ZButtonOrCard
    size="small"
    :mode="mode"
    :icon="TrophyIcon"
    type="danger"
    class="h-full"
    style="height: 100%"
  >
    <template #text>
      {{ trophy.name }}
    </template>
    <p class="text-lg">
      {{ trophy.name }}
      <ZTrophyType class="px-1" :type="trophy.type" :name="trophy.name" />
      <ZTrophyLevel class="px-1" :level="trophy.level" />
    </p>
    <ElScrollbar :height="active" class="py-2">
      <ElForm label-position="right" label-width="72px">
        <ElFormItem v-for="award in trophy.awards" :key="award.name" :label="award.name">
          <ElRow class="w-full">
            <ElCol :span="16" :md="20" :sm="20">
              <ElButton text bg round type="info" :icon="Timer" size="small" class="px-1"
                >{{ award.duration }}
                {{ t('activity.units.hour', Math.ceil(award.duration)) }}</ElButton
              >
              <ZTrophyMemberList
                class="px-1"
                :trophy="trophy"
                :awardName="award.name"
                @refresh="refresh"
              />
            </ElCol>
            <ElCol :span="8" :md="4" :sm="4" style="text-align: right">
              <ZTrophyRegistrationButton
                type="action"
                size="default"
                :trophy="trophy"
                :award="award.name"
                :target-user="user._id"
                circle
                @refresh="refresh"
              />
            </ElCol>
          </ElRow>
        </ElFormItem>
      </ElForm>
    </ElScrollbar>
  </ZButtonOrCard>
</template>
