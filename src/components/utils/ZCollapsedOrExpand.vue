<script setup lang="ts">
import { ElCollapse, ElCollapseItem } from 'element-plus'
import { withDefaults, toRefs } from 'vue'

const props = withDefaults(
  defineProps<{
    mode: 'collapsed' | 'expand'
  }>(),
  {
    mode: 'collapsed'
  }
)

const { mode } = toRefs(props)
</script>

<template>
  <ElCollapse v-model:active-name="mode">
    <ElCollapseItem name="collapsed">
      <slot name="collapsed" />
    </ElCollapseItem>
    <ElCollapseItem name="expand">
      <slot name="expand" />
    </ElCollapseItem>
  </ElCollapse>
</template>
