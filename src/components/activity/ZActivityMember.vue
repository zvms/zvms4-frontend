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

const props = defineProps<{ id: string; icon?: VueComponent; withUserClassName?: boolean }>()
const { id, icon, withUserClassName } = toRefs(props)
const person = ref<User>()
const loading = ref(true)
const error = ref(false)
const className = ref('')

function refresh() {
  loading.value = true
  if (id.value)
    api.user.readOne(id.value).then((res) => {
      if (!res) error.value = true
      else person.value = res as User
      loading.value = false
      className.value = getUserClassName(res?.id ?? 0, res?.code ?? 0)
    }).catch(() => {
      error.value = true
      loading.value = false
    })
  else {
    person.value = undefined
    loading.value = false
  }
}

refresh()

watch(() => id.value, () => refresh)
</script>

<template>
  <ZButtonOrCard
    mode="button"
    type="primary"
    size="small"
    round
    :loading="loading"
    :icon="icon ?? UserIcon"
    pop-type="dialog"
    width="60%"
    :title="person?.name"
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
