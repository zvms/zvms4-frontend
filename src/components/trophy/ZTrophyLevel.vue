<script setup lang="ts">
import type { TrophyLevel } from '@zvms/zvms4-types';
import { trophyLevelMap } from './trophy';
import { toRefs } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = withDefaults(defineProps<{
  level: TrophyLevel
  size?: 'large' | 'default' | 'small'
  mode?: 'auto' | 'full' | 'icon'
  force?: 'full' | 'short'
  bg?: boolean
}>(), {
  size: 'small',
  mode: 'auto',
  bg: true
})

const { level, size, mode, force, bg } = toRefs(props)
</script>

<template>
  <ZButtonTag
    :size="size"
    :type="trophyLevelMap.find(t => t.value === level)?.color"
    :icon="trophyLevelMap.find(t => t.value === level)?.icon"
    :force="force"
    :mode="mode"
    :bg="bg"
  >
    {{ t(`activity.trophy.level.${level}`) }}
  </ZButtonTag>
</template>
