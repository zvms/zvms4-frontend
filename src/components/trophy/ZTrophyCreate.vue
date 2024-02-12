<script setup lang="ts">
import type { Trophy } from '@zvms/zvms4-types'
import { reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElSelect,
  ElOption,
  ElSwitch,
  ElIcon,
  ElNotification,
  ElCard
} from 'element-plus'
import { useI18n } from 'vue-i18n'
import { trophyLevelMap, trophyTypeMap } from './trophy'
import { ArrowRight, Refresh } from '@element-plus/icons-vue'
import api from '@/api'

const user = useUserStore()
const { t } = useI18n()

const trophy = reactive({
  name: '',
  type: '',
  level: '',
  awards: [],
  team: false,
  status: 'pending',
  members: [],
  creator: user._id
})

async function createTrophy() {
  const result = await api.trophy.insert(trophy as unknown as Trophy)
  if (result) {
    ElNotification({
      title: 'Trophy Created',
      message: 'Trophy has been created successfully',
      type: 'success'
    })
  } else {
    ElNotification({
      title: 'Trophy Creation Failed',
      message: 'Trophy creation failed',
      type: 'error'
    })
  }
}
</script>

<template>
  <Transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    appear
  >
    <div class="px-16">
      <ElCard shadow="never">
        <ElForm label-position="right" label-width="96px">
          <ElFormItem :label="t('activity.trophy.field.name')">
            <ElInput v-model="trophy.name" />
          </ElFormItem>
          <ElFormItem :label="t('activity.trophy.field.type')">
            <ElSelect v-model="trophy.type">
              <ElOption
                v-for="item in trophyTypeMap"
                :key="item.value"
                :label="t(`activity.trophy.type.${item.value}`)"
                :value="item.value"
              />
            </ElSelect>
            <template #prefix>
              <ElIcon>
                <component :is="trophyTypeMap.find((x) => x.value === trophy.type)?.icon" />
              </ElIcon>
            </template>
          </ElFormItem>
          <ElFormItem :label="t('activity.trophy.field.level')">
            <ElSelect v-model="trophy.level">
              <ElOption
                v-for="item in trophyLevelMap"
                :key="item.value"
                :label="t(`activity.trophy.level.${item.value}`)"
                :value="item.value"
              />
            </ElSelect>
            <template #prefix>
              <ElIcon>
                <component :is="trophyLevelMap.find((x) => x.value === trophy.level)?.icon" />
              </ElIcon>
            </template>
          </ElFormItem>
          <ElFormItem :label="t('activity.trophy.field.team')">
            <ElSwitch v-model="trophy.team" />
          </ElFormItem>
          <div class="flex justify-end">
            <ElButton class="px-2" text bg type="warning" :icon="Refresh">
              {{ t('activity.form.actions.reset') }}
            </ElButton>
            <ElButton class="px-2" text bg type="primary" :icon="ArrowRight" @click="createTrophy">
              {{ t('activity.form.actions.submit') }}
            </ElButton>
          </div>
        </ElForm>
      </ElCard>
    </div>
  </Transition>
</template>
