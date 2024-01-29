<!-- Warning: this component is useless!! Please look at CreateActivity.vue -->

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { ElCard, ElButton, ElDivider } from 'element-plus'
import { useI18n } from 'vue-i18n'
import classifications from '@/components/tags/classifications'
import type { ActivityType, UserPosition } from '@zvms/zvms4-types';
import { useUserStore } from '@/stores/user';
import { permissions } from '@/components/activity'

const emits = defineEmits<{
  (e: 'move', value: string): void
}>()

const { t } = useI18n()
const user = useUserStore()

const types = Object.entries(classifications.type).map(([key, value]) => ({
  label: '',
  value: key as ActivityType,
  color: value.color,
  icon: value.icon
}))

const visibility: Record<ActivityType, boolean | 'need-audit'> = permissions(user.position as UserPosition[])
</script>

<template>
  <div class="px-8 py-2" style="width: 100%">
    <div class="py-2" v-for="typeOfActivity in types.filter(x => visibility[x.value as ActivityType])" :key="typeOfActivity.value">
      <ElCard shadow="hover">
        <div>
          <ElButton text bg circle :type="typeOfActivity.color" :icon="typeOfActivity.icon" />
          <ElDivider direction="vertical" />
          <span class="text-xl">{{ t(`activity.type.${typeOfActivity.value}.name`) }}</span>
        </div>
        <p class="text-gray-500 py-2">{{ t(`activity.type.${typeOfActivity.value}.description`) }}</p>
        <div class="flex justify-end">
          <ElButton text bg round @click="emits('move', typeOfActivity.value)" type="primary" icon-right :icon="ArrowRight">
            {{ t('activity.form.actions.submit') }}
          </ElButton>
        </div>
      </ElCard>
    </div>
  </div>
</template>
