<script setup lang="ts">
import type { User } from '@zvms/zvms4-types'
import { toRefs, ref, watch } from 'vue'
import type { Component as VueComponent } from 'vue'
import { User as UserIcon } from '@element-plus/icons-vue'
import { ZButtonOrCard, ZUserTimeJudge } from '@/components'
import api from '@/api'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { useI18n } from 'vue-i18n'
import ZUserGroup from '../tags/ZUserGroup.vue'
import { useUserStore } from '@/stores/user'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    id: string
    mode?: 'card' | 'button'
    icon?: VueComponent
    color?: 'primary' | 'success' | 'danger' | 'warning' | 'info'
  }>(),
  {
    icon: UserIcon,
    color: 'primary',
    mode: 'button'
  }
)
const { id, icon, color, mode } = toRefs(props)
const person = ref<User>()
const loading = ref(true)
const error = ref(false)
const user = useUserStore()

watch(id, () => {
  refresh()
})

function refresh() {
  loading.value = true
  if (id.value)
    api.user
      .readOne(id.value)
      .then((res) => {
        if (!res) error.value = true
        else person.value = res as User
        loading.value = false
      })
      .catch(() => {
        error.value = true
        loading.value = false
      })
  else {
    person.value = undefined
    loading.value = false
  }
}

refresh()
</script>

<template>
  <ZButtonOrCard
    :mode="mode"
    :type="color"
    size="small"
    round
    :loading="loading"
    :icon="icon"
    :title="person?.name"
    pop-type="dialog"
    width="50%"
    v-bind="$attrs"
  >
    <template #default>
      <ElDescriptions class="fill" border>
        <template #title>
          <slot name="title" />
        </template>
        <template #extra>
          <slot name="extra" />
        </template>
        <ElDescriptionsItem :label="t('home.labels.name')">{{ person?.name }}</ElDescriptionsItem>
        <ElDescriptionsItem :label="t('home.labels.number')">{{ person?.id }}</ElDescriptionsItem>
        <ElDescriptionsItem :label="t('home.labels.identify')">
          <ZUserGroup
            v-for="group in person?.group"
            :key="group"
            class="px-1"
            :group="group"
            :grouping="false"
          />
        </ElDescriptionsItem>
      </ElDescriptions>
      <ZUserTimeJudge class="py-2" v-if="user.position.includes('department') || user.position.includes('admin')" :user="person?._id" />
    </template>
    <template #text>
      {{ person?.name }}
    </template>
  </ZButtonOrCard>
</template>
