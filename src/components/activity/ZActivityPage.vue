<script setup lang="ts">
import type { ActivityInstance } from '@zvms/zvms4-types'
import {
  ZActivityHistory,
  ZActivityMemberList,
  ZActivityMember,
  ZActivityType,
  ZActivityStatus,
  ZActivityMode,
  ZActivityImpressionDrawer
} from '..'
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
  ElCard,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDescriptions,
  ElDescriptionsItem
} from 'element-plus'
import { ArrowLeft, ArrowRight, Clock, Edit, Location, Plus, Timer } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite } from '@/icons'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'

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

const refresh = () => window.location.reload()

const { activity } = props

const scroll = ref(height.value * 0.54 + 'px')

watch(
  () => height.value,
  (value) => {
    scroll.value = value * 0.54 + 'px'
  }
)

const mine = ref(activity.members.find((x) => x._id === user._id))

const vert = ref(width.value < height.value * 1.2)

watch(width, () => {
  vert.value = width.value < height.value * 1.2
})

watch(height, () => {
  vert.value = width.value < height.value * 1.2
})
</script>

<template>
  <div>
    <ElPageHeader v-if="activity._id" :icon="ArrowLeft" @back="() => $router.back()" class="py-4">
      <template #content>
        {{ activity.name }}
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
      <template #breadcrumb>
        <ElBreadcrumb :separator-icon="ArrowRight">
          <ElBreadcrumbItem>
            <ElButton text size="small" @click="$router.push('/activities/')">
              {{ t('nav.breadcrumbs.view.home') }}
            </ElButton>
          </ElBreadcrumbItem>
          <ElBreadcrumbItem>
            <ElButton text size="small">
              {{ t('nav.breadcrumbs.view.specific') }}
            </ElButton>
          </ElBreadcrumbItem>
          <ElBreadcrumbItem>
            <ElButton text size="small" type="info">
              {{ route.path.split('/').pop() }}
            </ElButton>
          </ElBreadcrumbItem>
        </ElBreadcrumb>
      </template>
    </ElPageHeader>
    <p class="text-gray-500 dark:text-gray-400 px-4 py-2">
      {{ activity.description }}
    </p>
    <ElDescriptions
      border
      class="py-2"
      :direction="vert ? 'vertical' : 'horizontal'"
      :column="vert ? 2 : undefined"
    >
      <ElDescriptionsItem :label="t('activity.form.type')">
        <ZActivityType
          force="full"
          v-if="activity.type !== 'special'"
          :type="activity.type"
          :bg="false"
        />
        <ZActivityType
          force="full"
          v-else
          type="special"
          :special="activity.special.classify"
          :bg="false"
        />
      </ElDescriptionsItem>
      <ElDescriptionsItem :label="t('activity.registration.status.title')">
        <ZActivityStatus force="full" :type="activity.status" :bg="false" />
      </ElDescriptionsItem>
      <ElDescriptionsItem :label="t('activity.form.date')">
        <ElButton round size="small" :icon="Clock" text type="primary">{{
          dayjs(activity.date).format('YYYY-MM-DD HH:mm')
        }}</ElButton>
      </ElDescriptionsItem>
      <ElDescriptionsItem
        v-if="activity.type === 'specified'"
        :label="t('activity.registration.location', activity.registration.classes.length)"
      >
        <ElButton round size="small" :icon="Location" text type="info">
          {{ activity.registration.place }}
        </ElButton>
      </ElDescriptionsItem>
      <ElDescriptionsItem :label="t('activity.form.person', activity.members.length)">
        <ZActivityMemberList class="px-2" :activity="activity" @refresh="refresh" />
        <ZActivityImpressionDrawer
          embed
          :id="activity._id"
          only-text
          :readonly="!user.position.includes('auditor') && !user.position.includes('admin')"
          :role="
            user.position.includes('admin') ||
            user.position.includes('auditor') ||
            user.position.includes('department')
              ? 'campus'
              : user.position.includes('secretary')
              ? 'class'
              : 'mine'
          "
        />
      </ElDescriptionsItem>
      <ElDescriptionsItem
        v-if="activity.type === 'specified'"
        :label="t('activity.form.class', activity.registration.classes.length)"
      >
        {{ activity.registration.classes.length }}
      </ElDescriptionsItem>
    </ElDescriptions>
    <ElDescriptions
      v-if="mine"
      border
      class="py-2"
      :title="t('activity.impression.page.write.mine')"
      :direction="vert ? 'vertical' : 'horizontal'"
      :column="vert ? 2 : undefined"
    >
      <ElDescriptionsItem :label="t('activity.registration.status.title')">
        <ZActivityStatus force="full" :type="mine.status" :bg="false" />
      </ElDescriptionsItem>
      <ElDescriptionsItem :label="t('activity.form.duration')">
        <ElButton :icon="Timer" type="info" text round size="small">
          {{ mine.duration }} h
        </ElButton>
      </ElDescriptionsItem>
      <ElDescriptionsItem :label="t('activity.form.mode')">
        <ZActivityMode
          force="full"
          :mode="mine.mode"
          :bg="false"
          :show-my-duration="true"
          :show-properties="true"
        />
      </ElDescriptionsItem>
      <ElDescriptionsItem :label="t('activity.history.name')">
        <ZActivityHistory :history="mine.history" :mode="mine.mode" display="button" show-items />
      </ElDescriptionsItem>
      <ElDescriptionsItem :label="t('activity.member.impression')">
        <ZActivityImpressionDrawer
          :id="activity._id"
          :readonly="mine.status !== 'rejected' && mine.status !== 'effective'"
          role="mine"
          embed
        />
      </ElDescriptionsItem>
    </ElDescriptions>
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
