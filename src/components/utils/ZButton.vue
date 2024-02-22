<script setup lang="ts">
import { toRefs } from 'vue'
import { ElButton } from 'element-plus'

const props = withDefaults(
  defineProps<{
    circle?: boolean
  }>(),
  {
    circle: false
  }
)

const { circle } = toRefs(props)
</script>

<template>
  <ElButton v-if="!circle" v-bind="$attrs" :circle="circle">
    <template v-if="!circle">
      <slot />
    </template>
  </ElButton>
  <ElButton v-else v-bind="$attrs" :circle="circle" />
</template>
