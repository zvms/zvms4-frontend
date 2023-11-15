<script lang="ts" setup>
import { ElCard, ElButton, ElSkeleton, ElSkeletonItem, ElDialog, ElDrawer } from 'element-plus'
import { toRefs, ref } from 'vue'
import type { Component as VueComponent } from 'vue'
const props = defineProps<{
  size?: 'large' | 'default' | 'small'
  popType?: 'drawer' | 'dialog'
  mode?: 'card' | 'button'
  width?: string
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
  loading?: boolean
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
  icon?: VueComponent
  fullscreen?: boolean
  modal?: boolean
  title?: string
}>()

const { size, popType, mode, width, direction, loading, type, icon, fullscreen, modal, title } =
  toRefs(props)

const show = ref(false)
</script>

<template>
  <div>
    <ElSkeleton :loading="loading" v-if="mode === 'button'">
      <template #template>
        <ElSkeletonItem variant="text" />
      </template>
      <template #default>
        <ElButton text bg :size="size" :type="type ?? 'primary'" :icon="icon">
          <slot name="text" />
        </ElButton>
      </template>
    </ElSkeleton>
    <ElDialog
      v-if="popType === 'dialog'"
      v-model="show"
      :fullscreen="fullscreen"
      :modal="modal"
      :title="title"
    >
      <slot name="default" />
    </ElDialog>
    <ElDrawer
      v-if="popType === 'drawer'"
      v-model="show"
      :fullscreen="fullscreen"
      :modal="modal"
      :title="title"
      :size="width"
      :direction="direction ?? 'rtl'"
    >
      <slot name="default" />
    </ElDrawer>
    <ElCard v-if="mode === 'card'" shadow="hover" v-loading="loading">
      <slot name="default" />
    </ElCard>
  </div>
</template>