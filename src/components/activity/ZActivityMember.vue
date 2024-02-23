<script setup lang="ts">
import type { User } from '@zvms/zvms4-types'
import { toRefs, ref, watch } from 'vue'
import type { Component as VueComponent } from 'vue'
import { User as UserIcon } from '@element-plus/icons-vue'
import { ZButtonOrCard } from '@/components'
import api from '@/api'
import { ElButton } from 'element-plus'
import { IcBaselineClass } from '@/icons'
import { getUserClassName } from '@/utils/getClass'

const props = withDefaults(
  defineProps<{
    id: string
    icon?: VueComponent
    withUserClassName?: boolean
    color?: 'primary' | 'success' | 'danger' | 'warning' | 'info'
  }>(),
  {
    icon: UserIcon,
    withUserClassName: false,
    color: 'primary'
  }
)
const { id, icon, withUserClassName, color } = toRefs(props)
const person = ref<User>()
const loading = ref(true)
const error = ref(false)
const className = ref('')

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
        className.value = getUserClassName(res?.id ?? 0, res?.code ?? 0)
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
    mode="button"
    :type="color"
    size="small"
    round
    :loading="loading"
    :icon="icon"
    pop-type="dialog"
    width="60%"
    :title="person?.name"
    v-bind="$attrs"
  >
    <template #text>
      {{ person?.name }}
    </template>
    <template #default>
      <p class="text-xl">{{ person?.name }}</p>
    </template>
  </ZButtonOrCard>
  <ElButton
    class="px-2"
    v-if="withUserClassName && !loading"
    text
    bg
    round
    size="small"
    :icon="IcBaselineClass"
    type="info"
  >
    {{ className }}
  </ElButton>
</template>
