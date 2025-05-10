<script setup lang="ts">
import type { ActivityInstance } from '@/../types'
import {
  ZActivityMemberList,
  ZActivityMember,
  ZActivityType,
  ZActivityStatus,
  ZActivityMode
} from '..'
import { ref, withDefaults } from 'vue'
import { useWindowSize } from '@vueuse/core'
import {
  ElPageHeader,
  ElButton,
  ElButtonGroup,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDescriptions,
  ElDescriptionsItem
} from 'element-plus'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Location,
  Plus,
  Timer
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite } from '@/icons'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'

const user = useUserStore()
const route = useRoute()
const { width, height } = useWindowSize()
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
      </template>
      <template #breadcrumb>
        <ElBreadcrumb :separator-icon="ArrowRight" class="no-print">
          <ElBreadcrumbItem>
            <ElButton text size="small" @click="$router.push('/activities')">
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
              {{ activity?.name ?? route.path.split('/').pop() }}
            </ElButton>
          </ElBreadcrumbItem>
        </ElBreadcrumb>
      </template>
    </ElPageHeader>
    <p class="text-gray-500 dark:text-gray-400 px-4 py-2" style="white-space: pre-wrap">
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
        v-if="activity.type === 'specified' && activity.registration.place"
        :label="t('activity.registration.location')"
      >
        <ElButton round size="small" :icon="Location" text type="info">
          {{ activity.registration.place }}
        </ElButton>
      </ElDescriptionsItem>
      <ElDescriptionsItem :label="t('activity.form.person', activity.members.length)">
        <ZActivityMemberList class="px-2" :activity="activity" @refresh="refresh" />
      </ElDescriptionsItem>
    </ElDescriptions>
    <ElDescriptions
      v-if="mine"
      border
      class="py-2"
      :title="t('activity.view.panels.mine.name')"
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
        <!-- Waiting for backend fix ('updatedAt' returns 1970-01-21) -->
        <!--<ElButton text bg round size="small" type="warning" :icon="Edit">
          {{ dayjs(activity.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
        </ElButton>-->
      </ElButtonGroup>
    </div>
  </div>
</template>

<style scoped>
@media print {
  .no-print {
    display: none;
  }
}
</style>

<style>
@media print {
  body {
    margin: 0;
    padding: 0;
    filter: grayscale(100%);
  }
}
</style>
