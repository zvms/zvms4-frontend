<script setup lang="ts">
import type { User } from '@/../types'
import { toRefs, ref, watch } from 'vue'
import type { Component as VueComponent } from 'vue'
import { Refresh, User as UserIcon } from '@element-plus/icons-vue'
import { ZButtonOrCard, ZUserTimeJudge } from '@/components'
import api from '@/api'
import { ElButton, ElDescriptions, ElDescriptionsItem, ElPopconfirm } from 'element-plus'
import { useI18n } from 'vue-i18n'
import ZUserGroup from '../tags/ZUserGroup.vue'
import { useUserStore } from '@/stores/user'
import { temporaryToken } from '@/plugins/short-token'
import { useWindowSize } from '@vueuse/core'
import router from '@/router'

const { width, height } = useWindowSize()
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
const userStore = useUserStore()

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

async function resetMemberPassword() {
  const user = await api.user.readOne(id.value)
  const password = user?.id.toString()
  if (password) {
    const token = await temporaryToken(userStore._id)
    await api.user.password.put(id.value, password, token, true)
  }
}

const vert = ref(width.value < height.value * 1.2)

watch(width, () => {
  vert.value = width.value < height.value * 1.2
})

watch(height, () => {
  vert.value = width.value < height.value * 1.2
})
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
      <ElDescriptions
        class="fill"
        border
        :direction="vert ? 'vertical' : 'horizontal'"
        :column="vert ? 2 : undefined"
      >
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
      <ZUserTimeJudge
        class="py-2"
        v-if="userStore.position.includes('department') || userStore.position.includes('admin')"
        :user="id"
        discount
      />
      <ElButton
        v-if="
          mode === 'button' &&
          (userStore.position.includes('admin') ||
            userStore.position.includes('department'))
        "
        text
        bg
        type="success"
        @click="router.push(`/user/${id}`)"
      >
        Open the Person Page
      </ElButton>
      <ElPopconfirm v-if="mode === 'card'" :title="t('manage.personalPanel.resetConfirm')" @confirm="resetMemberPassword">
        <template #reference>
          <ElButton
            v-if="
              (userStore.position.includes('admin') || userStore.position.includes('department')) &&
              id &&
              id !== userStore._id
            "
            type="danger"
            text
            bg
            class="w-full"
            :icon="Refresh"
          >
            {{ t('manage.personalPanel.resetPassword') }}
          </ElButton>
        </template>
      </ElPopconfirm>
    </template>
    <template #text>
      {{ person?.name }}
    </template>
  </ZButtonOrCard>
</template>
