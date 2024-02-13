<script setup lang="ts">
import type { TrophyType } from '@zvms/zvms4-types';
import { trophyTypeMap } from './trophy';
import { toRefs } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = withDefaults(defineProps<{
  type: TrophyType
  name: string
  size?: 'large' | 'default' | 'small'
  mode?: 'auto' | 'full' | 'icon'
  force?: 'full' | 'short'
  bg?: boolean
}>(), {
  size: 'small',
  mode: 'auto',
  bg: true
})

const { type, name, size, mode, force, bg } = toRefs(props)
</script>

<template>
  <ZButtonTag
    :size="size"
    :type="trophyTypeMap.find(t => t.value === type)?.color"
    :icon="trophyTypeMap.find(t => t.value === type)?.icon(name)"
    :force="force"
    :mode="mode"
    :bg="bg"
  >
    {{ t(`activity.trophy.type.${type}`) }}
  </ZButtonTag>
</template>
