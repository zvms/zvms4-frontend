<script lang="ts" setup>
import { ElCard, ElButton, ElSkeleton, ElSkeletonItem, ElDialog, ElDrawer } from 'element-plus'
import { toRefs, ref } from 'vue'
import type { Component as VueComponent } from 'vue'
const props = defineProps<{
  size?: 'large' | 'default' | 'small'
  popType?: 'drawer' | 'dialog'
  mode: 'card' | 'button'
  width?: string
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
  loading?: boolean
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
  icon?: VueComponent
  fullscreen?: boolean
  modal?: boolean
  title?: string
  center?: boolean
  round?: boolean
  zIndex?: number
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
  zIndex
} = toRefs(props)

const show = ref(false)
</script>

<template>
  <ElSkeleton :loading="loading" animated v-if="mode === 'button'">
    <template #template>
      <ElSkeletonItem variant="text" width="192px" />
    </template>
    <template #default>
      <ElButton
        :round="round"
        text
        bg
        :size="size"
        :type="type ?? 'primary'"
        :icon="icon"
        @click="show = true"
      >
        <slot name="text" />
      </ElButton>
    </template>
  </ElSkeleton>
  <div>
    <Teleport to="body">
      <ElDialog
        v-if="popType === 'dialog'"
        v-model="show"
        :fullscreen="fullscreen"
        :modal="modal ? modal : true"
        :title="title"
        :width="width"
        :center="center ? center : true"
        :z-index="zIndex ?? 9999"
      >
        <slot name="default" />
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
      </ElDrawer>
    </Teleport>
    <ElCard v-if="mode === 'card'" shadow="hover" v-loading="loading">
      <slot name="default" />
    </ElCard>
  </div>
</template>
