<script setup lang="ts">
import type { Trophy } from '@zvms/zvms4-types'
import { ref, toRefs } from 'vue'
import {
  ZButtonOrCard,
  ZTrophyType,
  ZTrophyLevel,
  ZTrophyMemberList,
  ZTrophyRegistrationButton,
  ZActivityStatus,
  ZButton
} from '..'
import { Trophy as TrophyIcon } from '@icon-park/vue-next'
import { useUserStore } from '@/stores/user'
import {
  ElForm,
  ElFormItem,
  ElButton,
  ElScrollbar,
  ElRow,
  ElCol,
  ElEmpty,
  ElPopconfirm
} from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { useWindowSize } from '@vueuse/core'
import { watch } from 'vue'
import { Delete, Plus } from '@element-plus/icons-vue'
import api from '@/api'

const user = useUserStore()
const { height } = useWindowSize()
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
      <ZActivityStatus :type="trophy.status" />
    </p>
    <p class="pt-1">
      <ZTrophyType class="px-1" :type="trophy.type" :name="trophy.name" />
      <ZTrophyLevel class="px-1" :level="trophy.level" />
    </p>
    <ElScrollbar :height="active" class="py-2">
      <ElForm
        label-position="right"
        label-width="72px"
        v-if="trophy.members.length > 0 && trophy.awards.length > 0"
      >
        <ElFormItem
          v-for="award in trophy.awards.filter(
            (award) =>
              trophy.members.filter((member) => award.name === member.award).length > 0 &&
              award.duration !== 0
          )"
          :key="award.name"
          :label="award.name"
        >
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
      <ElEmpty v-else />
    </ElScrollbar>
    <div class="flex justify-end">
      <ElPopconfirm
        @confirm="
          async () => {
            api.trophy.remove(trophy._id)
            refresh()
          }
        "
      >
        <template #reference>
          <ZButton circle text bg type="danger" :icon="Delete" />
        </template>
      </ElPopconfirm>
      <ZButton circle text bg type="success" :icon="Plus" />
    </div>
  </ZButtonOrCard>
</template>
