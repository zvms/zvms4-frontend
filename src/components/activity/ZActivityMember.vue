<script setup lang="ts">
import type { ErrorResponse, User } from '@/../types'
import { toRefs, ref, watch } from 'vue'
import type { Component as VueComponent } from 'vue'
import { Plus, Refresh, User as UserIcon } from '@element-plus/icons-vue'
import { ZButtonOrCard, ZUserTimeJudge } from '@/components'
import api from '@/api'
import { ElButton, ElDescriptions, ElDescriptionsItem, ElNotification } from 'element-plus'
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
const loading2 = ref(false)
const error = ref(false)
const userStore = useUserStore()
const past = ref<string[]>([])
const notFound = ref(false)

watch(id, () => {
  refresh()
})

function refresh() {
  loading.value = true
  notFound.value = false
  if (id.value)
    api.user
      .readOne(id.value)
      .then((res) => {
        if (!res) error.value = true
        else {
          person.value = res as User
          past.value = person.value.past
        }
        loading.value = false
      })
      .catch((err: ErrorResponse) => {
        console.log(err, err.code)
        if (err.code === 404) {
          notFound.value = true
        }
        error.value = true
        loading.value = false
      })
  else {
    person.value = undefined
    notFound.value = true
    loading.value = false
  }
}

refresh()

async function resetMemberPassword() {
  loading2.value = true
  const user = person.value
  const password = user?.id?.toString()
  if (password) {
    const token = await temporaryToken(userStore._id)
    await api.user.password.put(id.value, password, token, true).then(() => {
      ElNotification({
        title: '密码重置成功',
        type: 'success'
      })
    }).catch(() => {
      loading2.value = false
    })
  }
  loading2.value = false
}

const vert = ref(width.value < height.value * 1.2)

watch(width, () => {
  vert.value = width.value < height.value * 1.2
})

watch(height, () => {
  vert.value = width.value < height.value * 1.2
})

async function removeUserPast(tag: string) {
  const index = past.value.indexOf(tag)
  if (index > -1) {
    await api.user.past.delete(id.value, index)
    past.value.splice(index, 1)
  }
}

/*
const inputVisible = ref(false)

const inputValue = ref('')

async function insertUserPast() {
  const value = inputValue.value
  if (value && past.value.indexOf(value) === -1) {
    inputValue.value = ''
    inputVisible.value = false
    await api.user.past.insert(id.value, value)
    past.value.push(value)
  }
}
*/
</script>

<template>
  <ElButton v-if="notFound && mode === 'button'" text bg type="danger" :icon="icon" size="small" round>
    {{ t('manage.personalPanel.notFound') }}
  </ElButton>
  <ZButtonOrCard
    v-else
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
        <ElDescriptionsItem
          :label="t('home.labels.past')"
          v-if="(userStore.position.includes('admin') || userStore.position.includes('department')) && past.length"
        >
          <div class="flex gap-2">
            <ElTag
              v-for="tag in past"
              :key="tag"
              effect="plain"
              round
              class="px-3"
              closable
              :disable-transitions="false"
              @close="removeUserPast(tag)"
            >
              {{ tag }}
            </ElTag>
            <!--<ElInput
              v-if="inputVisible"
              ref="InputRef"
              v-model.trim="inputValue"
              class="w-20 px-2"
              size="small"
              @keyup.enter="insertUserPast"
              @blur="insertUserPast"
            />
            <ElButton
              v-else
              class="button-new-tag px-2"
              text
              bg
              circle
              size="small"
              :icon="Plus"
              @click="inputVisible = true"
            />-->
          </div>
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
          (userStore.position.includes('admin') || userStore.position.includes('department'))
        "
        text
        bg
        type="success"
        @click="router.push(`/user/${id}`)"
        class="w-full"
      >
        {{ t('manage.groupDetails.userList.open') }}
      </ElButton>
      <ElButton
        v-if="
          (userStore.position.includes('admin') || userStore.position.includes('department')) &&
          id &&
          id !== userStore._id &&
          mode === 'card'
        "
        type="danger"
        text
        bg
        class="w-full"
        :icon="Refresh"
        @click="resetMemberPassword"
        :loading="loading2"
      >
        {{ t('manage.personalPanel.resetPassword') }}
      </ElButton>
    </template>
    <template #text>
      {{ person?.name }}
    </template>
  </ZButtonOrCard>
</template>
