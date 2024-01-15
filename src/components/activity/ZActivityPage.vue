<script setup lang="ts">
import type { ActivityInstance } from '@/../@types/activity'
import { ZActivityCard, ZActivityHistory, ZActivityMemberList, ZActivityMember } from '.'
import { ZActivityType, ZActivityMode } from '..'
import { ref, withDefaults } from 'vue'
import { useWindowSize } from '@vueuse/core'
import {
  ElPageHeader,
  ElButton,
  ElSpace,
  ElButtonGroup,
  ElCollapse,
  ElCollapseItem,
  ElScrollbar,
  ElCard
} from 'element-plus'
import { ArrowLeft, Edit, Plus } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite } from '@/icons'
import dayjs from 'dayjs'
import { useRoute } from 'vue-router'
import { Clock, Calendar } from '@element-plus/icons-vue'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const user = useUserStore()
const route = useRoute()
const { width, height } = useWindowSize()
const collapse = ref<'member' | 'history'>('member')
const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    activity: ActivityInstance
  }>(),
  {}
)

const { activity } = props

const scroll = ref(height.value * 0.54 + 'px')

watch(
  () => height.value,
  (value) => {
    scroll.value = value * 0.54 + 'px'
  }
)

console.log(scroll.value)
</script>

<template>
  <div>
    <ElPageHeader v-if="activity._id" :icon="ArrowLeft" @back="() => $router.back()" class="py-4">
      <template #content>
        {{ activity.name }}
        <ElButton text round type="info" size="small" v-if="width > height * 1.2">
          {{ route.path.split('/').pop() }}
        </ElButton>
      </template>
      <template #extra>
        <ElSpace>
          <ZActivityType
            :type="activity.type"
            mode="full"
            show-special
            :status="activity.status"
            :special="activity.type === 'special' ? activity.special.classify : undefined"
          />
        </ElSpace>
      </template>
    </ElPageHeader>
    <p class="text-gray-500 dark:text-gray-400 px-4">
      {{ activity.description }}
    </p>
    <ElCard shadow="never" class="w-full py-2">
      <ElScrollbar :height="scroll">
        <ElCollapse v-model="collapse">
          <ElCollapseItem name="member" :title="t('activity.form.person', 2)">
            <ZActivityMemberList :activity="activity" mode="card" />
          </ElCollapseItem>
          <ElCollapseItem v-if="activity.members.map(x => x._id).includes(user._id)" name="history" :title="t('activity.history.name')">
            <ZActivityHistory :activity="activity" display="card" />
          </ElCollapseItem>
        </ElCollapse>
      </ElScrollbar>
    </ElCard>
    <div class="py-2 flex justify-end">
      <ZActivityMember
        :id="activity.creator"
        :icon="
          StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite
        "
      />
      <ElButtonGroup>
        <ElButton text bg round size="small" type="success" :icon="Plus">
          {{ dayjs(activity.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </ElButton>
        <ElButton text bg round size="small" type="warning" :icon="Edit">
          {{ dayjs(activity.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </ElButton>
      </ElButtonGroup>
    </div>
  </div>
</template>
