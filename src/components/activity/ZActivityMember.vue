<script setup lang="ts">
import type { User } from '@/../@types/user'
import { toRefs, ref, watch } from 'vue'
import type { Component as VueComponent } from 'vue'
import { User as UserIcon } from '@element-plus/icons-vue'
import { ZButtonOrCard } from '@/components'
import api from '@/api'
import { ElButtonGroup, ElButton } from 'element-plus'
import { IcBaselineClass } from '@/icons'
import { getUserClassName, getUserClassByCode } from '@/utils/getClass'

const props = defineProps<{ id: string; icon?: VueComponent; withUserClassName?: boolean }>()
const { id, icon, withUserClassName } = toRefs(props)
const person = ref<User>()
const loading = ref(true)
const error = ref(false)
const className = ref('')

function refresh() {
  if (id.value)
    api.user.readOne(id.value).then((res) => {
      if (!res) error.value = true
      else person.value = res as User
      loading.value = false
      className.value = getUserClassName(res?.id ?? 0, res?.code ?? 0)
    })
}

refresh()

watch(id, () => refresh)
</script>

<template>
  <ElButtonGroup>
    <ZButtonOrCard
      mode="button"
      type="primary"
      size="small"
      round
      :loading="loading"
      :icon="icon ?? UserIcon"
    >
      <template #text>
        {{ person?.name }}
      </template>
      <template #default></template>
    </ZButtonOrCard>
    <ElButton
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
  </ElButtonGroup>
</template>
