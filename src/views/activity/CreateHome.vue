<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { ElCard, ElButton, ElDivider } from 'element-plus'
import { useI18n } from 'vue-i18n'
import classifications from '@/components/tags/classifications'
import type { ActivityType, CreateActivityType, UserPosition } from '@/../types'
import { useUserStore } from '@/stores/user'
import { permissions } from '@/components/activity'
import { useHeaderStore } from '@/stores/header'

const emits = defineEmits<{
  (e: 'move', value: string): void
}>()

const { t } = useI18n()
const user = useUserStore()
const header = useHeaderStore()

header.setHeader(t('nav.create'))

const types = Object.entries(classifications.create).map(([key, value]) => ({
  label: '',
  value: key as ActivityType,
  color: value.color,
  icon: value.icon
}))

const visibility: Record<CreateActivityType, boolean | 'need-audit'> = permissions(
  user.position as UserPosition[]
)
</script>

<template>
  <div class="px-8 py-2">
    <div
      class="py-2"
      v-for="typeOfActivity in types.filter((x) => visibility[x.value as CreateActivityType])"
      :key="typeOfActivity.value"
    >
      <ElCard shadow="hover">
        <div>
          <ElButton text bg circle :type="typeOfActivity.color" :icon="typeOfActivity.icon" />
          <ElDivider direction="vertical" />
          <span class="text-xl">{{ t(`activity.create.${typeOfActivity.value}`) }}</span>
        </div>
        <div class="flex justify-end">
          <ElButton
            text
            bg
            round
            @click="emits('move', typeOfActivity.value)"
            type="primary"
            icon-right
            :icon="ArrowRight"
          >
            {{ t('activity.form.actions.submit') }}
          </ElButton>
        </div>
      </ElCard>
    </div>
  </div>
</template>
