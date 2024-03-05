<script lang="ts" setup>
import { ElCard, ElButton, ElSkeleton, ElSkeletonItem, ElDialog, ElDrawer } from 'element-plus'
import { toRefs, ref, watch } from 'vue'
import type { Component as VueComponent } from 'vue'
const props = withDefaults(
  defineProps<{
    size?: 'large' | 'default' | 'small'
    popType?: 'drawer' | 'dialog'
    mode: 'card' | 'button'
    width?: string
    direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
    loading?: boolean
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | ''
    icon?: VueComponent
    fullscreen?: boolean
    modal?: boolean
    title?: string
    center?: boolean
    round?: boolean
    open?: boolean
    disabled?: boolean
  }>(),
  {
    size: 'small',
    popType: 'dialog',
    width: '60%',
    direction: 'rtl',
    type: '',
    fullscreen: false,
    modal: true,
    title: undefined,
    center: true,
    round: true,
    open: false,
    disabled: false
  }
)
const emits = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const {
  size,
  popType,
  mode,
  width,
  direction,
  loading,
  type,
  icon,
  fullscreen,
  modal,
  title,
  center,
  round,
  open
} = toRefs(props)

const show = ref(false)

watch(
  open,
  () => {
    show.value = open.value
  },
  { immediate: true }
)

watch(
  show,
  () => {
    emits('update:open', show.value)
  },
  { immediate: true }
)
</script>

<template>
  <ElButton
    v-if="mode === 'button' && !loading"
    :round="round"
    text
    bg
    :size="size"
    :type="type ?? 'primary'"
    :icon="icon"
    @click="show = true"
    :disabled="disabled"
  >
    <slot name="text" />
  </ElButton>
  <ElSkeleton :loading="true" animated v-else-if="mode === 'button'">
    <template #template>
      <ElSkeletonItem variant="text" style="width: 72px" />
    </template>
  </ElSkeleton>
  <Teleport to="body" v-if="show">
    <ElDialog
      v-if="popType === 'dialog'"
      v-model="show"
      :fullscreen="fullscreen"
      :modal="modal ? modal : true"
      :title="title"
      :width="width"
      :center="center ? center : true"
    >
      <slot name="default" />

      <template #header>
        <slot name="header" />
      </template>
    </ElDialog>
    <ElDrawer
      v-if="popType === 'drawer'"
      v-model="show"
      :fullscreen="fullscreen"
      :modal="modal ? modal : true"
      :title="title"
      :size="width"
      :direction="direction ?? 'rtl'"
    >
      <slot name="default" />
      <template #header>
        <slot name="header" />
      </template>
    </ElDrawer>
  </Teleport>
  <div v-if="mode === 'card'">
    <ElCard v-if="mode === 'card'" shadow="hover" v-loading="loading">
      <slot name="default" />
    </ElCard>
  </div>
</template>
