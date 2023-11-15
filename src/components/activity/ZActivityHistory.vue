<script lang="ts" setup>
import { ElStep, ElSteps } from 'element-plus'
import type { ActivityMemberHistory } from '@/../@types/activity'
import { toRefs } from 'vue'

const props = defineProps<{ history: ActivityMemberHistory[] }>()

const { history } = toRefs(props)
</script>

<template></template>
