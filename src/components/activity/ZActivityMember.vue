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
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    id: string
    icon?: VueComponent
    color?: 'primary' | 'success' | 'danger' | 'warning' | 'info'
  }>(),
  {
    icon: UserIcon,
    color: 'primary'
  }
)
const { id, icon, color } = toRefs(props)
const person = ref<User>()
const loading = ref(true)
const error = ref(false)

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
      <ElDescriptions>
        <ElDescriptionsItem :label="t('')">

        </ElDescriptionsItem>
      </ElDescriptions>
    </template>
    <template #default>
      <p class="text-xl">{{ person?.name }}</p>
    </template>
  </ZButtonOrCard>
</template>
