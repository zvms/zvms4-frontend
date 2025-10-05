<script setup lang="ts">
import type { Activity, ActivityMember } from '@/../types/v2'
import {
  ZActivityMemberList,
  ZActivityMember,
  ZActivityType,
  ZActivityStatus,
  ZActivityMode
} from '..'
import { onMounted, ref, toRefs, withDefaults } from 'vue'
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
import { ArrowLeft, ArrowRight, Clock, Location, Plus, Timer, Edit } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite } from '@/icons'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from '@/plugins/dayjs'
import api from '@/api'

const user = useUserStore()
const route = useRoute()
const { width, height } = useWindowSize()
const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    id: string
    session: string
  }>(),
  {
    session: ''
  }
)

const { id, session } = toRefs(props)

const scroll = ref(height.value * 0.54 + 'px')
const loading = ref(false)

watch(
  () => height.value,
  (value) => {
    scroll.value = value * 0.54 + 'px'
  }
)

const mine = ref<ActivityMember>()
const activity = ref<Activity>()
const membersCount = ref(0)

async function getInfo() {
  if (session.value) {
    mine.value = await api.activity.member.read(id.value, session.value)
  }
  const response = await api.activity.read.single(id.value)
  activity.value = response.activity
  membersCount.value = response.members_count
  console.log(response)
  loading.value = false
}

onMounted(() => {
  loading.value = true
  if (user._id && id.value) {
    getInfo().then(() => {
      loading.value = false
    })
  }
})

const vert = ref(width.value < height.value * 1.2)

watch(width, () => {
  vert.value = width.value < height.value * 1.2
})

watch(height, () => {
  vert.value = width.value < height.value * 1.2
})
</script>

<template>
  <div v-loading="loading" v-if="activity">
    <ElPageHeader v-if="activity?._id" :icon="ArrowLeft" @back="() => $router.back()" class="py-4">
      <template #content>
        {{ activity.name }}
      </template>
      <template #extra> </template>
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
      {{ activity?.description }}
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
          v-if="activity?.type !== 'hybrid'"
          :type="activity?.type ?? 'hybrid'"
          :bg="false"
        />
        <ZActivityType force="full" v-else type="hybrid" :special="activity?.origin" :bg="false" />
      </ElDescriptionsItem>
      <ElDescriptionsItem :label="t('activity.registration.status.title')">
        <ZActivityStatus force="full" :type="activity?.status ?? 'effective'" :bg="false" />
      </ElDescriptionsItem>
      <ElDescriptionsItem :label="t('activity.form.date')">
        <ElButton round size="small" :icon="Clock" text type="primary">{{
          dayjs(activity?.date).format('YYYY-MM-DD HH:mm')
        }}</ElButton>
      </ElDescriptionsItem>
      <ElDescriptionsItem v-if="activity?.place" :label="t('activity.registration.location')">
        <ElButton round size="small" :icon="Location" text type="info">
          {{ activity?.place }}
        </ElButton>
      </ElDescriptionsItem>
      <ElDescriptionsItem :label="t('activity.form.person')" v-if="activity">
        <ZActivityMemberList
          class="px-2"
          :activity="activity"
          :members-count="membersCount"
          @refresh="refresh"
        />
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
        <ZActivityStatus force="full" :type="mine?.status ?? 'effective'" :bg="false" />
      </ElDescriptionsItem>
      <ElDescriptionsItem :label="t('activity.form.duration')">
        <ElButton :icon="Timer" type="info" text round size="small">
          {{ mine?.duration ?? 0 }} h
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
        :id="activity?.creator ?? ''"
        :icon="
          StreamlineInterfaceUserEditActionsCloseEditGeometricHumanPencilPersonSingleUpUserWrite
        "
      />
      <ElButtonGroup class="px-2">
        <ElButton text bg round size="small" type="success" :icon="Plus">
          {{ dayjs(activity?.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </ElButton>
        <ElButton text bg round size="small" type="warning" :icon="Edit">
          {{ dayjs(activity.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
        </ElButton>
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
